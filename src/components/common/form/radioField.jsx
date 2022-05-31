import React from 'react'
import PropTypes from 'prop-types'
import withClassesAndOnChange from '../../hoc/form/withClassessAndOnChange'

const RadioField = ({ options, name, onChange, value, label }) => {
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <div>
                {options.map(option => (
                    <div
                        className="form-check form-check-inline"
                        key={option.name + '_' + option.value}
                    >
                        <input type="radio"
                            className="form-check-input"
                            name={name}
                            id={option.name + '_' + option.value}
                            value={option.value}
                            checked={option.value === value}
                            onChange={onChange}
                        />
                        <label htmlFor={option.name + '_' + option.value}
                            className="form-check-label"
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
}

const radioFieldWithHOC = withClassesAndOnChange(RadioField)

export default radioFieldWithHOC
