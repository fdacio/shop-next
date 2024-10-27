import { Config } from "@/app/lib/api/types/entities";
import { useForm } from "react-hook-form";

export default function List({ data : configs }: { data: Config[] | undefined }) {

    const { setValue } = useForm();
    
    return (
        <ul>
            {configs?.map((config: Config) => {
                return (
                    <li className="cursor-pointer" key={config.id} onClick={() => setValue("valor", config.valor)}>{config.id} | {config.chave} | {config.valor} </li>
                )
            }
            )}
        </ul>

    )
}