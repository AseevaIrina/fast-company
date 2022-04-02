import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({user, onDelete, onStatus}) => {

    return (
        <tr className="users__row">
            <td scope="row" className="users__col">{user.name}</td>
            <td className="users__col">
                {user.qualities.map((quality) => {
                    return <Quality {...quality}  key={quality._id} />
                })}
            </td>
            <td className="users__col">{user.profession.name}</td>
            <td className="users__col">{user.completedMeetings}</td>
            <td className="users__col">{user.rate}&nbsp;/5</td>
            <td className="users__col"><Bookmark status={user.bookmark} onStatus={onStatus} id={user._id} /></td>
            <td className="users__col"><button className="btn btn-danger btn-lg" onClick={() => onDelete(user._id)}>Delete</button></td>
        </tr>
    )
}

export default User