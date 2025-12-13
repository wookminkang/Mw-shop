import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  // 할인된 가격 계산
  const discountedPrice = product.original_price * (1 - product.discount_rate / 100);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* 1. 이미지 영역 */}
      <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden bg-gray-100 rounded-sm">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            width={300}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">NO IMG</div>
        )}
        
        {/* 품절 뱃지 */}
        {product.is_sold_out && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold tracking-widest z-10">
            SOLD OUT
          </div>
        )}
      </div>

      {/* 2. 텍스트 정보 영역 */}
      <div className="space-y-1">
        {/* 브랜드명 (가칭) */}
        <p className="text-xs font-bold text-gray-800 underline decoration-gray-300 underline-offset-4">
           Brand {product.brand_id} 
        </p>
        
        <h3 className="text-sm text-gray-900 truncate">{product.name}</h3>
        
        <div className="flex gap-2 items-center text-sm">
          {product.discount_rate > 0 && (
            <span className="text-orange-600 font-bold">{product.discount_rate}%</span>
          )}
          <span className="font-bold text-black">
            {discountedPrice.toLocaleString()}
          </span>
          {product.discount_rate > 0 && (
            <span className="text-gray-400 line-through text-xs">
              {product.original_price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}