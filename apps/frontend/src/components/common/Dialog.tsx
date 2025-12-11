import React, { useRef, useEffect, type ReactNode } from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialogElement = dialogRef.current;

        if (!dialogElement) return;

        if (isOpen) {
            // showModal() es un método nativo del HTMLDialogElement
            if (typeof dialogElement.showModal === 'function') {
                dialogElement.showModal();
            }
        } else {
            // close() es un método nativo
            dialogElement.close();
        }

        // Maneja el cierre nativo (Escape key, etc.)
        const handleClose = () => onClose();
        dialogElement.addEventListener('close', handleClose);

        return () => {
            // Limpieza del listener
            dialogElement.removeEventListener('close', handleClose);
        };
    }, [ isOpen, onClose ]);

    return (
        <dialog
            ref={dialogRef}
            // Clases de Tailwind para el estilo del contenedor del diálogo
            className="p-6 rounded-lg shadow-2xl w-full max-w-sm bg-white"
        >
            {children}
        </dialog>
    );
};

export default Dialog;
