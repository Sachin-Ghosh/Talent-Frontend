import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"

export default function App({ Component, pageProps }) {
  return (
  <>
  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
  <Nav/>
  <Component {...pageProps} className="relative mt-10"/>
  <Footer/>
  </ThemeProvider>
  </>

  )
}
