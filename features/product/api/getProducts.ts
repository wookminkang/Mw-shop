import { createClient } from "@/utils/supabase/server";
import { Product } from "@/types";

// page 인자를 받아서 범위를 자릅니다. (기본값 0)
export const getProducts = async (category?: string, page: number = 0): Promise<Product[]> => {
  const supabase = await createClient();
  const LIMIT = 8;
  const from = page * LIMIT;
  const to = from + LIMIT - 1;

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to); // 👈 0~7번만 가져와라!

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("상품 로딩 실패:", error);
    return [];
  }

  return data || [];
};