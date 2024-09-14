import "@/styles/globals.css";
import Nav from "@/components/Nav.js";
import Footer from "@/components/Footer.js";
import { ThemeProvider } from "@/components/theme-provider.js"
import SideNavbar from "@/components/Sidebar";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Nav toggleSidebar={toggleSidebar} />
        <div className={`flex ${sidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
          <SideNavbar isOpen={sidebarOpen} />
          <div className="flex-grow p-5">
            <Component {...pageProps} className="relative mt-10" />
          </div>
        </div>
        <Toaster />
        <Footer />
      </ThemeProvider>
    </>
  )
}
