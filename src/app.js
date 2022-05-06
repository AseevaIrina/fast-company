import React from 'react'
import NavBar from './components/navBar'
import { Route, Switch } from 'react-router-dom'
import Users from './components/layouts/users'
import Main from './components/layouts/main'
import Login from './components/layouts/login'

export default function App() {
    return (
        <>
            <NavBar />

            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/users/:userId?' component={Users} />
            </Switch>
        </>
    )
}
