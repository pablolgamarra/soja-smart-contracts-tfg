import type React from "react";

export interface IInputProps {
    id?: string;
	label?: string;
	name?: string;
	placeholder?: string;
	type?:
		| 'number'
		| 'time'
		| 'text'
		| 'search'
		| 'email'
		| 'password'
		| 'tel'
		| 'url'
		| 'date'
		| 'datetime-local'
		| 'month'
		| 'week'
		| undefined;
	value?: string | number | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?:boolean;
}

export const InputField: React.FC<IInputProps> = ({
	id,
	label,
	name,
	placeholder,
	type,
	value,
	onChange,
    required
}) => {
    return (
        <div className="input-mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                id={id}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-500"
                required={required}
            />
        </div>
    );
};