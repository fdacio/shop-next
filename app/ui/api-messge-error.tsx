export default function ApiMessageErro({ message } : { message : string | undefined}) {


    return (
        <>
            {
                (message?.toString != null) && <div>{message}</div>
            }
        </>
    )
}