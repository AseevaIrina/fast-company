import React from 'react'
import UsersListPage from '../components/page/usersListPage'
import { Route, Switch } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UserEdit from '../components/page/userEdit'

const Users = () => {
    return (
        <>
            <Switch>
                <Route path='/users/:userId/edit' component={UserEdit} />
                <Route exact path='/users/:userId' component={UserPage}/>
                <Route exact path='/users/' component={UsersListPage} />
            </Switch>
        </>
    )
}

export default Users
