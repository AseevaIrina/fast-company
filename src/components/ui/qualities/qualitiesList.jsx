import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/use.quality'

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities()

    const userQualities = getQuality(qualities)

    if (!isLoading) {
        return (
            <>
                {userQualities.map((quality) => {
                    return <Quality key={quality._id} {...quality} />
                })}
            </>
        )
    } else {
        return '...Loading'
    }
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
