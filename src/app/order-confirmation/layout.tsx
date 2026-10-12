import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation | Google AI Pro Student Offer',
  description: 'Your order has been submitted for review.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
