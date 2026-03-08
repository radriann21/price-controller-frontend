import { Flex, Heading } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Flex
      w="100%"
      py="4"
      px="6"
      alignItems="center"
      bg="gray.50"
      shadow="sm"
    >
      <Heading>Control de Precios</Heading>
    </Flex>
  )
}