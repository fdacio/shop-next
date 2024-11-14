import { ApiUser } from "@/app/lib/api/types/entities"

export default function List({ data: users }: { data: ApiUser[] | undefined }) {

    return (
        <table className="border w-full">
            <thead>
                <tr className="bg-gray-300">
                    <th className="text-left border p-1">ID</th>
                    <th className="text-left border p-1">Name</th>
                    <th className="text-left border p-1">Username</th>
                    <th className="text-left border p-1">Rule</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user: ApiUser) => {
                    return (
                        <tr key={user.id}>
                            <td className="text-right border p-1">{user.id}</td>
                            <td className="text-left border p-1">{user.nome}</td>
                            <td className="text-left border p-1">{user.username}</td>
                            <td className="text-left border p-1">{user.rules.map((r) => { return r.nome + " " })}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>

    )
}