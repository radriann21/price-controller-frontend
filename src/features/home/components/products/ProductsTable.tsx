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
  NativeSelect,
} from "@chakra-ui/react";
import { Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useGetProducts } from "@/features/home/hooks/products/useGetProducts";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CreateProductDialog } from "@/features/home/components/products/CreateProductDialog";
import { TOTAL_ITEMS } from "@/shared/utils/constants";
import { ConfirmUpdateDialog } from "@/features/home/components/products/ConfirmUpdateDialog";
import { ProductCard } from "@/features/home/components/products/ProductCard";
import { ImportProductsDialog } from "@/features/home/components/products/ImportProductsDialog";
import type { Product } from "@/features/home/interfaces/products.interface";
import { type ReactNode, useState } from "react";
import { ConfirmDeleteDialog } from "@/features/home/components/products/ConfirmDeleteDialog";
import { EditProductDialog } from "@/features/home/components/products/EditProductDialog";
import { CustomTable } from "@/shared/components/custom/CustomTable";

interface Column {
  id: keyof Product | string;
  header: string;
  render?: (item: Product) => ReactNode;
}

const columns: Column[] = [
  {
    id: "name",
    header: "Nombre",
    render: (item) => item.name,
  },
  {
    id: "costUsd",
    header: "Precio USD",
    render: (item) => {
      const USDPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(item.costUsd);
      return <Text>{USDPrice}</Text>;
    },
  },
  {
    id: "priceVes",
    header: "Precio Bs.S",
    render: (item) => {
      const VESPrice = new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "VES",
      }).format(item.priceVes);
      return <Text>{VESPrice}</Text>;
    },
  },
  {
    id: "profitMargin",
    header: "Margen",
    render: (item) => <Text>{item.profitMargin}%</Text>,
  },
  {
    id: "category",
    header: "Categoría",
    render: (item) => item.category.name,
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
        {item.isActive ? "Activo" : "Inactivo"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    render: (item) => (
      <ButtonGroup>
        <EditProductDialog product={item} />
        <ConfirmDeleteDialog productId={item.id} />
      </ButtonGroup>
    ),
  },
];

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState<string | undefined>(undefined);
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useGetProducts({
    page,
    limit: TOTAL_ITEMS,
    search: debouncedSearch,
    isActive,
  });

  return (
    <Flex
      direction="column"
      gapY="0.5rem"
      py={{ base: "0.5rem", md: "1rem", lg: "0" }}
    >
      <Flex
        w="100%"
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "center" }}
        justifyContent="space-between"
        gap={{ base: "0.75rem", lg: "1rem" }}
        flexWrap="wrap"
      >
        <Flex
          alignItems="center"
          gap="0.5rem"
          direction={{ base: "column", sm: "row" }}
          width={{ base: "100%", lg: "auto" }}
          flexShrink={0}
          flexWrap={{ base: "nowrap", md: "wrap", lg: "nowrap" }}
        >
          <InputGroup
            width={{ base: "100%", sm: "auto", md: "240px" }}
            startElement={<Search size={16} />}
            bgColor="background.input"
            flex={{ base: "1", sm: "1", md: "0" }}
            minWidth={{ sm: "280px" }}
          >
            <Input
              placeholder="Buscar por nombre o categoría..."
              size={{ base: "sm", md: "sm", lg: "md" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </InputGroup>
          <NativeSelect.Root
            size={{ base: "sm", md: "sm", lg: "md" }}
            width={{ base: "100%", sm: "auto", md: "140px" }}
            bgColor="white"
            flexShrink={0}
            minWidth={{ sm: "120px" }}
          >
            <NativeSelect.Field
              placeholder="Filtrar por..."
              value={isActive}
              onChange={(e) => {
                setIsActive(e.target.value || undefined);
                setPage(1);
              }}
            >
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
        <Flex
          gap="0.5rem"
          direction={{ base: "column", sm: "row" }}
          width={{ base: "100%", lg: "auto" }}
          flexWrap={{ base: "nowrap", md: "wrap", lg: "nowrap" }}
        >
          <CreateProductDialog />
          <ConfirmUpdateDialog />
          <ImportProductsDialog />
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
              Error al cargar los productos
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
              data={products?.data || []}
              isLoading={isLoading}
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
                {products?.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {!isLoading && products?.data.length === 0 && (
                  <Box bgColor="background.card" borderRadius="lg" p="8">
                    <Text textAlign="center" color="text.tertiary">
                      No se encontraron productos
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
        count={products?.meta.total || 0}
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
