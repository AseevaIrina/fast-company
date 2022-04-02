import React from "react";
import User from "./user";

const Users = ({ users, onDelete, onStatus }) => {

    return (
        <>
            { users.length > 0 && (
                <table className="table users">
                    <thead>
                    <tr className="users__head">
                        <th scope="col" className="users__col">Имя</th>
                        <th scope="col" className="users__col">Качества</th>
                        <th scope="col" className="users__col">Профессия</th>
                        <th scope="col" className="users__col">Встретился, раз</th>
                        <th scope="col" className="users__col">Оценка</th>
                        <th scope="col" className="users__col">Избранное</th>
                        <th scope="col" className="users__col" />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user) => <User key={user._id} user={user} onDelete={onDelete} onStatus={onStatus} />)
                    }
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users