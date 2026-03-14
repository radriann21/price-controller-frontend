import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useDeleteProduct } from "@/features/home/hooks/products/useDeleteProduct";
import { useState } from "react";

export const ConfirmDeleteDialog = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(productId);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" colorPalette="orange" size="xs">
          <Trash2 />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>
                ¿Estas seguro de eliminar este producto?
              </Dialog.Title>
              <Dialog.Description>
                El producto pasará a estar inactivo.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button fontWeight="bold" size="sm">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                fontWeight="bold"
                size="sm"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
