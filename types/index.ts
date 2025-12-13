// Product 타입 정의
export interface Product {
  id: number;
  name: string;
  brand_id: number;
  original_price: number;
  discount_rate: number;
  category: string;
  thumbnail_url: string;
  is_sold_out: boolean;
  created_at: string;
}