import React, { useEffect, useState } from 'react'
import Users from './components/users'
import api from './api'

export default function App() {
    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (id) => {
        setUsers((users) => users.filter((user) => user._id !== id))
    }

    const handleToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            return user._id === id
                ? { ...user, bookmark: !user.bookmark }
                : user
        })

        setUsers(newUsers)
    }

    return (
        <div className="page">
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </div>
    )
}
