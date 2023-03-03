import { useToast } from "@chakra-ui/react";

type Props = {
  st?: "loading" | "error" | "success" | "info" | "warning" | undefined;
  label: string;
};

export const useShowToast = () => {
  const toast = useToast();
  const showToast = ({ st, label }: Props) => {
    toast({
      title: label,
      status: st,
      isClosable: true,
      position: "top",
      duration: 2000,
    });
  };

  return {showToast};
};
