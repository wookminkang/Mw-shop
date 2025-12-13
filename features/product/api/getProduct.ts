import { createClient } from "@/utils/supabase/server";
import { Product } from "@/types";

export const getProductById = async (id: string) => {
  const supabase = await createClient();
  
  // single()을 써서 배열이 아니라 객체 하나만 받아옵니다.
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("상품 상세 조회 실패:", error);
    return null;
  }

  return data;
};