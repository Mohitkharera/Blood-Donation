# 🚀 Quick Deploy Reference

## URLs After Deployment

```
Frontend:    https://your-project.vercel.app
Backend:     https://blood-donation-backend.onrender.com
Database:    MongoDB Atlas (cloud)
```

---

## Environment Variables to Set in Render

**In Render Dashboard → Environment Variables:**

```
MONGO_URI=mongodb+srv://blood_donation:PASSWORD@blood-donation-cluster.xxxxx.mongodb.net/bloodDonationDB?retryWrites=true&w=majority

JWT_SECRET=<generate-random-string-32-chars>

NODE_ENV=production
```

---

## Update Frontend After Backend Deployment

Edit: `frontend/src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://blood-donation-backend.onrender.com'
};
```

Then push to GitHub → Vercel auto-deploys.

---

## Test API Endpoints

```bash
# Hospitals
curl https://blood-donation-backend.onrender.com/api/hospitals

# Donors
curl https://blood-donation-backend.onrender.com/api/donors

# Donor Rewards
curl https://blood-donation-backend.onrender.com/api/donor-rewards

# Add Donor
curl -X POST https://blood-donation-backend.onrender.com/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"John","bloodGroup":"O+","city":"NYC"}'
```

---

## Deployment Timeline

1. **MongoDB Atlas Setup**: 5-10 min
2. **Render Deployment**: 5-10 min
3. **Frontend Update**: 2-3 min
4. **Testing**: 5-10 min

**Total: ~25-35 minutes**

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot connect to MongoDB" | Check `MONGO_URI` env var in Render |
| "CORS error" | Verify backend URL in `environment.prod.ts` |
| "503 Bad Gateway" | Check Render logs, restart service |
| "Frontend still loading" | Clear cache, check network tab in DevTools |
| "Post request fails" | Verify backend `/api/donors` endpoint works |

---

## Files Changed

✅ `frontend/src/environments/environment.ts` - Added apiUrl
✅ `frontend/src/environments/environment.prod.ts` - Added apiUrl with Render URL
✅ `frontend/src/app/services/api.services.ts` - Uses environment.apiUrl
✅ `frontend/src/app/pages/donors/donors.page.ts` - Uses environment.apiUrl
✅ `frontend/src/app/pages/donor-registration/donor-registration.page.ts` - Uses environment.apiUrl
✅ `frontend/src/app/pages/plasma-donor-registration/plasma-donor-registration.page.ts` - Uses environment.apiUrl
✅ `backend/.env.example` - Template for env vars
✅ `backend/.gitignore` - Prevents .env commit

---

## Security Reminder

⚠️ **Never commit `.env` file or hardcoded secrets to GitHub!**

- Add `.env` to `.gitignore` ✅ (already done)
- Use environment variables ✅ (backend already uses them)
- Set secrets in platform dashboard ✅ (Render, not in code)

---

## Next Steps

1. Follow `DEPLOYMENT_CHECKLIST.md` step-by-step
2. Deploy MongoDB Atlas (5-10 min)
3. Deploy backend to Render (5-10 min)
4. Update frontend environment file
5. Deploy frontend to Vercel (auto-detects GitHub push)
6. Test all endpoints

---

**Estimated Time: 30-45 minutes for complete deployment** ⏱️

Need help? Check `HOSTING_GUIDE.md` for detailed instructions.
