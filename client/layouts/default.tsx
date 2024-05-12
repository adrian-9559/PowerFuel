import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import NavigationBar from "@components/navigation/NavigationBar";
import Footer from "@components/footer/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  /* 
    const hideOnRoutes = ['/login', '/register'];

    Comprueba si la ruta actual está en la lista de rutas donde no quieres mostrar la barra de navegación
    const showNavbar = !hideOnRoutes.includes(router.pathname);

    {showNavbar && <NavigationBar />}
  */

  // Animación: Fade in y out
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: { opacity: 0 }
  };

  return (
    <div className="relative flex flex-col h-screen">
      <NavigationBar />
      <motion.main
          key={router.route} // Cambia la clave cuando cambia la ruta
          variants={variants} // Pasa las variantes de la animación
          initial="hidden" // Estado inicial
          animate="show" // Anima al estado "show" cuando se monta
          exit="exit" // Anima al estado "exit" cuando se desmonta
          style={{ flexGrow: 1 }} // Añade flex-grow: 1 para que siempre esté abajo
        >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}