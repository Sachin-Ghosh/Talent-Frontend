import "@/styles/globals.css";
import Nav from "@/components/Nav.js";
import Footer from "@/components/Footer.js";
import { ThemeProvider } from "@/components/theme-provider.js"
import SideNavbar from "@/components/Sidebar";
import { useState } from "react";
export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  <SideNavbar isOpen={sidebarOpen}/>
  <Component {...pageProps} className="relative mt-10"/>
  <Footer/>
  </ThemeProvider>
  </>

  )
}
