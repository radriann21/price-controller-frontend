import { Box, Flex, Heading, Text, Input, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  globalMarginSchema,
  type GlobalMarginFormValues,
} from "@/features/home/validations/globalMargin.validation";
import { useCreateGlobalMargin } from "@/features/home/hooks/useCreateGlobalMargin";
import { useGetGlobalMargin } from "@/features/home/hooks/useGetGlobalMargin";

export const GlobalMargin = () => {
  const { mutate: createGlobalMargin } = useCreateGlobalMargin();
  const { data: globalMargin } = useGetGlobalMargin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalMarginFormValues>({
    resolver: zodResolver(globalMarginSchema),
  });

  const onSubmit = (data: GlobalMarginFormValues) => {
    createGlobalMargin(data);
  };

  return (
    <Box
      as="article"
      width={{ base: "100%", md: "450px" }}
      p={{ base: "1.2rem", md: "1.4rem" }}
      rounded="lg"
      bgColor="background.card"
      shadow="md"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg" as="h2" color="text.primary">
          Margen Global
        </Heading>
        <Heading size="xl" as="h2" color="text.primary">
          {globalMargin?.profitMargin}%
        </Heading>
      </Flex>
      <Text color="text.secondary" fontSize="sm">
        Configura el margen global para todos los productos
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root invalid={!!errors.profitMargin}>
          <Input
            mt="10px"
            size="sm"
            placeholder="Margen..."
            {...register("profitMargin", { valueAsNumber: true })}
          />
          <Field.ErrorText>{errors.profitMargin?.message}</Field.ErrorText>
        </Field.Root>
      </form>
    </Box>
  );
};
