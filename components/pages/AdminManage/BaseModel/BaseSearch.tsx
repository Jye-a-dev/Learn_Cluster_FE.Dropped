import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type BaseSearchProps = {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
};

export default function BaseSearch({
	value,
	onChange,
	placeholder = "Search...",
	className = "",
	inputClassName = "",
}: BaseSearchProps) {
	return (
		<div className={`relative ${className}`}>
			<MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className={`w-full rounded-xl bg-white/5 pl-9 pr-4 py-2 text-sm text-white outline-none border border-white/10 focus:border-blue-500 ${inputClassName}`}
			/>
		</div>
	);
}
