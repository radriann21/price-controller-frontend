import { Box } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { HeroInfo } from "./components/HeroInfo";
import { ProductsTable } from "./components/ProductsTable";

const Home = () => {
  return (
    <Box bgColor="background.page" minH="100vh">
      <Header />
      <HeroInfo />
      <ProductsTable />
    </Box>
  )
}

export default Home