import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AuthProvider } from  '@/app/context/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-Br">
      {/* <body>{children}</body> */}
      <AuthProvider >
      <body className={`${inter.className} antialiased`}>{children}
        VASCO DA GAMA
      </body>
      </AuthProvider>
    </html>
  );
}
