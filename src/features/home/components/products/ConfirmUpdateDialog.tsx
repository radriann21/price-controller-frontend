import { Currency } from "lucide-react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useUpdateProductsPrices } from "@/features/home/hooks/useUpdateProductsPrices";
import { useState } from "react";

export const ConfirmUpdateDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate: updateProductsPrices } = useUpdateProductsPrices({
    onSuccess: () => setOpen(false),
  });
  
  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          bgColor="brand.primary"
          color="background.card"
          fontWeight="bold"
          _hover={{
            bg: "brand.primaryHover",
          }}
        >
          Actualizar Precios
          <Currency size={16} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column">
              <Dialog.Title>¿Quieres actualizar los precios?</Dialog.Title>
              <Dialog.Description>
                Esta acción podría durar unos segundos
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Cancelar</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => updateProductsPrices()} colorPalette="orange">
                  Actualizar
                </Button>
              </Dialog.ActionTrigger>
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
