"use client";

import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    useEffect(() => {
        const token = localStorage.getItem("token");
    
        console.log(token);
    
        if (!token) {
          window.location.href = "/SignIn"; 
        }
      }, []);

      
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
