import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" web-version={process.env.NEXT_PUBLIC_WEB_VERSION} seo={process.env.NEXT_PUBLIC_SEO}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ep1.adtrafficquality.google" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
        {/* Use logo_ss.jpeg as the primary favicon & apple touch icon */}
        <link rel="icon" href="/logo_ss.jpeg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo_ss.jpeg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo_ss.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo_ss.jpeg" />
      </Head>
      <body className="!pointer-events-auto antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
