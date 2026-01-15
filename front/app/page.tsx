'use client';

import EyeLogo from '../components/EyeLogo';
import UrlList from '../components/urlList';

export default function Page() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <EyeLogo />
      <UrlList />
    </main>
  );
}