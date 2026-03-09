import { Box, Flex, Text, Heading, Button, Skeleton } from "@chakra-ui/react";
import { CircleDollarSign, RefreshCcw, AlertCircle } from "lucide-react";
import { useGetBCV } from "@/features/home/hooks/useGetBCV";
import { useRefreshBCV } from "@/features/home/hooks/useRefreshBCV";

export const HeroInfo = () => {
  const { data: bcvRate, isLoading, isError } = useGetBCV();
  const refreshBCV = useRefreshBCV();

  return (
    <Flex w="100%" alignItems="center" my="2rem" px={{ base: "1rem", md: "2rem" }}>
      <Box
        width={{ base: "100%", md: "450px" }}
        p={{ base: "1.2rem", md: "1.4rem" }}
        rounded="lg"
        bgColor="white"
        shadow="md"
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={{ base: "1.2rem", sm: "1rem" }}
      >
        <Flex alignItems="center" gapX="1rem" width={{ base: "100%", sm: "auto" }}>
          <Box p="0.7rem" rounded="full" bgColor="orange.100">
            <CircleDollarSign size={32} color="#ff6b35" strokeWidth={2.5} />
          </Box>
          <Box flex="1">
            <Text
              color="gray.600"
              fontSize="11px"
              textTransform="uppercase"
              fontWeight="medium"
              letterSpacing="wide"
              mb="0.2rem"
            >
              Tasa Oficial BCV
            </Text>
            {isLoading ? (
              <Skeleton height="44px" width="180px" borderRadius="md" />
            ) : isError ? (
              <Flex alignItems="center" gapX="0.5rem">
                <AlertCircle size={18} color="#e53e3e" />
                <Text color="red.600" fontSize="sm" fontWeight="medium">
                  Error al cargar
                </Text>
              </Flex>
            ) : (
              <Flex alignItems="baseline" gapX="0.3rem">
                <Heading size="4xl" as="h3" letterSpacing="tight" fontWeight="bold" color="gray.900">
                  {bcvRate?.rate || "0.00"}
                </Heading>
                <Text color="gray.500" fontSize="sm" fontWeight="medium" textTransform="uppercase" mb="0.2rem">
                  VES/USD
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
        <Button
          onClick={refreshBCV}
          bgColor="orange.500"
          color="white"
          fontWeight="bold"
          size={{ base: "md", sm: "md" }}
          width={{ base: "100%", sm: "auto" }}
          px="1.5rem"
          borderRadius="md"
          _hover={{ 
            bgColor: "orange.600",
            transform: "translateY(-1px)",
            shadow: "md"
          }}
          _active={{
            bgColor: "orange.700",
            transform: "translateY(0)"
          }}
          transition="all 0.2s"
        >
          Actualizar
          <RefreshCcw size={18} />
        </Button>
      </Box>
    </Flex>
  );
};
