import { Table, Skeleton } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface ColumnDef<T> {
  id: string;
  header: string | ReactNode;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
}

interface CustomTableProps<T> {
  tableSize?: "sm" | "md" | "lg";
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  data?: T[];
  emptyMessage?: string;
}

export const CustomTable = <T,>({
  tableSize = "sm",
  columns,
  isLoading = false,
  data = [],
  emptyMessage = "No hay datos disponibles",
}: CustomTableProps<T>) => {
  const renderCellContent = (item: T, column: ColumnDef<T>): ReactNode => {
    if (column.render) {
      return column.render(item);
    }
    if (column.accessor) {
      const value = item[column.accessor];
      return value !== null && value !== undefined ? String(value) : "-";
    }
    return "-";
  };

  return (
    <Table.Root size={tableSize} striped>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader key={column.id}>
              {column.header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      {isLoading ? (
        <Table.Body>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <Table.Row key={rowIndex}>
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
          {data.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length} textAlign="center">
                {emptyMessage}
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((item, rowIndex) => (
              <Table.Row key={rowIndex}>
                {columns.map((column) => (
                  <Table.Cell key={column.id}>
                    {renderCellContent(item, column)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      )}
    </Table.Root>
  );
};
