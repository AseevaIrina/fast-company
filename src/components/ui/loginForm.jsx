import React, { useEffect, useState } from 'react'
// import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import * as yup from 'yup'

const LoginForm = () => {
    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validationScheme = yup.object().shape({
        password: yup
            .string()
            .required('Поле пароля обязательно для заполнения')
            .matches(/(?=.*[A-Z])/, 'Пароль должен соделржать хотя бы одну заглавную букву')
            .matches(/(?=.*[0-9])/, 'Пароль должен соделржать хотя бы одну цифру')
            .matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать один из специальных символов !@#$%^&*')
            .matches(/(?=.{8,})/, 'Пароль должен соделржать минимум 8 символов'),
        email: yup
            .string()
            .required('Эл. почта обязательна для заполнени')
            .email('Email введен некорректно')
    })

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: 'Эл. почта обязательна для заполнения'
    //         },
    //         isEmail: {
    //             message: 'Email введен некорректно'
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: 'Поле пароля обязательно для заполнения'
    //         },
    //         isCapitalSymbol: {
    //             message: 'Пароль должен соделржать хотя бы одну заглавную букву'
    //         },
    //         isContainDigit: {
    //             message: 'Пароль должен соделржать хотя бы одну цифру'
    //         },
    //         min: {
    //             message: 'Пароль должен соделржать минимум 8 символов',
    //             value: 8
    //         }
    //     }
    // }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        // const errors = validator(data, validatorConfig)

        validationScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))

        // setErrors(errors)
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

        <form onSubmit={handleSubmit}>
            <TextField label="Электронная почта"
                name="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
            />

            <div>
                <TextField label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    error={errors.password}
                    onChange={handleChange}
                />
            </div>

            <CheckBoxField value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>

            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Отправить</button>
        </form>
    )
}

export default LoginForm
