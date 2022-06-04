import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { useUsers } from '../../../hooks/use.users'

const UserPage = () => {
    const params = useParams()
    const { userId } = params
    const [userData, setUserData] = useState()
    const { getUser } = useUsers()

    useEffect(() => {
        setUserData(getUser(userId))
    }, [])

    if (userData) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={userData} />
                        <QualitiesCard data={userData.qualities} />
                        <MeetingsCard value={userData.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        )
    }
    return '...Loading'
}

UserPage.propTypes = {
    id: PropTypes.string
}

export default UserPage
