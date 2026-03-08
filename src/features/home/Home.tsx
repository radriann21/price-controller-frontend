import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { HeroInfo } from "./components/HeroInfo";
import { ProductsTable } from "./components/ProductsTable";

export const Home = () => {
  return (
    <Box bgColor="orange.subtle" minH="100vh">
      <Header />
      <HeroInfo />
      <ProductsTable />
    </Box>
  )
}