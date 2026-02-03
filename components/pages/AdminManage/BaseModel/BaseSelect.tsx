type BaseSelectProps<T> = {
	value: string | number;
	onChange: (v: string) => void;
	options: T[];
	getValue: (item: T) => string | number;
	getLabel: (item: T) => string;
	placeholder: string;
	disabled?: boolean;
	className?: string;
};

export default function BaseSelect<T>({
	value,
	onChange,
	options,
	getValue,
	getLabel,
	placeholder,
	disabled,
	className = "",
}: BaseSelectProps<T>) {
	return (
		<select
			value={value}
			disabled={disabled}
			onChange={(e) => onChange(e.target.value)}
			className={`w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white border border-cyan-400/40 ${className}`}
		>
			<option value="">{placeholder}</option>
			{options.map((item) => (
				<option key={String(getValue(item))} value={getValue(item)}>
					{getLabel(item)}
				</option>
			))}
		</select>
	);
}
