import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useDeleteCategory } from "@/features/home/hooks/useDeleteCategory";

export const ConfirmDeleteCategoryDialog = ({ categoryId }: { categoryId: string }) => {
  const { mutate: deleteCategory } = useDeleteCategory();

  return (
    <Dialog.Root>
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
                ¿Estas seguro de eliminar esta categoría?
              </Dialog.Title>
              <Dialog.Description>
                La categoría pasará a estar inactiva.
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
                onClick={() => deleteCategory(categoryId)}
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
