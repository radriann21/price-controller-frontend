import { PasswordInput } from "@/shared/components/ui/password-input";
import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import {
  loginSchema,
  type LoginType,
} from "@/features/auth/validations/login.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const { mutate: login } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    login(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: "450px" }}>
      <Fieldset.Root
        width="100%"
        bgColor="background.card"
        px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
        py={{ base: "1.25rem", md: "1.5rem" }}
        rounded="md"
        shadow="sm"
      >
        <Field.Root invalid={!!errors.username}>
          <Field.Label fontWeight="semibold">
            Nombre de usuario
          </Field.Label>
          <Input
            placeholder="Ingrese su nombre de usuario"
            {...register("username")}
          />
          {errors.username && (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label fontWeight="semibold">
            Contraseña
          </Field.Label>
          <PasswordInput
            placeholder="Ingrese su contraseña"
            {...register("password")}
          />
          {errors.password && (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          )}
        </Field.Root>
        <Button
          fontWeight="semibold"
          type="submit"
          bgColor="icon.primary"
          color="white"
          width="100%"
          size={{ base: "md", md: "lg" }}
          _hover={{
            bgColor: "brand.primaryHover",
          }}
        >
          Iniciar sesión
        </Button>
      </Fieldset.Root>
    </form>
  );
};
