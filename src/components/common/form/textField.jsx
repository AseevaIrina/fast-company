import React, { useState } from 'react'
import PropTypes from 'prop-types'
import withClassesAndOnChange from '../../hoc/form/withClassessAndOnChange'

const TextField = ({
    label,
    type = 'text',
    name,
    value,
    getClasses,
    invalidFeedback,
    onChange
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{ label }</label>
            <div className="input-group has-validation">
                <input type={showPassword ? 'text' : type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className={getClasses(['form-control'])}
                />
                {type === 'password' && (
                    <button className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
                    </button>
                )}
                {invalidFeedback()}
            </div>
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    getClasses: PropTypes.func,
    invalidFeedback: PropTypes.func,
    onChange: PropTypes.func
}

const TextFieldWithHOC = withClassesAndOnChange(TextField)

export default TextFieldWithHOC
