import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, ...rest }) => {
    return (
        <button className="users__favorites" {...rest}>
            <i
                className={'bi bi-bookmark' + (status ? '-fill' : '')}
            />
        </button>
    )
}

Bookmark.propTypes = {
    status: PropTypes.bool
}

export default Bookmark
