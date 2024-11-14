import { Product } from "@/app/lib/api/types/entities"

export default function List({ data: products }: { data: Product[] | undefined }) {

    return (
        <table className="border w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="text-left border p-1">ID</th>
                    <th className="text-left border p-1">Name</th>
                    <th className="text-left border p-1">Price</th>
                </tr>
            </thead>
            <tbody>

                {products?.map((product: Product) => {
                    return (
                        <tr key={product.id}>
                            <td className="text-right border p-1">{product.id}</td>
                            <td className="text-left border p-1">{product.nome}</td>
                            <td className="text-right border p-1">{product.preco}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>

    )
}