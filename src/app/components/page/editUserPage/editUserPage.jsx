import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const EditUserPage = ({ userId }) => {
    const history = useHistory();
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const { currentUser, updateUserData } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser._id !== userId) {
            history.push(`/users/${currentUser._id}`);
        }
    }, [userId, currentUser]);

    const { professions, isLoading: professionsLoading } = useProfessions();
    const professionsList = professions.map(p => ({
        label: p.name,
        value: p._id
    }));

    const { qualities, getQuality, isLoading: qualitiesLoading } = useQualities();
    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id
    }));
    const userQualities = user.qualities.map(quality => getQuality(quality));

    const [data, setData] = useState({
        _id: user._id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        sex: user.sex,
        qualities: userQualities.map(q => ({
            label: q.name,
            value: q._id
        }))
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user && !professionsLoading && !qualitiesLoading) {
            setIsLoading(false);
        }
    }, [user, professionsLoading, qualitiesLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const newData = {
            ...data,
            qualities: qualities.map((q) => q.value)
        };
        updateUserData(newData);
        history.push(`/users/${data._id}`);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;
