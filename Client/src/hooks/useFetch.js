import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetch = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await checkAndRefreshTokenIfNeeded();
                const res = await axios.get(url, {
                    withCredentials: true
                });
                setData(res.data);
            } catch (err) {
                handleFetchError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const handleFetchError = err => {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError(err.message);
        }
    };

    const handleRequest = async (method, endpoint, payload = null) => {
        setLoading(true);
        try {
            await checkAndRefreshTokenIfNeeded();
            const config = {
                method,
                url: endpoint,
                data: payload,
                withCredentials: true
            };
            const res = await axios(config);
            setData(res.data);
        } catch (err) {
            handleFetchError(err);
        }
        setLoading(false);
    };

    const deleteData = async endpoint => {
        await handleRequest("DELETE", endpoint);
    };

    const putData = async (endpoint, payload) => {
        await handleRequest("PUT", endpoint, payload);
    };

    const patchData = async (endpoint, payload) => {
        await handleRequest("PATCH", endpoint, payload);
    };

    const checkAndRefreshTokenIfNeeded = async () => {
        if (isTokenExpired()) {
            await refreshAuthToken();
        }
    };

    const isTokenExpired = () => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        let tokenExpire = localStorage.getItem("tokenExpire");
        tokenExpire = storedData.tokenExpire;
        return tokenExpire && new Date(tokenExpire) <= new Date();
    };

    const refreshAuthToken = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/token",
                {},
                {
                    withCredentials: true
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    };

    return { data, loading, error, deleteData, putData, patchData };
};

export default useFetch;
