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
    <Box bgColor="background.page" minH="100vh" pb={{ base: "2rem", md: "1rem" }}>
      <Header />
      <HeroInfo />
      <Tabs.Root 
        defaultValue="products" 
        px={{ base: "0.5rem", sm: "1rem", md: "2rem" }}
      >
        <Tabs.List 
          px={{ base: "0.5rem", sm: "0" }}
          gap={{ base: "0.5rem", md: "1rem" }}
        >
          <Tabs.Trigger 
            value="products"
            fontSize={{ base: "sm", md: "md" }}
            px={{ base: "0.75rem", md: "1rem" }}
            gap={{ base: "0.5rem", md: "0.5rem" }}
          >
            <BoxIcon size={18} />
            Productos
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="categories"
            fontSize={{ base: "sm", md: "md" }}
            px={{ base: "0.75rem", md: "1rem" }}
            gap={{ base: "0.5rem", md: "0.5rem" }}
          >
            <Tag size={18} />
            Categorias
          </Tabs.Trigger>
        </Tabs.List>
          <Tabs.Content value="products" pt={{ base: "1rem", md: "1.5rem" }}>
            <ProductsTable />
          </Tabs.Content>
          <Tabs.Content value="categories" pt={{ base: "1rem", md: "1.5rem" }}>
            <CategoriesTable />
          </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Home;
