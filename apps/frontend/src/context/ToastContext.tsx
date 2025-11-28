import Toast from '@components/common/Toast';
import React, { createContext, useState, useCallback, type ReactNode } from 'react';

// Tipos
type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
    id: string;
    message: string;
    variant: ToastVariant;
}

interface ToastContextType {
    addToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Proveedor del Contexto que gestiona la lógica y renderiza el contenedor
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ toasts, setToasts ] = useState<ToastData[]>([]);
    
    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback((message: string, variant: ToastVariant = 'info') => {
        const id = crypto.randomUUID(); // Genera un ID único para cada toast
        const newToast: ToastData = { id, message, variant };

        setToasts(prev => [ ...prev, newToast ]);

        // Elimina el toast automáticamente después de 5 segundos
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, [removeToast]);


    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            {/* Contenedor Fijo donde aparecen los Toasts (Bottom-Right) */}
            <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm pointer-events-none">
                {toasts.map((toast) => (
                    // Convertimos el Toast en un pointer-events-auto para que sea clickeable
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            {...toast}
                            onClose={removeToast}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;