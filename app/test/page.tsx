
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { ClientList } from "./component/clientList"
import { getList } from "@/features/test/api/getList"



export default async function TestPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'], 
    queryFn: async () => await getList(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientList />
    </HydrationBoundary>
  );
}



