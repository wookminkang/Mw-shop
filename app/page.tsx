import { getProducts } from "@/features/product/api/getProducts";
import CategoryNav from "@/features/product/components/client/CategoryNav";
import ProductInfiniteList from "@/features/product/components/client/ProductInfiniteList";

interface Props {
  searchParams: Promise<{ category?: string }>; // Next.js 15: Promise 타입
}

export default async function Home({ searchParams }: Props) {
  // 1. 파라미터 대기 (Next 15)
  const params = await searchParams;
  const category = params.category || "all";

  // 2. [Server] 첫 8개 데이터 가져오기 (SEO용)
  const initialProducts = await getProducts(category, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-end justify-between">
        <h1 className="text-4xl font-black tracking-tight uppercase">
          {category === 'all' ? 'New Arrivals' : category}
        </h1>
      </div>

      {/* 클라이언트 컴포넌트들 */}
      <CategoryNav />
      
      {/* 초기 데이터를 넘겨주며 하이브리드 시작! */}
      <ProductInfiniteList initialProducts={initialProducts} />
      
    </main>
  );
}