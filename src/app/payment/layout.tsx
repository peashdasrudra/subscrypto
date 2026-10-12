import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Your Order | Google AI Pro Student Offer',
  description: 'Complete your payment and submit your transaction details for the Google AI Pro 18-month student subscription.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
