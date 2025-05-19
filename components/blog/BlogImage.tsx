'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';


interface BlogImageProps {
  imageUrl: string;
  title: string;
  height?: string;
}

export default function BlogImage({ imageUrl, title, height = "h-[300px]" }: BlogImageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <div className={`relative ${height} w-full bg-gray-100 animate-pulse`}></div>;
  }

  return (
    <div className={`relative ${height} w-full`}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover rounded-lg"
        priority
      />
    </div>
  );
} 

