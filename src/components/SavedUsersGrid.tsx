import { Undo2 } from "lucide-react"
import UserList from "./Users/UserList"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const SavedUsersGrid = () => {
    return (
        <div className="grid-cols-3	p-10">
            <div className="grid gap-6 py-6 md:flex md:justify-between md:py-10 ">
                <h1 className="text-4xl font-semibold">
                    Saved users
                </h1>
                <Link to={'/'}>
                    <Button variant={"outline"}>
                        <div className="flex items-center">
                            <Undo2 />
                            <p className="p-2">
                                Back to all users
                            </p>
                        </div>
                    </Button>
                </Link>
            </div>
            <UserList />
        </div>
    )
}

export default SavedUsersGrid