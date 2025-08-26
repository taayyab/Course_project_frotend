import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import ProtectedRoute from "@/context/ProtectedRoute";
export const metadata: Metadata = {
  title: 'Course',
  description: 'Created by MOB',
  generator: 'MOb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div lang="en">
      <div>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </div>
     
     {children}
    
    </div>
  )
}
