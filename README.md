# CJ Code Solutions Portfolio

Frontend: React + Vite (GitHub Pages)  
Backend API: Vercel Serverless Function (MongoDB)

## Split Deployment (Recommended)

### 1) Deploy backend to Vercel

This project already has the backend route in `api/reviews.js`.

1. Push your code to GitHub.
2. In Vercel, create a new project from this repository.
3. Add environment variable:
	- `MONGODB_URI` = your MongoDB Atlas connection string
4. Deploy.
5. Copy your backend URL, example:
	- `https://cj-backend.vercel.app`

Test endpoint:

- `GET https://your-backend.vercel.app/api/reviews`

### 2) Point frontend to Vercel backend

Create `.env.production` in project root:

```env
VITE_API_URL=https://your-backend.vercel.app
```

You can copy from `.env.example`.

### 3) Deploy frontend to GitHub Pages

This project is already configured with deploy scripts in `package.json`.

Run:

```bash
npm install
npm run deploy
```

Then enable GitHub Pages in your repository settings (branch: `gh-pages`).

## Local Development

```bash
npm install
npm run dev
```

If `VITE_API_URL` is not set locally, the app uses same-origin `/api/reviews`.

## Important Notes

- CORS is already enabled in `api/reviews.js`.
- If reviews are not saved in MongoDB, check Vercel logs and verify `MONGODB_URI`.
- Frontend review submit now defaults to API endpoint and only falls back to local storage if request fails.
