import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

// Create the context with a default value of null
const ModalContext = createContext<ModalContextType | null>(null);

// Define the type for the provider's children prop
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
