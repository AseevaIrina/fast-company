import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionsService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionsContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionsContext)
}

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function getProfessionsList() {
        try {
            const { content } = await professionsService.get()
            setProfessions(content)
            setIsLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    function getProfession(id) {
        return professions.find((profession) => profession._id === id)
    }

    return (
        <ProfessionsContext.Provider value={{ isLoading, professions, getProfession }}>
            {children}
        </ProfessionsContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
