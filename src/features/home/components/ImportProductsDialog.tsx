import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importSchema, type ImportFormData } from "../validations/import.validation";
import { useImportExcel } from "../hooks/useImportExcel";

export const ImportProductsDialog = () => {
  const { mutate: importExcelMutation } = useImportExcel();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setValue("file", files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setValue("file", dataTransfer.files);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const emptyFileList = new DataTransfer().files;
    setValue("file", emptyFileList);
  };

  const onSubmit = (data: ImportFormData) => {
    importExcelMutation(data.file[0]);
    
    reset();
    setSelectedFile(null);
    setOpen(false);
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          bgColor="green.600"
          color="white"
          fontWeight="bold"
          _hover={{ bgColor: "green.800" }}
        >
          Importar Productos
          <Upload size={16} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gapY="2">
              <Dialog.Title>Importar Productos</Dialog.Title>
              <Dialog.Description>
                Importa productos desde un archivo Excel o CSV
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <VStack gap={4} align="stretch">
                  <Box position="relative">
                    <input
                      {...register("file")}
                      type="file"
                      id="file-upload"
                      accept=".xls,.xlsx,.csv"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="file-upload"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        padding: "32px",
                        borderWidth: "2px",
                        borderStyle: "dashed",
                        borderColor: dragActive ? "#22c55e" : "#d1d5db",
                        borderRadius: "6px",
                        backgroundColor: dragActive ? "#f0fdf4" : "#f9fafb",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!dragActive) {
                          e.currentTarget.style.borderColor = "#22c55e";
                          e.currentTarget.style.backgroundColor = "#f0fdf4";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!dragActive) {
                          e.currentTarget.style.borderColor = "#d1d5db";
                          e.currentTarget.style.backgroundColor = "#f9fafb";
                        }
                      }}
                    >
                      <Upload size={32} color={dragActive ? "#22c55e" : "#9ca3af"} />
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Arrastra y suelta tu archivo aquí o haz clic para seleccionar
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Formatos: Excel (.xls, .xlsx) o CSV (máx. 10MB)
                      </Text>
                    </label>
                  </Box>

                  {selectedFile && (
                    <Box
                      p={3}
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      bg="white"
                    >
                      <HStack justify="space-between">
                        <VStack align="start" gap={0}>
                          <Text fontSize="sm" fontWeight="medium">
                            {selectedFile.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </Text>
                        </VStack>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorPalette="red"
                          onClick={removeFile}
                          type="button"
                        >
                          <X size={16} />
                        </Button>
                      </HStack>
                    </Box>
                  )}

                  {errors.file && (
                    <Text fontSize="sm" color="red.500">
                      {errors.file.message as string}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    w="full"
                    colorPalette="green"
                    fontWeight="bold"
                    disabled={!selectedFile || isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? "Importando..." : "Importar"}
                  </Button>
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild onClick={handleClose}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
