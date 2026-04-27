// app/auth/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - LovePsychCare',
  description: 'Sign in to your LovePsychCare account and continue your mental health journey.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}