export interface ISelectFieldProps {
    label: string;
    name: string;
    value?: string | number;
    options: { label: string; value: string | number }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const SelectField: React.FC<ISelectFieldProps> = ({ label, name, value, options, onChange, required }) => (
    <div className="input-wrapper">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            required={required}
        >
            <option value="">Seleccione una opción</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

export default SelectField;