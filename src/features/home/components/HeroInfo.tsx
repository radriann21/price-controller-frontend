import { Box, Flex, Text, Heading, Button, Skeleton } from "@chakra-ui/react";
import { CircleDollarSign, RefreshCcw, AlertCircle } from "lucide-react";
import { useGetBCV } from "../hooks/useGetBCV";
import { useRefreshBCV } from "../hooks/useRefreshBCV";

export const HeroInfo = () => {
  const { data: bcvRate, isLoading, isError } = useGetBCV();
  const refreshBCV = useRefreshBCV();

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
            {isLoading ? (
              <Skeleton height="40px" width="150px" />
            ) : isError ? (
              <Flex alignItems="center" gapX="0.5rem">
                <AlertCircle size={16} color="#e53e3e" />
                <Text color="red.600" fontSize="sm">
                  Error al cargar
                </Text>
              </Flex>
            ) : (
              <Flex alignItems="baseline" gapX="0.2rem">
                <Heading size="3xl" as="h3" letterSpacing="wider" fontWeight="bold">
                  {bcvRate?.rate || "0.00"}
                </Heading>
                <Text color="gray.500" fontSize="14px" textTransform="uppercase">
                  VES/USD
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
        <Button
          onClick={refreshBCV}
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
