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
      px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      gap={{ base: "1.5rem", md: "2rem" }}
    >
      <Box textAlign="center" px={{ base: "1rem", sm: "0" }}>
        <Heading 
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} 
          fontWeight="semibold"
          mb={{ base: "0.5rem", md: "0.75rem" }}
        >
          Iniciar Sesión
        </Heading>
        <Text 
          fontSize={{ base: "sm", sm: "md", md: "lg" }} 
          color="text.secondary"
        >
          Ingresa tus credenciales para acceder al sistema
        </Text>
      </Box>
      <LoginForm />
    </Flex>
  );
};
