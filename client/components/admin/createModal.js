import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Textarea } from "@nextui-org/react";

function DynamicForm({ initialData, onSave, visible, setVisible }) {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal open={visible} onClose={() => setVisible(false)}>
            <Modal.Title>Crear</Modal.Title>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map(key => (
                        <div key={key}>
                            <label>{key}</label>
                            <Textarea
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <Button type="submit">Guardar</Button>
                </form>
            </Modal.Content>
        </Modal>
    );
}