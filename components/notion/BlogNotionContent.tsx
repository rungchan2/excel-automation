'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// 동적으로 NotionRenderer 컴포넌트 가져오기
const NotionRenderer = dynamic(() => import('@/components/notion/NotionRenderer'), {
  ssr: false,
  loading: () => <div className="py-8 text-center text-gray-500">콘텐츠를 불러오는 중...</div>
});

interface BlogNotionContentProps {
  recordMap: any;
}

export default function BlogNotionContent({ recordMap }: BlogNotionContentProps) {
  
  return <NotionRenderer recordMap={recordMap} />;
} 