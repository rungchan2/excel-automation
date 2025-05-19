'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { NotionRenderer as ReactNotionX } from 'react-notion-x';

// 필요한 컴포넌트를 동적으로 로드
const Code = dynamic(() => 
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(
    (m) => m.Equation
  )
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

export default function NotionRenderer({ recordMap, className = '' }: { recordMap: any; className?: string }) {
  if (!recordMap) {
    return <div className="py-8 text-center text-gray-500">콘텐츠를 불러오는 중...</div>;
  }

  return (
    <div className={`notion-renderer ${className}`}>
      <ReactNotionX
        recordMap={recordMap}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Pdf,
          Modal
        }}
        fullPage={false}
        darkMode={false}
        showTableOfContents={false}
        minTableOfContentsItems={3}
        isImageZoomable={true}
        pageTitle={false}
        previewImages={true}
      />
    </div>
  );
} 