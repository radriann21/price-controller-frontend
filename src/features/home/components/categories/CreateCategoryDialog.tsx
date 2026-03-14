import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Fieldset,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/home/validations/category.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "@/features/home/hooks/categories/useCreateCategory";
import { useState } from "react";

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createCategory } = useCreateCategory({ reset, close: () => setOpen(false) });

  const onSubmit = (data: CategoryFormValues) => {
    createCategory(data);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button fontWeight="bold" px="1rem">
          <Plus size={16} />
          Nueva Categoría
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column">
              <Dialog.Title>Nueva Categoría</Dialog.Title>
              <Dialog.Description>
                Ingresa la información de la categoría
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
                    Guardar Categoría
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
