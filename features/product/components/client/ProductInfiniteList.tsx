"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getProductsClient } from "@/features/product/api/getProductsClient";
import ProductCard from "@/features/product/components/server/ProductCard";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";

interface Props {
  initialProducts: Product[]; // 서버에서 받아온 따끈한 8개
}

export default function ProductInfiniteList({ initialProducts }: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", category],
    // 0번 페이지는 initialData로 있으니, 1번(2페이지)부터 가져옵니다.
    queryFn: ({ pageParam = 1 }) => getProductsClient(category, pageParam),
    
    // 👇 [핵심] 하이브리드 연결고리!
    // 서버 데이터를 React Query 캐시에 미리 넣어둡니다.
    initialData: {
      pages: [initialProducts],
      pageParams: [0], // 0번 페이지는 이미 있다!
    },
    
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 8개 미만으로 오면 다음 페이지 없음
      return lastPage.length < 8 ? undefined : allPages.length;
    },
  });

  // 스크롤 감지
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
        {data?.pages.map((page) =>
          page.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* 로딩 표시 및 바닥 감지 */}
      <div ref={ref} className="h-20 flex justify-center items-center mt-8">
        {isFetchingNextPage && (
           <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        )}
      </div>
    </>
  );
}