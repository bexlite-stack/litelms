import { Html } from "@kitajs/html";

interface RootLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js" />
        <script src="//unpkg.com/alpinejs" defer />
        <script src="https://unpkg.com/htmx.org@2.0.3" />
        <link rel="stylesheet" href="/public/globals.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <script src="/public/chart.js" />
      </body>
    </html>
  );
};
