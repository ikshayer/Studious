import "@styles/globals.css"
import Footer from "@components/Footer"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Provider from '@components/Provider'
import Navbar from "@components/Navbar.jsx"
export const metadata = {
  title: "Studious",
  description: "To help George Mason students find study groups",
};
import { Toaster } from "@components/ui/toaster";
import GlowEffect from "@components/GlowEffect";
export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Provider>
          
          <div className="main">
            
          </div>    
        <main className="app" >
            
            <Navbar/>
            {children}
            
            <Footer/>
        </main>
        
        <Toaster/>
        </Provider>
        
      </body>
      
    </html>
  );
}
