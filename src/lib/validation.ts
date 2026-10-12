// ===========================================
// Validation Schemas (Zod v4)
// ===========================================
import z from 'zod';

const PAYMENT_METHODS = ['bKash', 'Nagad', 'Rocket'] as const;

// Bangladesh phone number: 01XXXXXXXXX (11 digits starting with 01)
const bdPhoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

export const orderSubmissionSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  customerEmail: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),

  customerPhone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(bdPhoneRegex, 'Please enter a valid Bangladesh phone number (e.g., 01712345678)')
    .transform((val) => {
      // Normalize to 01XXXXXXXXX format
      if (val.startsWith('+880')) return '0' + val.slice(4);
      if (val.startsWith('880')) return '0' + val.slice(3);
      return val;
    }),

  paymentMethod: z.enum(PAYMENT_METHODS, {
    error: 'Please select a payment method',
  }),

  transactionId: z
    .string()
    .trim()
    .min(1, 'Transaction ID is required')
    .min(4, 'Transaction ID seems too short')
    .max(50, 'Transaction ID must be less than 50 characters'),

  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms to proceed'),
});

export type OrderSubmissionInput = z.input<typeof orderSubmissionSchema>;
export type OrderSubmissionOutput = z.output<typeof orderSubmissionSchema>;
