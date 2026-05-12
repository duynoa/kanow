'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';

interface GoogleOAuthWrapperProps {
  children: React.ReactNode;
}

export default function GoogleOAuthWrapper({ children }: GoogleOAuthWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_CLIENT_ID ?? ''}>
      {children}
    </GoogleOAuthProvider>
  );
}
