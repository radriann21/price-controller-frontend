import { Box, Flex, Text, Card, Badge, ButtonGroup } from "@chakra-ui/react";
import type { Category } from "@/features/home/interfaces/categories.interface";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { ConfirmDeleteCategoryDialog } from "./ConfirmDeleteCategoryDialog";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card.Root
      bgColor="background.card"
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
            <Text fontSize="lg" fontWeight="bold" color="text.primary">
              {category.name}
            </Text>
          </Box>

          <Flex direction="column" gapY="2">
            {category.description && (
              <Box>
                <Text fontSize="sm" color="text.secondary" fontWeight="medium">
                  Descripción
                </Text>
                <Text fontSize="sm" color="text.tertiary" mt="1">
                  {category.description}
                </Text>
              </Box>
            )}

            <Flex justifyContent="space-between" alignItems="center" pt="2" borderTopWidth="1px" borderColor="border.default">
              <Text fontSize="xs" color="text.tertiary">
                Actualizado
              </Text>
              <Text fontSize="xs" color="text.secondary">
                {new Date(category.updatedAt).toLocaleDateString("es-VE")}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" pt="2">
              <Badge colorPalette={category.isActive ? "green" : "red"} size="sm">
                {category.isActive ? "Activa" : "Inactiva"}
              </Badge>
              <ButtonGroup size="sm">
                <EditCategoryDialog category={category} />
                <ConfirmDeleteCategoryDialog categoryId={category.id} />
              </ButtonGroup>
            </Flex>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
