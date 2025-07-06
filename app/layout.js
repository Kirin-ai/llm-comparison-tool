import './globals.css'

export const metadata = {
  title: 'LLM Comparison Tool - Find the Perfect AI Model',
  description: 'Compare and choose the best Large Language Model for your needs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
