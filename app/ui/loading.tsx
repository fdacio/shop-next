import { ClockIcon } from "@heroicons/react/24/outline";

export default function Loading({ isLoading }: { isLoading: boolean }) {

    return (
        <>
            {
                isLoading && <div className="flex gap">
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                    <p>Carregando ...</p>
                </div>
            }
        </>
    );

}