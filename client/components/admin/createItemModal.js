
import React, { useState } from 'react';
import { Modal, ModalContent, ModalFooter, Button, Input } from "@nextui-org/react";

function EditForm({ isOpen, onClose, data, onSave }) {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    console.log(formData);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <Input
                    name="name"
                    label="Nombre"
                    placeholder="Nombre"
                />
            </ModalContent>
            <ModalFooter>
                <Button onClick={handleSave}>Guardar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditForm;