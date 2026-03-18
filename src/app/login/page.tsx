import { Metadata } from 'next';
import Login from './Login';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Log in to your Lalasia account to access your profile, track orders, and discover unique handmade and vintage items.',
  openGraph: {
    title: 'Login | Lalasia',
    description:
      'Access your Lalasia account to explore unique handmade goods and manage your profile.',
    url: '/login',
    siteName: 'Lalasia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | Lalasia',
    description:
      'Log in to Lalasia to manage your account and discover unique items.',
  },
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    'login',
    'sign in',
    'account access',
    'lalasia login',
    'user account',
  ],
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
