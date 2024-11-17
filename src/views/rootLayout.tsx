import { Html } from "@kitajs/html";

interface RootLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
        <link rel="stylesheet" href="/public/globals.css" />
      </head>
      <body>{children}</body>
    </html>
  );
};
