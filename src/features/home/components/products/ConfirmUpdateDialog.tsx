import { Currency } from "lucide-react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useUpdateProductsPrices } from "@/features/home/hooks/products/useUpdateProductsPrices";
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
          fontWeight="semibold"
          size={{ base: "md", md: "sm", lg: "md" }}
          px={{ base: "1rem", md: "0.875rem", lg: "1.25rem" }}
          py={{ base: "1.25rem", md: "auto" }}
          width={{ base: "100%", sm: "auto" }}
          gap="0.5rem"
          fontSize={{ base: "sm", md: "xs", lg: "sm" }}
          whiteSpace="nowrap"
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
