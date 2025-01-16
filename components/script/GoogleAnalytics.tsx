import React from "react";
import Script from "next/script";

const GoogleAnalytics = ({ gtag }: { gtag: string }) => (
    <React.Fragment>
        {/* Google Tag Manager script */}
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
            strategy="afterInteractive" // Chạy script sau khi tải trang
        />

        <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
           gtag('config', '${gtag}'); 
        `}
        </Script>
    </React.Fragment>
);
export default GoogleAnalytics;