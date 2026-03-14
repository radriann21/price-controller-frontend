import {
  Flex,
  Input,
  InputGroup,
  Skeleton,
  Pagination,
  ButtonGroup,
  IconButton,
  Text,
  Box,
  Grid,
  Badge,
} from "@chakra-ui/react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useGetCategories } from "@/features/home/hooks/useGetCategories";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { TOTAL_ITEMS } from "@/shared/utils/constants";
import type { Category } from "@/features/home/interfaces/categories.interface";
import { useState } from "react";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { ConfirmDeleteCategoryDialog } from "./ConfirmDeleteCategoryDialog";
import { CustomTable, type ColumnDef } from "@/shared/components/custom/CustomTable";
import { CategoryCard } from "./CategoryCard";

const columns: ColumnDef<Category>[] = [
  {
    id: "name",
    header: "Nombre",
    render: (item) => item.name,
  },
  {
    id: "description",
    header: "Descripción",
    render: (item) => item.description || "-",
  },
  {
    id: "updatedAt",
    header: "Actualizado",
    render: (item) => new Date(item.updatedAt).toLocaleDateString(),
  },
  {
    id: "isActive",
    header: "Estado",
    render: (item) => (
      <Badge colorPalette={item.isActive ? "green" : "red"}>
        {item.isActive ? "Activa" : "Inactiva"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    render: (item) => (
      <ButtonGroup>
        <EditCategoryDialog category={item} />
        <ConfirmDeleteCategoryDialog categoryId={item.id} />
      </ButtonGroup>
    ),
  },
];

export const CategoriesTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useGetCategories({
    page,
    limit: TOTAL_ITEMS,
    search: debouncedSearch,
  });

  return (
    <Flex direction="column" gapY="0.5rem" py="1rem">
      <Flex
        w="100%"
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "stretch", md: "center" }}
        justifyContent="space-between"
        gapY={{ base: "0.75rem", md: "0" }}
      >
        <InputGroup
          width={{ base: "100%", md: "420px" }}
          startElement={<Search size={16} />}
          bgColor="background.input"
        >
          <Input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </InputGroup>
        <Flex gapX="0.5rem">
          <CreateCategoryDialog />
        </Flex>
      </Flex>
      {isError ? (
        <Box
          p="4"
          bgColor="red.50"
          borderRadius="md"
          border="1px solid"
          borderColor="border.error"
        >
          <Flex alignItems="center" gapX="2">
            <AlertCircle size={20} color="icon.error" />
            <Text color="text.errorDark" fontWeight="medium">
              Error al cargar las categorías
            </Text>
          </Flex>
          <Text color="text.error" fontSize="sm" mt="2">
            {error?.message || "Ocurrió un error inesperado"}
          </Text>
        </Box>
      ) : (
        <>
          {/* Desktop Table View */}
          <Box display={{ base: "none", md: "block" }}>
            <CustomTable 
              columns={columns}
              data={categories?.data || []}
              isLoading={isLoading}
              emptyMessage="No se encontraron categorías"
            />
          </Box>

          {/* Mobile Card View */}
          <Box display={{ base: "block", md: "none" }}>
            {isLoading ? (
              <Grid templateColumns="repeat(1, 1fr)" gap="4" mt="2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box
                    key={index}
                    bgColor="background.card"
                    borderRadius="lg"
                    p="4"
                  >
                    <Skeleton height="120px" />
                  </Box>
                ))}
              </Grid>
            ) : (
              <Grid templateColumns="repeat(1, 1fr)" gap="4" mt="2">
                {categories?.data.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
                {!isLoading && categories?.data.length === 0 && (
                  <Box bgColor="background.card" borderRadius="lg" p="8">
                    <Text textAlign="center" color="text.tertiary">
                      No se encontraron categorías
                    </Text>
                  </Box>
                )}
              </Grid>
            )}
          </Box>
        </>
      )}
      <Pagination.Root
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        count={categories?.meta.total || 0}
        pageSize={TOTAL_ITEMS}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton colorPalette="orange">
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => (
              <IconButton
                colorPalette="orange"
                variant={{
                  base: "outline",
                  _selected: "solid",
                }}
              >
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton colorPalette="orange">
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
};
