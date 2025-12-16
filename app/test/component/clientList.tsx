"use client";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@/features/test/api/getList";
import { getProductsClient } from "@/features/product/api/getProductsClient";


export function ClientList() {

  const { data } = useQuery({
    queryKey: ['products'],
    // queryFn: async () => await getProducts('all', 0),
    queryFn: async () => await getList(),
    staleTime: 1000 * 60,
    
  });


  console.log(`data`, data)

  return (
    <div>
      <h1>Client List</h1>
    </div>
  );
}