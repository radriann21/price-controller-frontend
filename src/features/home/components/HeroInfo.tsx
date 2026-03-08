import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { CircleDollarSign, RefreshCcw } from "lucide-react";

export const HeroInfo = () => {
  return (
    <Flex w="100%" alignItems="center" my="2rem" px="2rem">
      <Box
        width="450px"
        p="1.4rem"
        rounded="md"
        bgColor="white"
        shadow="xs"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
      >
        <Flex alignItems="center" gapX="1rem">
          <Box p="0.6rem" rounded="full" bgColor="#f9c1ad71">
            <CircleDollarSign size={28} color="#ff6b35" />
          </Box>
          <Box>
            <Text
              color="gray.500"
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="light"
              letterSpacing="wider"
            >
              Tasa Oficial BCV
            </Text>
            <Flex alignItems="baseline" gapX="0.2rem">
              <Heading size="3xl" as="h3" letterSpacing="wider" fontWeight="bold">
                450.00
              </Heading>
              <Text color="gray.500" fontSize="14px" textTransform="uppercase">
                VES/USD
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Button
          bgColor="#ff6b35"
          color="white"
          fontWeight="semibold"
          _hover={{ bgColor: "#ff5a2a" }}
        >
          Actualizar
          <RefreshCcw size={20} />
        </Button>
      </Box>
    </Flex>
  );
};
