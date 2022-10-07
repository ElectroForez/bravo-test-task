import React, {ChangeEvent} from 'react';
import usePersons from "../../hooks/persons";
import ErrorMessage from "../ErrorMessage";

interface PersonSelectorProps {
    addChangeHandler: (value: string) => void;
}

function PersonSelector({addChangeHandler}: PersonSelectorProps) {
    const {persons, isLoading, error} = usePersons();

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        addChangeHandler(event.target.value);
    }

    return (
        <div className="mb-3">
            {isLoading && <p>Выполняется загрузка данных ФИО...</p>}
            {error && <ErrorMessage message={error}/>}
            <label htmlFor="selectPerson" className="form-label">ФИО</label>
            <select onChange={changeHandler} className="form-select" id="selectPerson" aria-label="Default select example">
                <option selected>Ваше фио...</option>
                {persons.map(person => <option value={person.id} key={person.id}>{person.fullName}</option>)}
            </select>
        </div>
    )
}

export default PersonSelector;
