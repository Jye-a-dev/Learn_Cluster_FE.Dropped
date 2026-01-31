import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
	search: string;
	onSearchChange: (v: string) => void;
};

export default function SearchLesson({ search, onSearchChange }: Props) {
	return (
		<div className="relative">
			<MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
			<input
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder="Tìm theo lesson title…"
				className="w-full rounded-xl bg-white/5 pl-9 pr-4 py-2 text-sm text-white outline-none border border-white/10 focus:border-blue-500"
			/>
		</div>
	);
}
