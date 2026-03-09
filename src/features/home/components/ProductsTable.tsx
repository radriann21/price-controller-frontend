import {
  Flex,
  Input,
  InputGroup,
  Table,
  Skeleton,
  Pagination,
  ButtonGroup,
  IconButton,
  Text,
  Box,
  Grid,
} from "@chakra-ui/react";
import { Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useGetProducts } from "../hooks/useGetProducts";
import { CreateProductDialog } from "./CreateProductDialog";
import { TOTAL_ITEMS } from "@/shared/constants/constants";
import { ConfirmUpdateDialog } from "./ConfirmUpdateDialog";
import type { Product } from "../interfaces/products.interface";
import { type ReactNode, useState } from "react";
import { ProductCard } from "./ProductCard";

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
    render: (item) => item.costUsd,
  },
  {
    id: "priceVes",
    header: "Precio VES",
    render: (item) => Number(item.priceVes).toLocaleString("es-VE"),
  },
  {
    id: "profitMargin",
    header: "Margen",
    render: (item) => item.profitMargin,
  },
  {
    id: "updatedAt",
    header: "Actualizado",
    render: (item) => new Date(item.updatedAt).toLocaleDateString(),
  },
];

export const ProductsTable = () => {
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useGetProducts({
    page,
    limit: TOTAL_ITEMS,
  });

  return (
    <Flex
      direction="column"
      gapY="0.5rem"
      mt="2rem"
      px={{ base: "1rem", md: "2rem" }}
      py="1rem"
    >
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
          bgColor="white"
        >
          <Input placeholder="Buscar producto..." />
        </InputGroup>
        <Flex gapX="1rem">
          <CreateProductDialog />
          <ConfirmUpdateDialog />
        </Flex>
      </Flex>
      {isError ? (
        <Box
          p="4"
          bgColor="red.50"
          borderRadius="md"
          border="1px solid"
          borderColor="red.200"
        >
          <Flex alignItems="center" gapX="2">
            <AlertCircle size={20} color="#e53e3e" />
            <Text color="red.700" fontWeight="medium">
              Error al cargar los productos
            </Text>
          </Flex>
          <Text color="red.600" fontSize="sm" mt="2">
            {error?.message || "Ocurrió un error inesperado"}
          </Text>
        </Box>
      ) : (
        <>
          {/* Desktop Table View */}
          <Box display={{ base: "none", md: "block" }}>
            <Table.Root striped variant="line">
              <Table.Header>
                <Table.Row>
                  {columns.map((column) => (
                    <Table.ColumnHeader key={column.id} fontWeight="bold">
                      {column.header}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>
              {isLoading ? (
                <Table.Body>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Table.Row key={index}>
                      {columns.map((column) => (
                        <Table.Cell key={column.id}>
                          <Skeleton height="20px" />
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              ) : (
                <Table.Body>
                  {products?.data.map((product) => (
                    <Table.Row key={product.id}>
                      {columns.map((column) => (
                        <Table.Cell key={column.id}>
                          {column.render
                            ? column.render(product)
                            : product[column.id as keyof Product]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                  {!isLoading && products?.data.length === 0 && (
                    <Table.Row>
                      <Table.Cell colSpan={columns.length}>
                        <Text textAlign="center" color="gray.500" py="4">
                          No se encontraron productos
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              )}
            </Table.Root>
          </Box>

          {/* Mobile Card View */}
          <Box display={{ base: "block", md: "none" }}>
            {isLoading ? (
              <Grid templateColumns="repeat(1, 1fr)" gap="4" mt="2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box key={index} bgColor="white" borderRadius="lg" p="4">
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
                  <Box bgColor="white" borderRadius="lg" p="8">
                    <Text textAlign="center" color="gray.500">
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
