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
    required:boolean;
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
        <div className="input-wrapper">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required={required}
            />
        </div>
    );
};