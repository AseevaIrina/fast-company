import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities/qualitiesList'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const params = useParams()
    const { userId } = params

    const [userData, setUserData] = useState()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUserData(data))
    }, [])

    if (userData) {
        return (
            <>
                <h1>{userData.name}</h1>
                <h2>Профессия: <span>{userData.profession.name}</span></h2><br />
                <div><Qualities qualities={userData.qualities} /></div><br />
                <strong>completedMeetings: {userData.completedMeetings}</strong><br /><br />
                <h3>Rate: <span>{userData.rate}</span></h3>
                <Link to={'/users/' + userId + '/edit'}><span className="btn btn-primary mt-2">Изменить</span></Link>
            </>
        )
    }
    return '...loading'
}

UserPage.propTypes = {
    id: PropTypes.string
}

export default UserPage
