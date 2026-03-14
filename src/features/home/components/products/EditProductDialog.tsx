import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Fieldset,
  Field,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import {
  productSchema,
  type ProductFormValues,
} from "@/features/home/validations/product.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "@/features/home/hooks/useUpdateProduct";
import type { Product } from "@/features/home/interfaces/products.interface";
import { useState } from "react";

interface EditProductDialogProps {
  product: Product;
}

export const EditProductDialog = ({ product }: EditProductDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      costUsd: product.costUsd,
      costVes: product.priceVes,
      profitMargin: product.profitMargin,
    },
  });

  const { mutate: updateProduct } = useUpdateProduct({
    onSuccessCallback: () => {
      setOpen(false);
      reset();
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    updateProduct({
      id: product.id,
      product: {
        name: data.name,
        costUsd: data.costUsd,
        profitMargin: data.profitMargin ?? 0,
        priceVes: data.costVes,
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" colorPalette="orange" size="xs">
          <Edit />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column">
              <Dialog.Title>Editar Producto</Dialog.Title>
              <Dialog.Description>
                Modifica la información del producto
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Field.Root invalid={!!errors.name}>
                      <Field.Label fontWeight="semibold">
                        Nombre
                        <span style={{ color: "red" }}>*</span>
                      </Field.Label>
                      <Input
                        placeholder="Nombre del producto..."
                        {...register("name")}
                      />
                      {errors.name && (
                        <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.costUsd}>
                      <Field.Label fontWeight="semibold">
                        Costo USD
                        <span style={{ color: "red" }}>*</span>
                      </Field.Label>
                      <Input
                        placeholder="Costo en USD..."
                        {...register("costUsd", { valueAsNumber: true })}
                      />
                      {errors.costUsd && (
                        <Field.ErrorText>
                          {errors.costUsd.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.costVes}>
                      <Field.Label fontWeight="semibold">
                        Costo VES
                        <span style={{ color: "red" }}>*</span>
                      </Field.Label>
                      <Input
                        placeholder="Costo en VES..."
                        {...register("costVes", { valueAsNumber: true })}
                      />
                      {errors.costVes && (
                        <Field.ErrorText>
                          {errors.costVes.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.profitMargin}>
                      <Field.Label fontWeight="semibold">
                        Margen de ganancia individual
                      </Field.Label>
                      <Input
                        placeholder="Margen de ganancia individual..."
                        {...register("profitMargin", { valueAsNumber: true })}
                      />
                      {errors.profitMargin && (
                        <Field.ErrorText>
                          {errors.profitMargin.message}
                        </Field.ErrorText>
                      )}
                      <Field.HelperText>
                        Este campo es opcional
                      </Field.HelperText>
                    </Field.Root>
                  </Fieldset.Content>
                  <Button type="submit" colorPalette="green">
                    Actualizar Producto
                  </Button>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
