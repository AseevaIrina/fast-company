import React from 'react'
import PropTypes from 'prop-types'

const withClassesAndOnChange = (Component) => {
    const Sub = ({ error, onChange, ...restProps }) => {
        const handleGetInputClasses = (classes) => {
            if (classes) {
                return classes.join(' ') + (error ? ' is-invalid' : '')
            }
        }

        const handleChange = ({ target }) => {
            if (target.type === 'checkbox') {
                onChange({
                    name: target.name,
                    value: target.checked
                })
            } else {
                onChange({ name: target.name, value: target.value })
            }
        }

        const invalidFeedback = () => {
            return error && <div className="invalid-feedback">{error}</div>
        }

        return <Component onChange={handleChange}
            getClasses={handleGetInputClasses}
            error={error}
            invalidFeedback={invalidFeedback}
            {...restProps}
        />
    }

    Sub.propTypes = {
        error: PropTypes.string,
        onChange: PropTypes.func
    }

    return Sub
}

export default withClassesAndOnChange
