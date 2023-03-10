import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from "@chakra-ui/react";
  
  type Props = {
    isOpen: boolean,
    onClose: () => void,
    modalTitle: string,
    size?: string,
    children: React.ReactNode
  }
  
  const CommonModal = ({isOpen,onClose, modalTitle, size = "2xl", children}:Props) => {
  
    return (
      <>  
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
          <ModalOverlay />
          <ModalContent bg="#f0f0f0" border="none" p={0}>
            <ModalHeader color="darkText">{modalTitle}</ModalHeader>
            <ModalCloseButton color="darkText"/>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CommonModal;
  