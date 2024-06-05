import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import NavigationBar from "@components/navigation/NavigationBar";
import Footer from "@components/footer/Footer";
import { useAppContext } from '@context/AppContext';
import { Head } from './head';
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { webTitle } = useAppContext();



  const adminPaths = ['/admin/', '/users/config', '/cart', '/web'];
const isFullScreen = !adminPaths.some(path => router.pathname.startsWith(path));

  return (
    <div className="relative flex flex-col h-screen ">
      <Head title={webTitle} />
      <NavigationBar />
      <motion.main
          key={router.route} 
          className={`${isFullScreen?'max-w-[96rem] mx-auto':''} px-4 lg:px-8`}
        >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}