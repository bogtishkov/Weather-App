import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import UsersCard from "./UsersCard.tsx/UsersCard"

const AllUsersPage = () => {
    return (
        <div className="grid-cols-3	p-10">
            <div className="flex justify-between p-10">
                <h1 className="text-4xl font-semibold">
                    Users
                </h1>
                <Button variant={"outline"}>
                    <div className="flex items-center">
                        <Heart />
                        <p className="p-2">
                            View saved users
                        </p>
                    </div>
                </Button>
            </div>
            <div className="grid grid-cols-3">
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
                <UsersCard />
            </div>
        </div>
    )
}

export default AllUsersPage
