import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console | SubsCrypto Student AI Desk',
  description: 'Operations and verification dashboard for SubsCrypto student orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
