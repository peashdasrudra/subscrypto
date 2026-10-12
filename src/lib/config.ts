// ===========================================
// Offer Configuration - Single Source of Truth
// ===========================================

export const OFFER_CONFIG = {
  product: {
    name: 'Google AI Pro (Gemini 3 Pro + 5TB)',
    code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    tagline: 'Student Subsidy Pass',
    description: '18-Month Subscription · Gemini 3 Pro & 5TB Cloud Storage',
  },
  pricing: {
    amount: parseInt(process.env.OFFER_PRICE_BDT || process.env.NEXT_PUBLIC_OFFER_PRICE_BDT || '349', 10),
    currency: 'BDT',
    currencySymbol: '৳',
    durationMonths: parseInt(process.env.OFFER_DURATION_MONTHS || process.env.NEXT_PUBLIC_OFFER_DURATION_MONTHS || '18', 10),
    referenceValue: 35349, // Approx retail equivalent value
    approxSavings: 35000, // Saving approx 35,000 Taka
    referenceValueVerified: true,
  },
  payment: {
    recipientNumber: process.env.PAYMENT_RECIPIENT_NUMBER || '01533679773',
    methods: ['bKash', 'Nagad', 'Rocket'] as const,
  },
  support: {
    email: process.env.SUPPORT_EMAIL || 'support@subscrypto.com',
    whatsapp: '01704184297',
    whatsappFormatted: '+880 1704-184297',
    whatsappLink: 'https://wa.me/8801704184297',
    responseTimeHours: 12,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Google AI Pro (Gemini 3 Pro + 5TB Storage) — ৳349 | Save ৳35,000',
    description: 'Unlock Gemini 3 Pro and 5 TB Cloud Storage for 18 months at only ৳349 BDT. Save approx ৳35,000 with the student allocation grant. Limited slots remaining!',
  },
} as const;

// Client-safe config (no server env vars)
export const CLIENT_OFFER_CONFIG = {
  product: OFFER_CONFIG.product,
  pricing: {
    amount: 349,
    currency: 'BDT' as const,
    currencySymbol: '৳',
    durationMonths: 18,
    referenceValue: 35349,
    approxSavings: 35000,
    referenceValueVerified: true,
  },
  payment: {
    recipientNumber: '01533679773',
    methods: ['bKash', 'Nagad', 'Rocket'] as const,
  },
  support: {
    email: 'support@subscrypto.com',
    whatsapp: '01704184297',
    whatsappFormatted: '+880 1704-184297',
    whatsappLink: 'https://wa.me/8801704184297',
    responseTimeHours: 12,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Google AI Pro (Gemini 3 Pro + 5TB Storage) — ৳349 | Save ৳35,000',
    description: 'Unlock Gemini 3 Pro and 5 TB Cloud Storage for 18 months at only ৳349 BDT. Save approx ৳35,000.',
  },
} as const;
