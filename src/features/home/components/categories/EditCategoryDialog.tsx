import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Fieldset,
  Field,
  Input,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/home/validations/category.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCategory } from "@/features/home/hooks/categories/useUpdateCategory";
import type { Category } from "@/features/home/interfaces/categories.interface";
import { useState } from "react";

interface EditCategoryDialogProps {
  category: Category;
}

export const EditCategoryDialog = ({ category }: EditCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description || "",
    },
  });

  const { mutate: updateCategory } = useUpdateCategory({
    onSuccessCallback: () => {
      setOpen(false);
      reset();
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    updateCategory({
      id: category.id,
      category: {
        name: data.name,
        description: data.description,
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
              <Dialog.Title>Editar Categoría</Dialog.Title>
              <Dialog.Description>
                Modifica la información de la categoría
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
                        placeholder="Nombre de la categoría..."
                        {...register("name")}
                      />
                      {errors.name && (
                        <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.description}>
                      <Field.Label fontWeight="semibold">
                        Descripción
                      </Field.Label>
                      <Textarea
                        placeholder="Descripción de la categoría..."
                        {...register("description")}
                      />
                      {errors.description && (
                        <Field.ErrorText>
                          {errors.description.message}
                        </Field.ErrorText>
                      )}
                      <Field.HelperText>
                        Este campo es opcional
                      </Field.HelperText>
                    </Field.Root>
                  </Fieldset.Content>
                  <Button type="submit" colorPalette="green">
                    Actualizar Categoría
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
