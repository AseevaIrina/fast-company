import React from 'react'
import UsersListPage from '../components/page/usersListPage'
import { Route, Switch } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'

const Users = () => {
    return (
        <>
            <Switch>
                <Route path='/users/:userId/:edit' component={UserEditPage} />
                <Route exact path='/users/:userId' component={UserPage}/>
                <Route exact path='/users/' component={UsersListPage} />
            </Switch>
        </>
    )
}

export default Users
