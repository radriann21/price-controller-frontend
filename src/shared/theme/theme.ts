import { defineConfig, defaultConfig, createSystem } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: '#ff6b35' },
          primaryHover: { value: '#ff5a2a' },
          primaryDark: { value: '#ff6b35' },
        },
        background: {
          page: { value: '{colors.orange.subtle}' },
          card: { value: '#ffffff' },
          input: { value: '#ffffff' },
        },
        text: {
          primary: { value: '{colors.gray.900}' },
          secondary: { value: '{colors.gray.600}' },
          tertiary: { value: '{colors.gray.500}' },
          error: { value: '{colors.red.600}' },
          errorDark: { value: '{colors.red.700}' },
        },
        border: {
          default: { value: '{colors.gray.200}' },
          error: { value: '{colors.red.200}' },
        },
        icon: {
          primary: { value: '#ff6b35' },
          error: { value: '#e53e3e' },
        }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config);
