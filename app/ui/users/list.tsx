import { ApiUser } from "@/app/lib/api/types/entities"

export default function List({ data : users }: { data: ApiUser[] | undefined }) {
    
    return (
        <ul>
            {users?.map((user: ApiUser) => {
                return (
                    <li key={user.id}>{user.id} | {user.nome} | {user.username} | {user.rules.map((r) => {return r.nome + " "})}</li>
                )
            }
            )}
        </ul>

    )
}