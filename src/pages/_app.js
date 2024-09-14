import "@/styles/globals.css";
import Nav from "@/components/Nav.js";
import Footer from "@/components/Footer.js";
import { ThemeProvider } from "@/components/theme-provider.js";
import SideNavbar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/sonner"

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // State to control visibility of Nav and SideNavbar
  const [showNavAndSidebar, setShowNavAndSidebar] = useState(true);

  useEffect(() => {
    // Check if the current route is '/test'
    if (router.pathname === '/test') {
      setSidebarOpen(false)
      setShowNavAndSidebar(false);
    } else {
      setShowNavAndSidebar(true);
    }
  }, [router.pathname]);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {showNavAndSidebar && (
          <>
            <Nav toggleSidebar={toggleSidebar} />
            <SideNavbar isOpen={sidebarOpen} />
          </>
        )}
        <div className={`flex ${sidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
          <div className={`flex-grow ${sidebarOpen ? 'pl-8' : 'pl-0'}`}>
            <Component {...pageProps} className="relative" />
          </div>
        </div>
        <Toaster />
        {showNavAndSidebar && <Footer />}
      </ThemeProvider>
    </>
  )
}
