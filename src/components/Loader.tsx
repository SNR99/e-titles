import { LoaderIcon } from "./icons/index";

export default function Loader({ loading }: { loading: boolean }) {
	return (
		<>
			{loading && (
				<div className="bg-black/5 w-full absolute left-0 top-0 h-full justify-center flex items-center">
					<LoaderIcon />
				</div>
			)}
		</>
	);
}
