import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import _ from 'lodash'
import api from '../../../api'

const UsersListPage = () => {
    const [professions, setProfessions] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [searchRequest, setSearchRequest] = useState('')
    const pageSize = 8

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    const handleDelete = (id) => {
        setUsers((users) => users.filter((user) => user._id !== id))
    }

    const handleToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            return user._id === id
                ? { ...user, bookmark: !user.bookmark }
                : user
        })

        setUsers(newUsers)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchRequest])

    const handleChange = ({ target }) => {
        setSearchRequest(target.value.trim())
        setSelectedProf()
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        setSearchRequest('')
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        let filteredUsers = users

        if (selectedProf) {
            filteredUsers = users.filter((user) => _.isEqual(user.profession, selectedProf))
        }

        if (searchRequest) {
            filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchRequest.toLowerCase()))
        }

        const count = filteredUsers.length

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => { setSelectedProf() }

        return (
            <div className="d-flex">
                { professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                        Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column flex-shrink-1 w-100">
                    <SearchStatus usersNumber={count} />
                    <input type="text"
                        placeholder="Search"
                        value={searchRequest}
                        onChange={handleChange}
                        className="form-control"
                    />

                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}

UsersListPage.propTypes = {
    usersData: PropTypes.array,
    professions: PropTypes.array
}

export default UsersListPage
