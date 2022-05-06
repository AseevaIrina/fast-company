import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { Link } from 'react-router-dom'

const UserPage = ({ id }) => {
    const [userData, setUserData] = useState()

    useEffect(() => {
        api.users.getById(id).then((data) => setUserData(data))
    }, [])

    if (userData) {
        return (
            <>
                <h1>{userData.name}</h1>
                <h2>Профессия: <span>{userData.profession.name}</span></h2><br />
                <div><QualitiesList qualities={userData.qualities} /></div><br />
                <strong>completedMeetings: {userData.completedMeetings}</strong><br /><br />
                <h3>Rate: <span>{userData.rate}</span></h3>
                <Link to="/users"><span className="btn btn-primary mt-2">Все пользователи</span></Link>
            </>
        )
    }
    return '...loading'
}

UserPage.propTypes = {
    id: PropTypes.string
}

export default UserPage
