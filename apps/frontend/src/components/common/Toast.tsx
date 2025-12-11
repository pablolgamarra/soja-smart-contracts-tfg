import React from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Tipos de variantes que usaremos para los colores
type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    id: string;
    message: string;
    variant: ToastVariant;
    onClose: (id: string) => void;
}

const variantStyles: Record<ToastVariant, { bg: string, icon: React.ElementType, iconColor: string, closeColor: string }> = {
    success: { bg: 'bg-green-800', icon: CheckCircle, iconColor: 'text-green-400', closeColor: 'hover:text-green-200' },
    error: { bg: 'bg-red-800', icon: AlertTriangle, iconColor: 'text-red-400', closeColor: 'hover:text-red-200' },
    warning: { bg: 'bg-yellow-800', icon: AlertTriangle, iconColor: 'text-yellow-400', closeColor: 'hover:text-yellow-200' },
    info: { bg: 'bg-blue-800', icon: Info, iconColor: 'text-blue-400', closeColor: 'hover:text-blue-200' },
};

const Toast: React.FC<ToastProps> = ({ id, message, variant, onClose }) => {
    const styles = variantStyles[ variant ];

    return (
        <div className={`flex items-center justify-between p-4 mb-4 rounded-xl shadow-lg border border-gray-700 ${styles.bg} text-gray-100 transition-opacity duration-300 ease-out`}>
            <div className="flex items-center">
                <styles.icon className={`w-6 h-6 mr-3 ${styles.iconColor}`} />
                <span className="text-sm font-medium">{message}</span>
            </div>
            <button
                onClick={() => onClose(id)}
                className={`ml-4 transition-colors duration-200 ${styles.closeColor}`}
                aria-label="Cerrar notificación"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;
