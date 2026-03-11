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
      py="4"
      px={{ base: "1rem", md: "1.5rem" }}
      alignItems="center"
      justifyContent="space-between"
      bg="gray.50"
      shadow="sm"
    >
      <Heading size={{ base: "lg", md: "xl" }}>Control de Precios</Heading>
      <Button
        onClick={handleLogout}
        size={{ base: "sm", md: "md" }}
        variant="outline"
        colorPalette="red"
        fontWeight="semibold"
      >
        <LogOut size={18} />
        Cerrar Sesión
      </Button>
    </Flex>
  )
}