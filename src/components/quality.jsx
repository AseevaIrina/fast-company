import React from "react";

const Quality = ({color, name}) => {
    return (
        <span className={`badge bg-${color} users__badge`}>{name}</span>
    )
}

export default Quality