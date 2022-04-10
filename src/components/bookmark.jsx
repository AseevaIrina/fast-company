import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ id, status, onStatus }) => {
    return (
        <button className="users__favorites" onClick={() => onStatus(id)}>
            <i
                className={`${
                    status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'
                }`}
            />
        </button>
    )
}

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    onStatus: PropTypes.func.isRequired
}

export default Bookmark
