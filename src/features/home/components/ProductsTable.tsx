import { Button, Flex, Input, InputGroup, Table } from "@chakra-ui/react";
import { Currency, Plus, Search } from "lucide-react";

export const ProductsTable = () => {
  return (
    <Flex direction="column" gapY="0.5rem" mt="2rem" px="2rem">
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        gapX="2rem"
      >
        <InputGroup startElement={<Search size={16} />} bgColor="white">
          <Input placeholder="Buscar producto..." />
        </InputGroup>
        <Flex gapX="0.5rem">
          <Button
            colorPalette="orange"
            variant="outline"
            color="orange.600"
            fontWeight="bold"
            px="1.5rem"
            _hover={{
              bg: "orange.50",
            }}
          >
            Filtrar
          </Button>
          <Button fontWeight="bold" px="1rem">
            <Plus size={16} />
            Nuevo Producto
          </Button>
        </Flex>
      </Flex>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.accesorKey}>
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
      </Table.Root>
      <Flex mt="20px" alignItems="center" p="1rem" justifyContent="flex-end">
        <Button
          bgColor="orange.500"
          color="white"
          fontWeight="bold"
          _hover={{
            bg: "orange.600",
          }}
        >
          Actualizar Precios
          <Currency size={16} />
        </Button>
      </Flex>
    </Flex>
  );
};

const columns = [
  {
    header: "Nombre",
    accesorKey: "nombre",
  },
  {
    header: "Precio USD",
    accesorKey: "precio_usd",
  },
  {
    header: "Margen",
    accesorKey: "margen_ganancia",
  },
  {
    header: "Precio VES",
    accesorKey: "precio_venezuela",
  },
];
