"use client";
import Link from "next/link";
import { FiSearch, FiShoppingBag, FiUser, FiHeart } from "react-icons/fi"; // 아이콘
import { useUIStore } from "@/stores/useUIStore";

export default function Header() {
// 👇 스토어 사용
const { openSearch } = useUIStore();
// const totalCount = useCartStore((state) => state.getTotalCount());

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. 로고 (왼쪽) */}
        <Link href="/" className="text-2xl font-black tracking-tighter">
          Mw-Shop
        </Link>

        {/* 2. 메인 메뉴 (중앙) - 나중에 기능 추가 예정 */}
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-800">
          <Link href="/?category=top" className="hover:text-black transition">TOP</Link>
          <Link href="/?category=bottom" className="hover:text-black transition">BOTTOM</Link>
          <Link href="/?category=bag" className="hover:text-black transition">BAG</Link>
          <Link href="/?category=acc" className="hover:text-black transition">ACC</Link>
        </nav>

        {/* 3. 아이콘 메뉴 (오른쪽) */}
        <div className="flex items-center gap-5 text-xl text-gray-800">

          <button aria-label="검색" onClick={openSearch}><FiSearch /></button>

          <Link href="/wishlist" aria-label="위시리스트"><FiHeart /></Link>
          <Link href="/cart" aria-label="장바구니" className="relative">
            <FiShoppingBag />
            {/* 장바구니 뱃지 (나중에 상태 연결) */}
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <Link href="/login" aria-label="마이페이지"><FiUser /></Link>
        </div>
      </div>
    </header>
  );
}