import React, { useEffect, useState } from 'react'
import UsersList from '../usersList'
import { useParams } from 'react-router-dom'
import UserPage from '../userPage'
import api from '../../api'

const Users = () => {
    const [usersData, setUsersData] = useState()
    const [professionsData, setProfessionsData] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsersData(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessionsData(data))
    }, [])

    const params = useParams()
    const { userId } = params

    return (
        <>
            {userId
                ? <UserPage id={userId} />
                : <UsersList usersData={usersData} professions={professionsData} />
            }
        </>
    )
}

export default Users
