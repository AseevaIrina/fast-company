import React from "react";

const Bookmark = ({id, status, onStatus}) => {
    return (
        <button className="users__favorites" onClick={() => onStatus(id)}>
            <i className={`${status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}`} />
        </button>
    )
}

export default Bookmark