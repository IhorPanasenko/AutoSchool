import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
            try {
                const res = await axios(config);
                console.log("Response from UseFetch: ", res);
                setData(res.data);
                return res.data;
            } catch (err) {
                console.log("err from UseFetch: ", err);
                console.log("err from UseFetch: ", err.response);

                setError(err.response);
                return err;
            }
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const getData = async endpoint => {
        return await handleRequest("GET", endpoint);
    };
    const deleteData = async endpoint => {
        await handleRequest("DELETE", endpoint);
    };

    const putData = async (endpoint, payload) => {
        await handleRequest("PUT", endpoint, payload);
    };

    const postData = async (endpoint, payload) => {
        await handleRequest("POST", endpoint, payload);
    };

    const patchData = async (endpoint, payload) => {
        let res = await handleRequest("PATCH", endpoint, payload);
        return res;
    };

    const checkAndRefreshTokenIfNeeded = async () => {
        if (isTokenExpired()) {
            await refreshAuthToken();
        }
    };

    const isTokenExpired = () => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        const tokenExpire = storedData.tokenExpire;
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
            console.log("new token: ", response);

            const storedData = JSON.parse(localStorage.getItem("user"));
            storedData.tokenExpire = response.data.tokenExpire;
            localStorage.setItem("user", JSON.stringify(storedData));
            return response;
        } catch (error) {
            console.error("Error refreshing token", error);
            throw error;
        }
    };

    return { data, deleteData, putData, patchData, postData, error, getData };
};

export default useFetch;
