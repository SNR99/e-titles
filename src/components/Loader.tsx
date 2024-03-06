import { LoaderIcon } from "./icons/index";

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 top-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-black bg-opacity-20">
          <LoaderIcon />
        </div>
      )}
    </>
  );
}
