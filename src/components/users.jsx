import React, { useState } from 'react'
import User from './user'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'

const Users = ({ users, onDelete, onStatus }) => {
    const count = users.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const userCrop = paginate(users, currentPage, pageSize)

    return (
        <>
            {count > 0 && (
                <table className="table users">
                    <thead>
                        <tr className="users__head">
                            <th scope="col" className="users__col">
                                Имя
                            </th>
                            <th scope="col" className="users__col">
                                Качества
                            </th>
                            <th scope="col" className="users__col">
                                Профессия
                            </th>
                            <th scope="col" className="users__col">
                                Встретился, раз
                            </th>
                            <th scope="col" className="users__col">
                                Оценка
                            </th>
                            <th scope="col" className="users__col">
                                Избранное
                            </th>
                            <th scope="col" className="users__col" />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                onDelete={onDelete}
                                onStatus={onStatus}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onStatus: PropTypes.func.isRequired
}

export default Users
