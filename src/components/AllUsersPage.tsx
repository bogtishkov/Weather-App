import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import UserList from "./Users/UserList"
import { Link } from "react-router-dom"

const AllUsersPage = () => {

    return (
        <div className="grid-cols-3	p-10">
            <div className="grid gap-6 py-6 md:flex md:justify-between md:py-10 ">
                <h1 className="text-4xl font-semibold">
                    Users
                </h1>
                <Link to={'/saved'}>
                    <Button variant={"outline"}>
                        <div className="flex items-center">
                            <Heart className="fill-black" />
                            <p className="p-2">
                                View saved users
                            </p>
                        </div>
                    </Button>
                </Link>
            </div>
            <UserList />
        </div>
    )
}

export default AllUsersPage
