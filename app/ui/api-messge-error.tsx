import { useEffect, useState } from "react"

export default function ApiMessageErro({ message } : { message : string | undefined}) {

    const [msg, setMsg] = useState<string | undefined>(undefined);

    useEffect(() => {
        setMsg(message);
    })

    return (
        <>
            {
                (msg?.toString != null) && <div>{msg}</div>
            }
        </>
    )
}