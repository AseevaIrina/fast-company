import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (<Route {...rest}
                   render={(props) => {
                       const { userId, edit } = props.match.params;
                       if (!currentUser) {
                           return (
                               <Redirect
                                   to={{
                                       pathname: "/login",
                                       state: {
                                           from: props.location
                                       }
                                   }}
                               />
                           );
                       }
                       if (edit && userId !== currentUser._id) {
                           return (
                               <Redirect
                                   to={{
                                       pathname: `/users/${currentUser._id}`,
                                       state: {
                                           from: props.location
                                       }
                                   }}
                               />
                           );
                       }
                       return Component ? <Component {...props} /> : children;
                   }}
            />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    match: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
