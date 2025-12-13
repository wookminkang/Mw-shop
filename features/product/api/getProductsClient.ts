
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/types";

export const getProductsClient = async (category: string, pageParam: number): Promise<Product[]> => {
  const supabase = createClient();
  const LIMIT = 8;
  const from = pageParam * LIMIT;
  const to = from + LIMIT - 1;

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data || [];
};