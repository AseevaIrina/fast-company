import React from 'react'
import NavBar from './components/ui/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Users from './layouts/users'
import Main from './layouts/main'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/use.profession'
import { QualitiesProvider } from './hooks/use.quality'

export default function App() {
    return (
        <>
            <NavBar />
            <QualitiesProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/users/:userId?/:edit?" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </QualitiesProvider>
            <ToastContainer />
            <ToastContainer />
        </>
    )
}
