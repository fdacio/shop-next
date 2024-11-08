import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AuthProvider } from '@/app/context/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-Br">
      <AuthProvider >
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
