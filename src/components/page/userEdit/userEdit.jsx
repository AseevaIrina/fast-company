import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import SelectField from '../../common/form/selectField'
import * as yup from 'yup'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const UserEdit = () => {
    const params = useParams()
    const { userId } = params
    const history = useHistory()

    const [data, setData] = useState({
        name: '',
        profession: { label: '', value: '' },
        email: '',
        sex: '',
        qualities: []
    })

    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const transformQualities = (data) => {
        return data.map((item) => {
            return {
                value: item._id,
                label: item.name
            }
        })
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { value: prof.value, label: prof.label }
            }
        }
    }

    useEffect(() => {
        setIsLoading(true)

        api.users.getById(userId)
            .then((data) =>
                setData({
                    ...data,
                    profession: { label: data.profession.name, value: data.profession._id },
                    qualities: transformQualities(data.qualities)
                }))

        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionsList)
        })

        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
            .finally(() => setIsLoading(false))
    }, [])

    const validationScheme = yup.object().shape({
        name: yup
            .string()
            .required('Поле Имя не должно быть пустым'),

        email: yup
            .string()
            .required('Эл. почта обязательна для заполнени')
            .email('Email введен некорректно')
    })

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        validationScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))

        return Object.keys(errors).length === 0
    }

    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const handleChange = (target) => {
        if (target.name === 'profession') {
            setData((prevState) => ({
                ...prevState,
                [target.name]: getProfessionById(target.value)
            }))
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { qualities } = data

        api.users.update(userId, {
            ...data,
            profession: { name: data.profession.label, _id: data.profession.value },
            qualities: getQualities(qualities)
        })

        history.push(`/users/${userId}`)
    }

    if (!isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField label="Имя"
                                name="name"
                                value={data.name}
                                error={errors.name}
                                onChange={handleChange}
                            />
                            <TextField label="Электронная почта"
                                name="email"
                                value={data.email}
                                error={errors.email}
                                onChange={handleChange}
                            />

                            <SelectField
                                onChange={handleChange}
                                name="profession"
                                options={professions}
                                defaultOption={data.profession.label}
                                value={data.profession.label}
                                label="Выберите вашу профессию"
                            />

                            <RadioField options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' }
                            ]}
                            label="Выберите ваш пол"
                            value={data.sex}
                            name='sex'
                            onChange={handleChange}
                            />

                            <MultiSelectField
                                options={qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                                onChange={handleChange}
                            />

                            <button className="btn btn-primary w-100 mx-auto">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return '...loading'
    }
}

export default UserEdit
