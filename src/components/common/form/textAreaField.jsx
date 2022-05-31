import React from 'react'
import PropTypes from 'prop-types'
import withClassesAndOnChange from '../../hoc/form/withClassessAndOnChange'

const TextAreaField = ({ label, name, value, onChange, getClasses, invalidFeedback }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getClasses(['form-control'])}
                />

                {invalidFeedback()}
            </div>
        </div>
    )
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    getClasses: PropTypes.func,
    invalidFeedback: PropTypes.func
}

const TextAreaFieldWithHOC = withClassesAndOnChange(TextAreaField)

export default TextAreaFieldWithHOC
