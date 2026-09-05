# SignSafe - Complete Website Package

## 🚀 Quick Deploy to Netlify

1. Go to https://netlify.com
2. Drag this entire folder to deploy
3. Add environment variables (see below)
4. Your site is live!

## 🔧 Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

| Variable | Value | Where to Find |
|----------|-------|---------------|
| STRIPE_SECRET_KEY | sk_live_... | Stripe Dashboard → Developers → API Keys |
| STRIPE_PUBLISHABLE_KEY | pk_live_... | Stripe Dashboard → Developers → API Keys |
| STRIPE_PRICE_ID | price_... | Stripe Dashboard → Products → Your Product |
| STRIPE_WEBHOOK_SECRET | whsec_... | Stripe Dashboard → Webhooks → Your Endpoint |
| URL | https://yoursite.netlify.app | Your Netlify site URL |

## 💰 How Money Flows

```
Customer pays $49 CAD
    ↓
Stripe processes (2.9% + 30¢ fee)
    ↓
$47.28 deposited to YOUR Canadian bank account
    ↓
Shows as "SIGNSAFE*PRO SUB" on their statement
```

## ✅ What Works With Your Existing Setup

- ✅ Same Stripe account
- ✅ Same bank account deposits
- ✅ Same $49/month product
- ✅ Same statement descriptor

## 📝 File Structure

```
signsafe-complete/
├── index.html              (main website)
├── package.json            (dependencies)
├── netlify.toml            (config)
├── README.md               (this file)
└── netlify/
    └── functions/
        ├── create-checkout.js   (payment creation)
        └── webhook.js          (payment notifications)
```

## 🧪 Test Before Going Live

Use Stripe test mode first:
- Test card: 4242 4242 4242 4242
- Any future date, any 3 digits for CVC

## 📞 Support

This code uses your existing Stripe setup. No changes to your bank account or deposit flow.
