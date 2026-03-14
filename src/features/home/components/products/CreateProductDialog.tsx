import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Fieldset,
  Field,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import {
  productSchema,
  type ProductFormValues,
} from "@/features/home/validations/product.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProducts } from "@/features/home/hooks/products/useCreateProducts";
import { useGetCategories } from "@/features/home/hooks/categories/useGetCategories";
import { useState } from "react";

export const CreateProductDialog = () => {
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      costUsd: 0,
      profitMargin: 0,
      priceVes: 0,
    },
  });

  const { mutate: createProduct } = useCreateProducts({ reset, close: () => setOpen(false) });
  const { data: categories } = useGetCategories({ page: 1, limit: 100 });

  const onSubmit = (data: ProductFormValues) => {
    createProduct({ ...data, profitMargin: data.profitMargin ?? 0 });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button fontWeight="bold" px="1rem">
          <Plus size={16} />
          Nuevo Producto
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column">
              <Dialog.Title>Nuevo Producto</Dialog.Title>
              <Dialog.Description>
                Ingresa la información del producto
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
                    <Field.Root invalid={!!errors.priceVes}>
                      <Field.Label fontWeight="semibold">
                        Costo VES
                        <span style={{ color: "red" }}>*</span>
                      </Field.Label>
                      <Input
                        placeholder="Costo en VES..."
                        {...register("priceVes", { valueAsNumber: true })}
                      />
                      {errors.priceVes && (
                        <Field.ErrorText>
                          {errors.priceVes.message}
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
                    <Field.Root invalid={!!errors.categoryId}>
                      <Field.Label>Categoría</Field.Label>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field
                          placeholder="Selecciona una categoría"
                          {...register("categoryId", { valueAsNumber: true })}
                        >
                          {categories?.data.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                      <Field.ErrorText>
                        {errors.categoryId?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Fieldset.Content>
                  <Button type="submit" colorPalette="green">
                    Guardar Producto
                  </Button>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Cancelar</Button>
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
