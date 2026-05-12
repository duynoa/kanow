'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';

interface GoogleOAuthWrapperProps {
  children: React.ReactNode;
}

export default function GoogleOAuthWrapper({ children }: GoogleOAuthWrapperProps) {
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    // Server / first render: render null to avoid hydration mismatch
    // Client will remount and render the actual provider
    setMounted(true);
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_CLIENT_ID ?? ''}>
      {children}
    </GoogleOAuthProvider>
  );
}
