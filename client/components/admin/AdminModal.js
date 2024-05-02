import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@nextui-org/react";

const AdminModal = ({ isOpen, onOpenChange, handleConfirmDelete }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
                        <ModalBody>
                            <p> 
                                ¿Estás seguro de que quieres eliminar los elementos seleccionados?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleConfirmDelete}>
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AdminModal;