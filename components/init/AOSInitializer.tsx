'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      disable: false,
    });
  }, []);

  return null;
}
