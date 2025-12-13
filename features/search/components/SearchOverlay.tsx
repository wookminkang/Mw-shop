"use client";

import { useState, useEffect } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { createClient } from "@/utils/supabase/client"; // 클라이언트용 Supabase
import { Product } from "@/types";
import Link from "next/link";
import { FiX, FiSearch, FiChevronRight } from "react-icons/fi";

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

  // 검색 로직 (Debounce 적용: 타자 칠 때마다 요청 보내면 서버 아프니까 0.3초 딜레이)
  useEffect(() => {
    const fetchSearch = async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      // Supabase 'ilike' = 대소문자 구분 없이 포함된 단어 찾기 (%keyword%)
      const { data } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${keyword}%`) 
        .limit(5); // 5개만 미리보기

      setResults(data || []);
      setLoading(false);
    };

    const timer = setTimeout(fetchSearch, 200); // 0.3초 기다림
    return () => clearTimeout(timer);
  }, [keyword, supabase]);

  // 검색창이 닫혀있으면 렌더링 안 함 (혹은 CSS로 숨김)
  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* 1. 닫기 버튼 */}
        <div className="flex justify-end mb-8">
          <button onClick={closeSearch} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiX className="text-3xl" />
          </button>
        </div>

        {/* 2. 검색어 입력 */}
        <div className="relative border-b-4 border-black pb-2 mb-12">
          <input
            type="text"
            placeholder="상품명, 브랜드 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full text-4xl font-bold placeholder-gray-300 outline-none bg-transparent"
            autoFocus
          />
          <FiSearch className="absolute right-0 bottom-4 text-3xl text-gray-400" />
        </div>

        {/* 3. 검색 결과 리스트 */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-gray-400">검색중...</p>
          ) : keyword && results.length === 0 ? (
            <p className="text-gray-400">검색 결과가 없습니다.</p>
          ) : (
            results.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                onClick={closeSearch} // 클릭하면 검색창 닫기
                className="flex items-center gap-4 p-4 hover:bg-gray-50 group transition"
              >
                {/* 썸네일 */}
                <div className="w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden">
                    {product.thumbnail_url && (
                        <img src={product.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    )}
                </div>
                
                {/* 정보 */}
                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 mb-1">Brand {product.brand_id}</p>
                    <p className="font-bold text-lg group-hover:underline">{product.name}</p>
                </div>

                <FiChevronRight className="text-gray-300 group-hover:text-black" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}