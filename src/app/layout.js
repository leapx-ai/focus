'use client';

import '../index.css';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout ({ children }) {
  return (
    <html lang="zh">
      <head>
        <title>Focus - 番茄工作法</title>
        <meta name="description" content="一个美观、功能丰富的番茄工作法专注应用" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
