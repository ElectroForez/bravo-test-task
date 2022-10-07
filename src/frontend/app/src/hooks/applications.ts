import {useEffect, useState} from 'react';
import {ApplicationsStats} from "../models";
import axios, {AxiosError} from "axios";

export default function useApplications() {
    const [applicationsStat, setApplicationsStat] = useState<ApplicationsStats>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function fetchApplicationsStat() {
        try {
            setError('');
            setLoading(true);
            const result = await axios.get<ApplicationsStats>('./applications/stat');
            setApplicationsStat(result.data);
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            console.error(error.message);
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchApplicationsStat()
    }, []);

    return {applicationsStat, isLoading, error, fetchApplicationsStat};
}