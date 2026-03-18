import { Metadata } from 'next';
import Register from './Register';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create a Lalasia account to start exploring unique handmade items, vintage finds, and creative goods from independent sellers.',
  openGraph: {
    title: 'Register | Lalasia',
    description:
      'Join Lalasia and discover unique handmade goods while connecting with independent sellers worldwide.',
    url: '/register',
    siteName: 'Lalasia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register | Lalasia',
    description:
      'Sign up for Lalasia to explore and shop unique handmade and vintage items.',
  },
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    'register',
    'sign up',
    'create account',
    'lalasia registration',
    'join marketplace',
  ],
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
