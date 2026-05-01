# Blood Donation System - Hosting Guide

You have:
- ✅ **Frontend**: Hosted on Vercel
- ❌ **Backend**: Local (needs hosting)
- ❌ **Database**: Local MongoDB (needs hosting)

---

## 🎯 Recommended Stack

| Component | Platform | Reason |
|-----------|----------|--------|
| **Backend (Node.js/Express)** | Render, Heroku, Railway, or Fly.io | Free tier available, easy deployment, environment variables |
| **Database (MongoDB)** | MongoDB Atlas | Free tier (512MB), cloud-hosted, secure, official MongoDB service |
| **Frontend** | Vercel | ✅ Already done |

---

## 📋 Step-by-Step Setup

### **OPTION 1: MongoDB Atlas + Render (Recommended - Free & Easiest)**

#### **1️⃣ Set Up MongoDB Atlas (Database)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"** (or sign in if you have an account)
3. Create a new account with email
4. Create a new **Free Cluster**:
   - Select **Free** tier
   - Choose your region (e.g., `us-east-1`)
   - Cluster name: `blood-donation-cluster`
   - Click **Create**
5. Set up **Security**:
   - Go to **Database Access** → **Add New Database User**
   - Username: `blood_donation`
   - Password: Generate strong password (save it!)
   - Click **Add User**
6. Allow network access:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (for development; restrict later in production)
   - Click **Confirm**
7. Get your **Connection String**:
   - Click **Connect** on your cluster
   - Choose **Drivers** → **Node.js**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://blood_donation:<password>@blood-donation-cluster.xxxxx.mongodb.net/bloodDonationDB?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Replace database name if needed
   - **Save this string!**

---

#### **2️⃣ Deploy Backend to Render**

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (or email)
3. Click **"New+"** → **"Web Service"**
4. Connect your GitHub repo (Blood-Donation)
5. Fill in:
   - **Name**: `blood-donation-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter if free tier is unavailable)
6. Add **Environment Variables**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add:
     ```
     MONGO_URI = mongodb+srv://blood_donation:<password>@blood-donation-cluster.xxxxx.mongodb.net/bloodDonationDB?retryWrites=true&w=majority
     JWT_SECRET = your-super-secret-jwt-key-here-use-something-random
     NODE_ENV = production
     ```
7. Click **"Create Web Service"**
8. Wait for deployment (2-5 mins)
9. Copy your backend URL (e.g., `https://blood-donation-backend.onrender.com`)

---

#### **3️⃣ Update Frontend with Backend URL**

In `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://blood-donation-backend.onrender.com'
};
```

In `frontend/src/environments/environment.ts` (development):

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // Keep for local testing
};
```

Update all API calls in frontend services:

```typescript
// Before:
this.http.get('http://localhost:3000/api/donors')

// After:
import { environment } from '../../environments/environment';
this.http.get(`${environment.apiUrl}/api/donors`)
```

---

### **OPTION 2: Heroku + MongoDB Atlas (Traditional, Requires Credit Card)**

**Note**: Heroku free tier ended. Requires paid dyno ($7-50/month).

Skip this unless you prefer Heroku. Use **Option 1** (Render) instead.

---

### **OPTION 3: Railway + MongoDB Atlas (Simple)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → **Deploy from GitHub Repo**
4. Select your Blood-Donation repo
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Random secret key
6. Railway auto-detects `package.json` and deploys
7. Get your URL from the Railway dashboard

---

## 🔧 Backend Code Changes Required

Your `backend/server.js` already uses environment variables:

```javascript
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloodDonationDB")
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
```

✅ **No changes needed!** Just set env vars during deployment.

---

## 📝 Update Frontend to Use Hosted Backend

### **1. Update API Service** (`frontend/src/app/services/api.services.ts`)

```typescript
import { environment } from '../../../environments/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;

  getDonors() {
    return this.http.get(`${this.apiUrl}/api/donors`);
  }

  getDonorRewards() {
    return this.http.get(`${this.apiUrl}/api/donor-rewards`);
  }

  // ... update other calls similarly
}
```

### **2. Update Environment Files**

**`frontend/src/environments/environment.ts`** (local dev):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**`frontend/src/environments/environment.prod.ts`** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://blood-donation-backend.onrender.com'  // Your Render URL
};
```

### **3. Use Environment in Components**

For example, in `donor-rewards.page.ts`:

```typescript
import { environment } from '../../../environments/environment';

export class DonorRewardsPage implements OnInit {
  constructor(private http: HttpClient) {}

  loadRewards() {
    this.http.get(`${environment.apiUrl}/api/donor-rewards`)
      .subscribe((data: any) => {
        this.donors = data;
      });
  }
}
```

Or better: Create an **API service** and inject it.

---

## 🚀 Deployment Checklist

- [ ] Create MongoDB Atlas account and cluster
- [ ] Save MongoDB connection string
- [ ] Create random JWT_SECRET
- [ ] Deploy backend to Render (or Railway/Fly.io)
- [ ] Test backend API (visit `https://your-backend-url/api/hospitals`)
- [ ] Update frontend environment files with backend URL
- [ ] Update all API calls to use `environment.apiUrl`
- [ ] Rebuild and deploy frontend to Vercel
- [ ] Test full app end-to-end

---

## 🧪 Testing After Deployment

### **Test Backend API**

```bash
# Test hospitals endpoint
curl https://your-backend-url/api/hospitals

# Test donor-rewards endpoint (should require auth if protected)
curl https://your-backend-url/api/donor-rewards
```

### **Test Frontend**

1. Open your Vercel frontend URL
2. Navigate through pages and verify data loads
3. Check browser console for errors
4. Test donor-rewards page loads correctly

---

## 🔐 Security Tips

1. **Never commit secrets** to GitHub:
   - Use `.env` file (add to `.gitignore`)
   - Set env vars in platform dashboard (Render, Railway, etc.)

2. **MongoDB Atlas**:
   - Use strong password
   - In production, restrict IP whitelist (don't allow "everywhere")
   - Enable encryption
   - Enable backup

3. **CORS**:
   - Your backend already has `cors()` enabled for all origins
   - In production, restrict to your Vercel domain:
     ```javascript
     app.use(cors({
       origin: 'https://your-vercel-domain.vercel.app'
     }));
     ```

4. **JWT**:
   - Use a strong, random `JWT_SECRET` (at least 32 characters)
   - Change it if ever compromised
   - Consider adding token expiration

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check `MONGO_URI` env var, verify IP whitelist on Atlas |
| "CORS error on frontend" | Check CORS config on backend, verify backend URL in env |
| "Backend returns 503" | Check logs on Render/Railway, restart service |
| "Frontend stuck on loading" | Check network tab, verify backend URL is correct |

---

## 💰 Cost Estimation (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **MongoDB Atlas** | ✅ 512MB storage | $57+ (M0 free, then M10) |
| **Render (Backend)** | ❌ Spins down after 15 min inactivity | $7-20 (Starter plan) |
| **Vercel (Frontend)** | ✅ Unlimited free | $20+ (Pro features) |
| **Total** | ~$0-7/month | $50-100/month |

**Tip**: Start with free tiers. Upgrade only when you have active users.

---

## 🎬 Quick Start Command

Once you have env vars set, your backend auto-starts with:

```bash
npm start
```

(from `backend/` folder)

This runs: `node server.js` which:
1. Connects to MongoDB Atlas
2. Starts Express server
3. Listens on port (Render assigns dynamically)

---

## 📚 Useful Links

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Express + Node Deployment Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Next Steps:**
1. Set up MongoDB Atlas (5-10 min)
2. Deploy backend to Render (5-10 min)
3. Update frontend env files and redeploy to Vercel (5 min)
4. Test end-to-end

Total time: ~20 minutes! 🚀
