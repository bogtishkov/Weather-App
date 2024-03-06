import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import UserList from "./Users/UserList"

const AllUsersPage = () => {

    // 
    return (
        <div className="grid-cols-3	p-10">
            <div className="grid gap-6 py-6 md:flex md:justify-between md:py-10 ">
                <h1 className="text-4xl font-semibold">
                    Users
                </h1>
                <Button variant={"outline"}>
                    <div className="flex items-center">
                        <Heart className="fill-black" />
                        <p className="p-2">
                            View saved users
                        </p>
                    </div>
                </Button>
            </div>
            <UserList />
        </div>
    )
}

export default AllUsersPage
