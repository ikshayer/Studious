import "@styles/globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Provider from '@components/Provider'
import Navbar from "@components/Navbar.jsx"
export const metadata = {
  title: "Studious",
  description: "To help George Mason students find study groups",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Provider>    
        <main className="app" >
            <Navbar/>
            {children}
        </main>
        </Provider>
      </body>
      
    </html>
  );
}
