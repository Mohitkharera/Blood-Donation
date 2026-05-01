# 🚀 Deployment Checklist

## ✅ Before You Deploy

### Backend Preparation
- [ ] Backend code committed to GitHub
- [ ] All dependencies listed in `backend/package.json`
- [ ] No hardcoded localhost URLs in code
- [ ] Environment variables documented in `.env.example`
- [ ] `backend/server.js` uses `process.env.MONGO_URI` and `process.env.JWT_SECRET`

### Frontend Preparation
- [ ] Frontend code committed to GitHub
- [ ] `frontend/src/environments/environment.ts` has local API URL
- [ ] `frontend/src/environments/environment.prod.ts` has production API URL
- [ ] All components use `environment.apiUrl` instead of hardcoded URLs
- [ ] All dependencies listed in `frontend/package.json`

---

## 📦 MongoDB Atlas Setup (5-10 min)

### Step 1: Create Account
- [ ] Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Sign up with email
- [ ] Verify email

### Step 2: Create Free Cluster
- [ ] Create new project (name it `Blood Donation`)
- [ ] Create new cluster
- [ ] Select **Free** tier
- [ ] Choose region (e.g., `us-east-1`)
- [ ] Name: `blood-donation-cluster`
- [ ] Wait for cluster to provision (2-5 min)

### Step 3: Database User
- [ ] Go to **Database Access**
- [ ] Add New Database User
  - Username: `blood_donation`
  - Password: Generate strong password (save it!)
  - Built-in Role: `Atlas admin`
- [ ] Click **Add User**

### Step 4: Network Access
- [ ] Go to **Network Access**
- [ ] Add IP Address
- [ ] Select **Allow Access from Anywhere** (0.0.0.0/0)
  - ⚠️ For development only. In production, restrict to your backend IP.
- [ ] Click **Confirm**

### Step 5: Get Connection String
- [ ] Click **Connect** on your cluster
- [ ] Choose **Drivers** → **Node.js**
- [ ] Copy connection string (MongoDB will format it)
- [ ] Replace:
  - `<username>` → `blood_donation`
  - `<password>` → Your generated password
- [ ] Replace `/test` with `/bloodDonationDB` (or your DB name)
- [ ] Example:
  ```
  mongodb+srv://blood_donation:MyPassword123@blood-donation-cluster.xxxxx.mongodb.net/bloodDonationDB?retryWrites=true&w=majority
  ```
- [ ] **Save this string!**

---

## 🌐 Deploy Backend to Render (5-10 min)

### Step 1: Create Render Account
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub (recommended) or email
- [ ] Authorize GitHub if needed

### Step 2: Create Web Service
- [ ] Click **New+** → **Web Service**
- [ ] Connect your Blood-Donation GitHub repo
- [ ] Fill in:
  - **Name**: `blood-donation-backend`
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free (if available) or Starter ($7/month)

### Step 3: Add Environment Variables
- [ ] Click **Advanced**
- [ ] Add environment variables:
  - `MONGO_URI` = Your MongoDB connection string
  - `JWT_SECRET` = Random secret (32+ chars): `$(openssl rand -base64 32)`
  - `NODE_ENV` = `production`
- [ ] Click **Create Web Service**

### Step 4: Wait for Deployment
- [ ] Wait for build to complete (2-5 min)
- [ ] Watch logs for "Server running on port..."
- [ ] Copy your backend URL from Render dashboard
- [ ] Example: `https://blood-donation-backend.onrender.com`

### Step 5: Test Backend API
```bash
curl https://blood-donation-backend.onrender.com/api/hospitals
# Should return a JSON array of hospitals
```

---

## 🎨 Update & Deploy Frontend (5 min)

### Step 1: Update Environment File
Edit `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://blood-donation-backend.onrender.com'  // Your Render URL
};
```

### Step 2: Commit Changes
```bash
cd frontend
git add src/environments/environment.prod.ts
git commit -m "Update backend URL for production"
git push
```

### Step 3: Deploy to Vercel
- [ ] Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Select your Blood-Donation project
- [ ] Vercel auto-detects GitHub push
- [ ] Wait for build to complete (~2-3 min)
- [ ] View deployment at: `https://your-project.vercel.app`

### Step 4: Verify Deployment
- [ ] Open your Vercel URL
- [ ] Navigate to pages and verify data loads
- [ ] Open browser console (F12) and check for errors
- [ ] Test donor-rewards page loads correctly

---

## 🧪 Post-Deployment Testing

### Backend Tests
```bash
# Test hospitals endpoint
curl https://blood-donation-backend.onrender.com/api/hospitals

# Test donors endpoint
curl https://blood-donation-backend.onrender.com/api/donors

# Test donor-rewards (if no auth required)
curl https://blood-donation-backend.onrender.com/api/donor-rewards
```

### Frontend Tests
- [ ] Open frontend URL
- [ ] Home page loads → displays stats
- [ ] Click "View Donors" → loads donor list
- [ ] Click "Donor Rewards" → loads rewards page with points
- [ ] Click "Smart Donor Match" → works with filters
- [ ] Add donor → registers successfully
- [ ] Check browser console (F12) for any errors

### Database Tests
- [ ] Go to MongoDB Atlas dashboard
- [ ] View **Database** → **Collections**
- [ ] Check `donors` collection has data
- [ ] Check new registrations appear in real-time

---

## 🔐 Security Checklist (Production)

- [ ] Never commit `.env` file to GitHub
- [ ] Add `.env` to `.gitignore`
- [ ] Use strong JWT_SECRET (32+ random chars)
- [ ] MongoDB Atlas: Restrict IP whitelist to Render IP only
- [ ] MongoDB Atlas: Enable encryption in transit & at rest
- [ ] Backend CORS: Restrict to your Vercel domain
- [ ] Enable MongoDB backups
- [ ] Monitor error logs regularly

---

## 💰 Cost Estimate

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| MongoDB Atlas | ✅ 512MB storage | $57/month |
| Render Backend | ❌ Limited | $7-20/month |
| Vercel Frontend | ✅ Unlimited | $20+/month |
| **Total/month** | ~$0-7 | $50-100 |

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check `MONGO_URI` in Render env vars
- ✅ Verify IP whitelist on MongoDB Atlas
- ✅ Test connection string locally first

### "CORS error in frontend"
- ✅ Check backend CORS config
- ✅ Verify backend URL in `environment.prod.ts`
- ✅ Check browser console for exact error

### "Backend returns 503"
- ✅ Check Render logs
- ✅ Restart service from Render dashboard
- ✅ Verify MongoDB connection

### "Frontend stuck loading"
- ✅ Open browser DevTools (F12)
- ✅ Check Network tab for failed requests
- ✅ Verify backend URL is correct
- ✅ Check backend is running

---

## 📞 Next Steps After Deployment

1. Monitor logs for 1 week
2. Collect user feedback
3. Set up error tracking (Sentry, LogRocket)
4. Set up database backups
5. Consider adding authentication
6. Plan feature updates
7. Scale infrastructure if needed

---

## 📚 Resources

- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Deployment](https://vercel.com/docs/concepts/deployments/overview)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Estimated total time to deploy: ~30-45 minutes**

Good luck! 🎉
