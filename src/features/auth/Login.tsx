import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "@/shared/stores/AuthStore";
import { Navigate } from "react-router";

export const Login = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor="background.page"
      direction="column"
    >
      <Box textAlign="center">
        <Heading fontSize="2xl" fontWeight="semibold">
          Iniciar Sesión
        </Heading>
        <Text fontSize="lg" color="text.secondary">
          Ingresa tus credenciales para acceder al sistema
        </Text>
      </Box>
      <LoginForm />
    </Flex>
  );
};
