import { useRouter } from 'next/router';
import NavigationBar from "../components/navigation/NavigationBar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col h-screen">
      <NavigationBar />
          {children}
      <footer className="w-full flex items-center justify-center py-3">
        {/* footer content */}
      </footer>
    </div>
  );
}