"use client"; // 필수!

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/features/cart/store/useCartStore"; 
import { FiHeart, FiShoppingBag } from "react-icons/fi";

interface Props {
  product: Product;
}

export default function AddToCartForm({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  // 실시간 가격 계산 (Client State인 quantity에 의존하므로 여기서 계산)
  const unitPrice = product.original_price * (1 - product.discount_rate / 100);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity);
    
    // 사용자 UX: confirm 창 대신 멋진 Toast를 쓰면 좋겠지만, 지금은 기본 기능에 충실
    if (confirm("상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?")) {
      window.location.href = "/cart";
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
      {/* 1. 수량 조절 UI */}
      <div className="flex justify-between items-center py-2">
        <span className="text-sm font-bold text-gray-800">수량</span>
        <div className="flex items-center border border-gray-200 rounded-sm bg-white">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"
          >
            -
          </button>
          <span className="w-10 text-center text-sm font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* 2. 총 금액 표시 (동적) */}
      <div className="flex justify-between items-center pb-4">
        <span className="text-sm font-bold text-gray-800">총 상품 금액</span>
        <span className="text-xl font-black text-orange-600">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      {/* 3. 하단 버튼 그룹 */}
      <div className="flex gap-2 h-14">
        <button className="w-14 border border-gray-200 flex items-center justify-center text-2xl hover:border-black transition duration-200">
          <FiHeart className="text-gray-400 hover:text-red-500 transition" />
        </button>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-200"
        >
          <FiShoppingBag className="text-xl" />
          장바구니 담기
        </button>
      </div>
    </div>
  );
}