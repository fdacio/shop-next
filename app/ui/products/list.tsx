import { Product } from "@/app/lib/api/types/entities"

export default function List({ data : products }: { data: Product[] | undefined }) {
    
    return (
        <ul>
            {products?.map((product: Product) => {
                return (
                    <li key={product.id}>{product.id} | {product.nome} </li>
                )
            }
            )}
        </ul>

    )
}