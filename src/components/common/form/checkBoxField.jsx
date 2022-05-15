import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({ name, value, children, error, onChange }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value })
    }

    const getInputClasses = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '')
    }

    return (
        <div className="form-check mb-4">
            <input type="checkbox"
                className={getInputClasses()}
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label htmlFor={name}
                className="form-check-label"
            >
                {children}
            </label>
            {error &&
                <div className="invalid-feedback">{error}</div>
            }
        </div>
    )
}

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string,
    onChange: PropTypes.func
}

export default CheckBoxField
