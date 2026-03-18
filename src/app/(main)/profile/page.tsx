import { Metadata } from 'next';
import Profile from './Profile';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'View and manage your Lalasia profile, track your orders, and update your personal information.',
  openGraph: {
    title: 'Profile | Lalasia',
    description:
      'Manage your Lalasia account, view your activity, and explore your personalized experience.',
    url: '/profile',
    siteName: 'Lalasia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile | Lalasia',
    description:
      'Access your Lalasia profile to manage your account and activity.',
  },
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    'profile',
    'user profile',
    'account settings',
    'lalasia account',
    'order tracking',
  ],
};

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
