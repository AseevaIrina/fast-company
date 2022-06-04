import React from 'react'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/userEditPage'
import { UserProvider } from '../hooks/use.users'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    return (
        <>
            <UserProvider>
                {userId
                    ? (
                        edit
                            ? (
                                <EditUserPage />
                            )
                            : (
                                <UserPage userId={userId} />
                            )
                    )
                    : (
                        <UsersListPage />
                    )}
            </UserProvider>
        </>
    )
}

export default Users
