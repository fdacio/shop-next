import { ClockIcon } from "@heroicons/react/24/outline";

export default function Loading({ isLoading }: { isLoading: boolean | undefined}) {

    return (
        <div className="p-4">
            {
                isLoading && <div className="flex gap-4">
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                    <p>Carregando ...</p>
                </div>
            }
        </div>
    );

}