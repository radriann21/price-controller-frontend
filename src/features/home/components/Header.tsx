import { Flex, Heading, Button } from "@chakra-ui/react"
import { LogOut } from "lucide-react"
import { useAuthStore } from "@/shared/stores/AuthStore"
import { useNavigate } from "react-router"

export const Header = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <Flex
      w="100%"
      py={{ base: "3", md: "4" }}
      px={{ base: "1rem", md: "1.5rem" }}
      alignItems="center"
      justifyContent="space-between"
      bg="gray.50"
      shadow="sm"
    >
      <Heading size={{ base: "md", md: "xl" }} fontSize={{ base: "lg", md: "2xl" }}>
        Control de Precios
      </Heading>
      <Button
        onClick={handleLogout}
        size={{ base: "sm", md: "md" }}
        variant="outline"
        colorPalette="red"
        fontWeight="semibold"
        px={{ base: "0.75rem", md: "1rem" }}
        fontSize={{ base: "xs", md: "sm" }}
        gap={{ base: "0.25rem", md: "0.5rem" }}
      >
        <LogOut size={16} />
        Cerrar Sesión
      </Button>
    </Flex>
  )
}