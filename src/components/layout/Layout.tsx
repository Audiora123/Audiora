
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 Audiora. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
