export default function ApiMessageResponse({ status, message } : { status : Number | undefined , message : string | undefined}) {


    return (
        <>
            {
                (message?.toString != null) && <div>{message}</div>
            }
        </>
    )
}