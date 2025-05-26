import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * 문의 갯수를 가져오는 API 엔드포인트
 * 보안을 위해 레퍼러 검증과 API 키 검증을 수행합니다.
 * @route GET /api/get-inquiry-number
 * @returns {Promise<NextResponse>} 문의 갯수 정보
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  try {
    // 1. 레퍼러 체크 - 지정된 도메인에서만 API 호출 허용
    const referer = request.headers.get("referer") || "";
    const allowedDomains = [
      "classflow.monstercoop.co.kr",
      "localhost:3000",
    ].filter(Boolean) as string[];
    
    const isValidReferer = !referer || allowedDomains.some(domain => 
      referer.includes(domain)
    );

    // 2. API 키 검증 (URL 파라미터로 제공되는 간단한 API 키)
    const url = new URL(request.url);
    const apiKey = url.searchParams.get("api_key");
    const validApiKey = process.env.PUBLIC_API_KEY || "classflow_public_key";
    const isValidApiKey = apiKey === validApiKey;

    // 레퍼러나 API 키 중 하나라도 유효하면 접근 허용
    if (!isValidReferer && !isValidApiKey) {
      return NextResponse.json(
        { error: "접근이 거부되었습니다. 유효하지 않은 출처입니다." },
        { status: 403 }
      );
    }

    // Supabase 클라이언트를 사용하여 inquiry 테이블의 총 레코드 수 조회
    const { count, error } = await supabase
      .from("inquiry")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("문의 갯수 조회 에러:", error.message);
      return NextResponse.json(
        { error: "문의 갯수를 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 결과 반환 - 캐싱 제어 헤더 추가
    return NextResponse.json({ count }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': allowedDomains.join(', ')
      }
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
