import React from "react";

const SearchStatus = ({usersNumber}) => {

    const renderPhrase = (number) => {
        if ( number === 0 ) {
            return 'Никто с тобой не тусанет'
        }

        return number.toString().slice(-1) === '2' && number !== 12 ||
        number.toString().slice(-1) === '3' && number !== 13 ||
        number.toString().slice(-1) === '4' && number !== 14 ?
            `${number} человека тусанут с тобой сегодня` :
            `${number} человек тусанет с тобой сегодня`
    }

    const getTitleClass = () => {
        return usersNumber === 0 ? "page__title page__title_fail" : "page__title"
    }

    return (
        <h4 className={getTitleClass()}>{renderPhrase(usersNumber)}</h4>
    )
}

export default SearchStatus