import { Box, Flex, Text, Card } from "@chakra-ui/react";
import type { Product } from "@/features/home/interfaces/products.interface";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card.Root
      bgColor="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
    >
      <Card.Body p="4">
        <Flex direction="column" gapY="3">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {product.name}
            </Text>
          </Box>

          <Flex direction="column" gapY="2">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Precio USD
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                ${product.costUsd}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Precio VES
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                Bs. {Number(product.priceVes).toLocaleString("es-VE")}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Margen
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="orange.600">
                {product.profitMargin}%
              </Text>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" pt="2" borderTopWidth="1px" borderColor="gray.200">
              <Text fontSize="xs" color="gray.500">
                Actualizado
              </Text>
              <Text fontSize="xs" color="gray.600">
                {new Date(product.updatedAt).toLocaleDateString("es-VE")}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
