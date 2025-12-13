"use client"; // 필수!

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "top", label: "의류" },
  { id: "bag", label: "가방" },
  { id: "acc", label: "액세서리" },
];

export default function CategoryNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <nav className="flex gap-6 mb-10 border-b border-gray-100">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={cat.id === "all" ? "/" : `/?category=${cat.id}`}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
            currentCategory === cat.id
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}