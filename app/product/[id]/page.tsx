import { notFound } from "next/navigation";
import { getProductById } from "@/features/product/api/getProduct";

// 👇 여기가 중요! 클라이언트 컴포넌트는 client 폴더에서 가져옵니다.
import AddToCartForm from "@/features/product/components/client/AddToCartForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  // 1. 서버에서 DB 직접 호출 (빠르고 SEO 좋음)

  const { id } = await params;

  const product = await getProductById(id);

  // 상품이 없으면 404 페이지로 튕겨냄
  if (!product) {
    notFound();
  }

  // 할인가 계산 (서버에서 미리 계산)
  const finalPrice = product.original_price * (1 - product.discount_rate / 100);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* [Left] 이미지 영역 (서버 렌더링) */}
        <div className="w-full md:w-1/2">
          <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden rounded-sm">
             {product.thumbnail_url ? (
               <img 
                 src={product.thumbnail_url} 
                 alt={product.name} 
                 className="object-cover w-full h-full"
               />
             ) : (
               <div className="flex items-center justify-center w-full h-full text-gray-300">NO IMAGE</div>
             )}
          </div>
        </div>

        {/* [Right] 정보 영역 */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* 브랜드 & 상품명 (서버 렌더링) */}
          <div className="border-b border-black pb-6 mb-6">
            <p className="font-bold underline mb-2 text-gray-800">
              Brand {product.brand_id}
            </p>
            <h1 className="text-3xl font-normal leading-tight mb-4 text-gray-900">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3">
              {product.discount_rate > 0 && (
                <span className="text-3xl font-bold text-orange-600">
                  {product.discount_rate}%
                </span>
              )}
              <span className="text-3xl font-bold">
                {finalPrice.toLocaleString()}원
              </span>
              {product.discount_rate > 0 && (
                 <span className="text-xl text-gray-400 line-through font-medium">
                   {product.original_price.toLocaleString()}원
                 </span>
              )}
            </div>
          </div>

          {/* 배송 정보 (Static) */}
          <div className="space-y-3 text-sm text-gray-600 mb-8">
            <div className="flex gap-4">
              <span className="font-bold min-w-[60px] text-black">배송정보</span>
              <span>29CM 무료배송</span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold min-w-[60px]"></span>
              <span>CJ대한통운 | 도서산간 제외</span>
            </div>
          </div>

          {/* 👇 여기가 핵심! 
              유일하게 움직이는(Interactive) 부분인 '장바구니 폼'만 
              클라이언트 컴포넌트로 끼워 넣습니다. */}
          {/* <AddToCartForm product={product} /> */}
          
        </div>
      </div>

      {/* (옵션) 상세 이미지 영역 */}
      <div className="mt-20 border-t pt-10">
        <h3 className="text-xl font-bold mb-6">상품 상세 정보</h3>
        <div className="bg-gray-50 p-10 text-center text-gray-500 min-h-[400px] flex items-center justify-center">
          상세 이미지가 들어갈 영역입니다.
        </div>
      </div>
    </main>
  );
}