# Google AI Pro — Student Offer Website (Bangladesh)

A production-grade, conversion-optimized web platform offering an **18-Month Google AI Pro Student Subscription** for **৳349 BDT** tailored specifically for university students in Bangladesh.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Supabase.

---

## 🌟 Key Features

### 1. High-Converting Landing Page
- **Hero Section:** Clear value proposition, countdown badge, authentic price anchor (৳349 vs ৳3,600 regular), student trust badges.
- **Academic Benefits Grid:** Highlights Gemini 1.5 Pro, 2M context window, NotebookLM research assistant, code generation, and 2TB Google One storage.
- **Student Use-Cases:** Tailored for CS & Engineering students, Thesis & Literature reviewers, and Exam preparation.
- **Transparent Workflow:** 3-step transparent fulfillment model (Order & Pay -> Verification -> Email Activation).
- **FAQ Accordion:** Answers addressing activation method, university email requirements, renewal terms, and customer support.

### 2. Manual MFS Payment Flow (bKash, Nagad, Rocket)
- **Guided Payment Steps:** Step-by-step instructions for `Send Money` across bKash, Nagad, and Rocket with merchant recipient number (`01533679773`).
- **Interactive QR Code Generator:** Dynamically creates mobile MFS QR codes for scanning directly from mobile wallets.
- **Instant Clipboard Helpers:** One-tap copy for recipient phone number and reference note.

### 3. Bulletproof Order Submission & Validation
- **Client & Server-side Validation:** Powered by Zod v4 schemas.
- **Bangladesh-Specific Validations:**
  - Phone validation supporting Bangladeshi prefixes (`013-019`, 11 digits).
  - Transaction ID format validation (`8-12 alphanumeric characters`).
  - Google email validation for subscription delivery.
  - Optional academic institutional email verification.
- **Rate Limiting:** Prevents submission spam and brute-force abuse.
- **Dev-Friendly In-Memory Fallback:** Works seamlessly even before Supabase credentials are configured.

### 4. Order Confirmation & Tracking
- **Order Lookup Endpoint:** `/api/orders/lookup?ref=ORD-XXXXXXXX` safely reveals non-sensitive receipt details.
- **Order Confirmation Page:** Displays order reference, activation SLA (within 2-6 hours), payment method, and WhatsApp/Email support links.
- **Email Notification Hook:** Integrated with Resend for admin alerts when orders are placed.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI & State:** [React 19](https://react.dev), [React Hook Form](https://react-hook-form.com)
- **Validation:** [Zod v4](https://zod.dev)
- **Icons & Graphics:** [Lucide React](https://lucide.dev)
- **Database & Storage:** [Supabase](https://supabase.com) (PostgreSQL + Row-Level Security)
- **QR Generation:** [qrcode](https://www.npmjs.com/package/qrcode)
- **Email:** [Resend](https://resend.com) (optional)

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 20+
- npm 10+

### 2. Clone & Install
```bash
git clone <repository-url>
cd SubsCrypto
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (Optional for local testing; app includes in-memory fallback)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Notifications (Optional)
RESEND_API_KEY=re_your_api_key
ORDER_NOTIFICATION_EMAIL=admin@yourdomain.com
SUPPORT_EMAIL=support@yourdomain.com

# Business Rules
PAYMENT_RECIPIENT_NUMBER=01533679773
OFFER_PRICE_BDT=349
OFFER_DURATION_MONTHS=18
```

### 4. Database Setup (Supabase)
Run the SQL migration in `supabase/migrations/001_create_orders.sql` inside your Supabase SQL Editor:
- Creates the `orders` table.
- Configures Row-Level Security (RLS) allowing insert and service-role reads.
- Adds indexes for `order_reference`, `customer_email`, and `trx_id`.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build & Health Check
```bash
npm run build
npm run start
```
Test health status at: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## ☁️ Cloud Deployment Guide (GitHub + Vercel + Supabase)

### 1. Push to GitHub
The local Git repository is initialized and committed on `main`. To push to your GitHub repository:
```bash
git push -u origin main
```
> **Note:** If prompted by Git Credential Manager, complete your GitHub sign-in in your browser or supply your GitHub Personal Access Token (PAT).

### 2. Supabase Cloud Setup (Database)
1. Go to [supabase.com](https://supabase.com) and sign in or create a free project.
2. Navigate to **SQL Editor** in the left sidebar.
3. Open `supabase/migrations/001_create_orders.sql` from this repository, paste the entire SQL code, and click **Run**.
   - This creates the `orders` table with UUID primary keys.
   - Configures status checks (`PENDING_REVIEW`, `PAYMENT_CONFIRMED`, `COMPLETED`, etc.).
   - Establishes Row-Level Security (RLS) allowing anonymous order creation and receipt lookup by reference.
   - Sets up auto-updating timestamps.
4. Go to **Project Settings** -> **API** and copy:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys (anon public)** -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API Keys (service_role)** -> `SUPABASE_SERVICE_ROLE_KEY`

### 3. Deploy to Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`peashdasrudra/subscrypto`).
4. In the **Environment Variables** section, add:
   | Variable | Value | Description |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-domain.vercel.app` | Production public URL |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-id.supabase.co` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJh...` | Supabase Anon Public Key |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJh...` | Supabase Service Role Key |
   | `PAYMENT_RECIPIENT_NUMBER` | `01533679773` | bKash/Nagad/Rocket number |
   | `OFFER_PRICE_BDT` | `349` | Student offer price in BDT |
   | `OFFER_DURATION_MONTHS` | `18` | Subscription duration |
   | `ORDER_NOTIFICATION_EMAIL` | `admin@example.com` | Notification recipient (optional) |
   | `RESEND_API_KEY` | `re_...` | Resend API key for automated emails (optional) |
5. Click **Deploy**. Vercel will build and deploy your application with serverless Next.js edge support.

### 4. Verify Live Cloud Health
Once deployed, verify your deployment:
- Open `https://your-domain.vercel.app/api/health`
- It will return:
  ```json
  {
    "status": "ok",
    "environment": "production",
    "database": {
      "configured": true,
      "status": "connected",
      "latencyMs": 42
    }
  }
  ```

## 🔒 Security & Data Privacy

1. **Transaction ID Uniqueness:** Prevents duplicate transaction reuse.
2. **Rate Limiting:** Protects `/api/orders` against spam submissions.
3. **No Direct Secret Exposure:** Supabase Service Role key is only accessed within server-side API routes.
4. **No Public Order Listing:** Only non-sensitive order metadata is returned via the ref lookup endpoint.

---

## 📄 License
MIT License. Independently operated service. Not affiliated with, endorsed by, or operated by Google LLC.
