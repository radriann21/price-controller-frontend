import { Box, Flex, Heading, Text, Input, Field } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  globalMarginSchema,
  type GlobalMarginFormValues,
} from "@/features/home/validations/globalMargin.validation";
import { useCreateGlobalMargin } from "@/features/home/hooks/globalMargin/useCreateGlobalMargin";
import { useGetGlobalMargin } from "@/features/home/hooks/globalMargin/useGetGlobalMargin";

export const GlobalMargin = () => {
  const { data: globalMargin } = useGetGlobalMargin();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GlobalMarginFormValues>({
    resolver: zodResolver(globalMarginSchema),
  });
  
  const { mutate: createGlobalMargin } = useCreateGlobalMargin({ reset });
  
  const onSubmit = (data: GlobalMarginFormValues) => {
    createGlobalMargin(data);
  };

  return (
    <Box
      as="article"
      width={{ base: "100%", md: "450px" }}
      p={{ base: "1rem", md: "1.4rem" }}
      rounded="lg"
      bgColor="background.card"
      shadow="md"
    >
      <Flex 
        alignItems={{ base: "flex-start", md: "center" }} 
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "0.5rem", md: "0" }}
      >
        <Box>
          <Heading size={{ base: "md", md: "lg" }} as="h2" color="text.primary">
            Margen Global
          </Heading>
          <Text color="text.secondary" fontSize={{ base: "xs", md: "sm" }} mt={{ base: "0.25rem", md: "0.5rem" }}>
            Configura el margen global para todos los productos
          </Text>
        </Box>
        <Heading 
          size={{ base: "lg", md: "xl" }} 
          as="h2" 
          color="text.primary"
          flexShrink={0}
        >
          {globalMargin?.profitMargin}%
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root invalid={!!errors.profitMargin}>
          <Input
            mt={{ base: "0.75rem", md: "10px" }}
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
