import { ApiResponse } from "../lib/api/types/entities";

export default function ApiMessageResponse({ response }: { response: ApiResponse | undefined }) {


    return (
        <>
            {
                (response) && <div>{response.message}</div>
            }
        </>
    )
}