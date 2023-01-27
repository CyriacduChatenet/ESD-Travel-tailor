import { Dispatch, SetStateAction, useEffect } from 'react';

export const useFetchHook = (api_url : string, method: string, setErrorState: Dispatch<SetStateAction<{}>>, setSuccessState: Dispatch<SetStateAction<{}>>, body?: Object) => {
    const fetchData = async () => {
        const response = await fetch(api_url, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: method,
            body: JSON.stringify(body)
        })

        const responseJSON = await response.json();

        if(responseJSON.statusCode >= 400) {
            return setErrorState(responseJSON);
        } else {
            return setSuccessState(responseJSON);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
};