import React, {useState} from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

export default function App() {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users => users.filter(user => user._id !== userId))
    }

    const toggleStatus = (userId) => {
        const newUsers = users.map((user) => {
            return user._id === userId ? {...user, bookmark: !user.bookmark} : user
        })

        setUsers(newUsers)
    }

    return (
        <div className="page">
            <SearchStatus usersNumber={users.length} />
            <Users users={users} onDelete={handleDelete} onStatus={toggleStatus} />
        </div>
    )
}