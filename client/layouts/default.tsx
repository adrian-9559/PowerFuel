import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import NavigationBar from "@components/navigation/NavigationBar";
import Footer from "@components/footer/Footer";
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Divide la ruta en segmentos y elimina el primer segmento vacío
  const pathnames = router.pathname.split('/').filter(x => x);

  return (
    <div className="relative flex flex-col h-screen ">
      <NavigationBar />
      {/* <section className="p-16 w-full flex flex-row justify-center">
        <Breadcrumbs>
          {router.pathname !== "/" && (
            <BreadcrumbItem href="/" onClick={() => router.push("/")}>Inicio</BreadcrumbItem>
          )}
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <BreadcrumbItem key={to}>{value}</BreadcrumbItem>
            ) : (
              <BreadcrumbItem href={to} key={to} onClick={() => router.push(to)}>{value}</BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </section> */}
      <motion.main
          key={router.route} 
        >
        {children}
      </motion.main>
      <Footer/>
    </div>
  );
}