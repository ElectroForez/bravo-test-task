import {useEffect, useState} from 'react';
import {IPerson} from "../models";
import axios, {AxiosError} from "axios";

export default function usePersons() {
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function fetchPersons() {
        try {
            setError('');
            setLoading(true);
            const result = await axios.get<IPerson[]>('./persons');
            setPersons(result.data);
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchPersons()
    }, []);

    return {persons, isLoading, error};
}