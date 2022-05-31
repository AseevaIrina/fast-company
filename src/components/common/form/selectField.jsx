import React from 'react'
import PropTypes from 'prop-types'
import withClassesAndOnChange from '../../hoc/form/withClassessAndOnChange'

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    getClasses, invalidFeedback
}) => {
    const optionsArray = !Array.isArray(options) && typeof options === 'object'
        ? Object.values(options)
        : options

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getClasses(['form-select'])}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="">
                    {defaultOption}
                </option>
                {
                    optionsArray.length > 0 &&
                    optionsArray.map((option) =>
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    )
                }
            </select>
            {invalidFeedback()}
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    getClasses: PropTypes.func,
    invalidFeedback: PropTypes.func
}

const selectFieldWithHOC = withClassesAndOnChange(SelectField)

export default selectFieldWithHOC
