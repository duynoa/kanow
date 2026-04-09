'use client';

export default function GoogleTagManager() {
  return (
    <>
      {/* Google Tag Manager (noscript) - placed right after <body> opening tag */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W5QK2CQ7"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
