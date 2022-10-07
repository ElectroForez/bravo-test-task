import React, {useEffect, useState} from 'react';
import ErrorMessage from "../ErrorMessage";
import PersonSelector from "./PersonSelector";
import InputDocument from "./InputDocument";
import axios, {AxiosError} from "axios";
import SuccessMessage from "../SuccessMessage";
import usePersons from "../../hooks/persons";
import useApplications from "../../hooks/applications";

function Form() {
    const [personId, setPersonId] = useState<number>();
    const [documentName, setDocumentName] = useState('');
    const [error, setError] = useState('');
    const [successApplication, setSuccess] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        setError('');
        setSuccess('');

        event.preventDefault();

        if (!(documentName && personId)) {
            setError('Не все поля заполнены!');
            return;
        }

        const trimDocumentName = documentName.trim();
        try {
            const result = await axios.post('./applications', {
                personId,
                documentName: trimDocumentName
            })

            if (result.status === 200) {
                setSuccess("Заявка была успешно отправлена");
            }
        } catch (e: unknown) {
            const error = e as AxiosError;
            if (error.response?.status === 403) {
                const data = error.response?.data as any;
                setError(data.message);
            } else {
                setError("Проверьте подключение к серверу");
            }
        }
    }

    const documentChangeHandler = (value: string) => {
        setError('');
        setSuccess('');
        setDocumentName(value);
    }

    const personChangeHandler = (value: string) => {
        setError('');
        setSuccess('');
        setPersonId(Number(value));
    }

    return (
        <form onSubmit={submitHandler} className="req_document mx-auto mt-xl-5 container-sm">
            <PersonSelector addChangeHandler={personChangeHandler}/>
            <InputDocument addChangeHandler={documentChangeHandler}/>
            <button type="submit" className="btn btn-primary">Отправить заявку</button>
            {error && <ErrorMessage message={error}/>}
            {successApplication && <SuccessMessage message={successApplication}/>}
        </form>
    )
}
export default Form;
