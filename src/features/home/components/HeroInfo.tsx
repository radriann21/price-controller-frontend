import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { CircleDollarSign, RefreshCcw, AlertCircle } from "lucide-react";
import { useGetBCV } from "@/features/home/hooks/useGetBCV";
import { useRefreshBCV } from "@/features/home/hooks/useRefreshBCV";
import { GlobalMargin } from "./GlobalMargin";

export const HeroInfo = () => {
  const { data: bcvRate, isLoading, isError } = useGetBCV();
  const refreshBCV = useRefreshBCV();

  return (
    <Flex
      as="section"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      my="2rem"
      px={{ base: "1rem", md: "2rem" }}
    >
      <Box
        as="article"
        width={{ base: "100%", md: "450px" }}
        p={{ base: "1.2rem", md: "1.4rem" }}
        rounded="lg"
        bgColor="background.card"
        shadow="md"
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={{ base: "1.2rem", sm: "1rem" }}
      >
        <Flex
          alignItems="center"
          gapX="1rem"
          width={{ base: "100%", sm: "auto" }}
        >
          <Box p="0.7rem" rounded="full" bgColor="orange.100">
            <Icon color="icon.primary">
              <CircleDollarSign size={32} strokeWidth={2.5} />
            </Icon>
          </Box>
          <Box flex="1">
            <Text
              color="text.secondary"
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
                <AlertCircle size={18} color="icon.error" />
                <Text color="text.error" fontSize="sm" fontWeight="medium">
                  Error al cargar
                </Text>
              </Flex>
            ) : (
              <Flex alignItems="baseline" gapX="0.3rem">
                <Heading
                  size="4xl"
                  as="h3"
                  letterSpacing="tight"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {bcvRate?.rate || "0.00"}
                </Heading>
                <Text
                  color="text.tertiary"
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="uppercase"
                  mb="0.2rem"
                >
                  VES/USD
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
        <Button
          onClick={refreshBCV}
          bgColor="brand.primary"
          color="background.card"
          fontWeight="bold"
          size={{ base: "md", sm: "md" }}
          width={{ base: "100%", sm: "auto" }}
          px="1.5rem"
          borderRadius="md"
          _hover={{
            bgColor: "brand.primaryHover",
            transform: "translateY(-1px)",
            shadow: "md",
          }}
          _active={{
            bgColor: "brand.primaryActive",
            transform: "translateY(0)",
          }}
          transition="all 0.2s"
        >
          Actualizar
          <RefreshCcw size={18} />
        </Button>
      </Box>
      <GlobalMargin />
    </Flex>
  );
};
