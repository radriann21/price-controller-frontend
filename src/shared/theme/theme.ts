import { defineConfig, defaultConfig, createSystem } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        mainColor: { value: '#000000' }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config);
