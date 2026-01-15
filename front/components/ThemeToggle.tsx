// 'use client';

// import { useState, useEffect } from 'react';

// export default function ThemeToggle() {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const theme = localStorage.getItem('theme') || 'light';
//     if (theme === 'dark') {
//       setIsDark(true);
//       document.documentElement.classList.add('dark');
//     } else {
//       setIsDark(false);
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//     if (!isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all hover:scale-110"
//     >
//       {isDark ? '☀️' : '🌙'}
//     </button>
//   );
// }