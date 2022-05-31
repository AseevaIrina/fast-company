import React from 'react'
import PropTypes from 'prop-types'
import withClassesAndOnChange from '../../hoc/form/withClassessAndOnChange'

const CheckBoxField = ({ name, value, children, invalidFeedback, onChange, getClasses }) => {
    return (
        <div className="form-check mb-4">
            <input type="checkbox"
                className={getClasses(['form-check-input'])}
                value=""
                id={name}
                name={name}
                onChange={onChange}
                checked={value}
            />
            <label htmlFor={name}
                className="form-check-label"
            >
                {children}
            </label>
            {invalidFeedback()}
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
    invalidFeedback: PropTypes.func,
    getClasses: PropTypes.func,
    onChange: PropTypes.func
}

const checkBoxFieldWithHOC = withClassesAndOnChange(CheckBoxField)

export default checkBoxFieldWithHOC
