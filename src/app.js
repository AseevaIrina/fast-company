import React from 'react'
import NavBar from './components/ui/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Users from './layouts/users'
import Main from './layouts/main'
import Login from './layouts/login'
import NotFound from './layouts/not-found'

export default function App() {
    return (
        <>
            <NavBar />

            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login:type?/' component={Login} />
                <Route path='/users/' component={Users} />
                <Route path='/404' component={NotFound} />
                <Redirect to='/404' />
            </Switch>
        </>
    )
}
