import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import WhatsAppFab from '@/components/layout/WhatsAppFab/WhatsAppFab';

export default function SiteShell({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
