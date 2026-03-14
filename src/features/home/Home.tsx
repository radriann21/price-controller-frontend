import { Box, Tabs } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { HeroInfo } from "./components/HeroInfo";
import { ProductsTable } from "./components/products/ProductsTable";
import { useSSE } from "@/shared/hooks/useSSE";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import { BoxIcon, Tag } from "lucide-react";
import { CategoriesTable } from "./components/categories/CategoriesTable";
import type { SSEResponse } from "@/shared/interfaces/interfaces";

const Home = () => {
  const queryClient = useQueryClient();

  useSSE({
    url: import.meta.env.VITE_SSE_URL,
    enabled: true,
    onMessage: (data: SSEResponse) => {
      queryClient.setQueryData([queryKeys.rates], data.rate);
      toaster.create({
        title: "Tasa actualizada",
        description: data.message,
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ocurrio un error al actualizar",
        description: error.type,
        type: "error",
      });
    },
  });

  return (
    <Box bgColor="background.page" minH="100vh">
      <Header />
      <HeroInfo />
      <Tabs.Root defaultValue="products" px={{ base: "1rem", md: "2rem" }}>
        <Tabs.List>
          <Tabs.Trigger value="products">
            <BoxIcon />
            Productos
          </Tabs.Trigger>
          <Tabs.Trigger value="categories">
            <Tag />
            Categorias
          </Tabs.Trigger>
        </Tabs.List>
          <Tabs.Content value="products">
            <ProductsTable />
          </Tabs.Content>
          <Tabs.Content value="categories">
            <CategoriesTable />
          </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Home;
