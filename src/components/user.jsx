import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <tr className="users__row">
            <td scope="row" className="users__col">
                {name}
            </td>
            <td className="users__col">
                {qualities.map((quality) => {
                    return <Quality {...quality} key={quality._id} />
                })}
            </td>
            <td className="users__col">{profession.name}</td>
            <td className="users__col">{completedMeetings}</td>
            <td className="users__col">{rate}&nbsp;/5</td>
            <td className="users__col">
                <Bookmark
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>
            <td className="users__col">
                <button
                    className="btn btn-danger btn-lg"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired
}

export default User
