import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualitiesService from '../services/qualities.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get()
            setQualities(content)
            setIsLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function getQuality(userQualities) {
        let userQualitiesList = []
        userQualities.forEach((userQuality) => {
            userQualitiesList = [...userQualitiesList, ...qualities.filter((quality) => (userQuality === quality._id))]
        })

        return userQualitiesList
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <QualitiesContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
