import React, {useState} from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users => users.filter(user => user._id !== userId))
    }

    const renderPhrase = (number) => {
        return number.toString().includes('2', number.toString().length - 1) && number !== 12 ||
            number.toString().includes('3', number.toString().length - 1) && number !== 13 ||
            number.toString().includes('4', number.toString().length - 1) && number !== 14 ?

            `${number} человека тусанут с тобой сегодня` :
            number === 0 ? 'Никто с тобой не тусанет' :
                `${number} человек тусанет с тобой сегодня`
    }

    const setTitleClass = () => {
        return users.length === 0 ? "page__title page__title_fail" : "page__title"
    }

    return (
        <div className="page">
            <h4 className={setTitleClass()}>{renderPhrase(users.length)}</h4>
            {
                users.length !== 0 ?
                    <table className="table users">
                        <thead>
                        <tr className="users__head">
                            <th scope="col" className="users__col">Имя</th>
                            <th scope="col" className="users__col">Качества</th>
                            <th scope="col" className="users__col">Профессия</th>
                            <th scope="col" className="users__col">Встретился, раз</th>
                            <th scope="col" className="users__col">Оценка</th>
                            <th scope="col" className="users__col" />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user) => {
                                return (
                                    <tr key={user._id} className="users__row">
                                        <td scope="row" className="users__col">{user.name}</td>
                                        <td className="users__col">
                                            {user.qualities.map((quality) => {
                                                return <span key={quality._id} className={`badge bg-${quality.color} users__badge`}>{quality.name}</span>
                                            })}
                                        </td>
                                        <td className="users__col">{user.profession.name}</td>
                                        <td className="users__col">{user.completedMeetings}</td>
                                        <td className="users__col">{user.rate}&nbsp;/5</td>
                                        <td className="users__col"><button className="btn btn-danger btn-lg" onClick={() => handleDelete(user._id)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table> : ''
            }
        </div>
    )
}

export default Users