import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetch = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                const tokenExpired = isTokenExpired();
                if (tokenExpired) {
                    try {
                        await refreshAuthToken();
                        const res = await axios.get(url, {
                            withCredentials: true
                        });
                        setData(res.data);
                    } catch (refreshError) {
                        setError(refreshError);
                    }
                } else {
                    setError(err);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    // const reFetch = async () => {
    //     setLoading(true);
    //     try {
    //         await checkAndRefreshTokenIfNeeded();
    //         const token = Cookies.get("access_token");
    //         const res = await axios.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setData(res.data);
    //     } catch (err) {
    //         setError(err);
    //     }
    //     setLoading(false);
    // };

    const handleRequest = async (method, endpoint, payload = null) => {
        setLoading(true);
        try {
            await checkAndRefreshTokenIfNeeded();
            // const token = Cookies.get("access_token");
            const config = {
                method,
                url: endpoint,
                data: payload,
                withCredentials: true
            };
            const res = await axios(config);
            setData(res.data);
        } catch (err) {
            setError(err);
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
        console.log(tokenExpire);
        console.log("storedData", storedData);
        console.log("storedData.tokenExpire", storedData.tokenExpire);

        console.log("dldldl", tokenExpire && new Date(tokenExpire) <= new Date());

        return tokenExpire && new Date(tokenExpire) <= new Date();
    };

    const refreshAuthToken = async () => {
        try {
            console.log("try");
            const response = await axios.post(
                "http://localhost:3000/api/auth/token",
                {},
                {
                    withCredentials: true // The request body can contain the refresh token or other data needed to refresh the token
                }
            );
            // const newToken = response.data.token;
            console.log("new token");
            // Assuming the new token is returned in the `token` field
            // Save the new token in cookies
            // Cookies.set("access_token", newToken);
            // Update the token expiration in local storage
            // const newExpireDate = new Date();
            // newExpireDate.setMinutes(newExpireDate.getMinutes() + 60); // Assuming the new token is valid for 60 minutes
            // localStorage.setItem("tokenExpire", newExpireDate.toISOString());
            return response;
        } catch (error) {
            console.error("Error refreshing token", error);
            throw error;
        }
    };

    return { data, deleteData, putData };
};

export default useFetch;
