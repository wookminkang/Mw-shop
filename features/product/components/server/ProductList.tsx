import { Product } from "@/types";
import ProductCard from "./ProductCard"; // 같은 폴더 내 import

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}