import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { HeroInfo } from "./components/HeroInfo";
import { ProductsTable } from "./components/ProductsTable";
import { useSSE } from "@/shared/hooks/useSSE";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { SSEResponse } from "@/shared/interfaces/interfaces";

const Home = () => {
  const queryClient = useQueryClient();
  
  useSSE({
    url: import.meta.env.VITE_SSE_URL,
    enabled: true,
    onMessage: (data: SSEResponse) => {
      queryClient.setQueryData([queryKeys.rates], data.rate);
      toaster.create({
        title: 'Tasa actualizada',
        description: data.message,
        type: 'success',
      })
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  return (
    <Box bgColor="background.page" minH="100vh">
      <Header />
      <HeroInfo />
      <ProductsTable />
    </Box>
  )
}

export default Home