export default function ApiMessageErro({ message } : { message : string | undefined}) {


    return (
        <p className="text-red-500 text-sm">
            {
                (message) && message
            }
        </p>
    )
}