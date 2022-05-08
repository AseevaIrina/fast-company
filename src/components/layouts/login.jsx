import React, { useEffect, useState } from 'react'
import TextField from '../textField'
import { validator } from '../../utils/validator'

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Эл. почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Поле пароля обязательно для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен соделржать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен соделржать хотя бы одну цифру'
            },
            min: {
                message: 'Пароль должен соделржать минимум 8 символов',
                value: 8
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = validate()

        if (!isValid) return
        console.log(data)
    }

    return (
        <div className="container">
            <h1 className="mb-4">Login</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField label="Электронная почта"
                            name="email"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <br/>
                        <div>
                            <TextField label="Пароль"
                                type="password"
                                name="password"
                                value={data.password}
                                error={errors.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Отправить</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
