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
                // const token = Cookies.get("access_token");
                const res = await axios.get(url, {
                    withCredentials: true
                });
                console.log("Response data:", res.data);
                setData(res.data);
            } catch (err) {
                // console.log(Cookies.get("access_token"));
                if (err.response && err.response.status === 401) {
                    // Если ошибка 401, пытаемся обновить токен
                    try {
                        const newToken = await refreshAuthToken();
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

    const reFetch = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("access_token");
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    const refreshAuthToken = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/token", {
                // Тело запроса может содержать refresh token или другие данные, необходимые для обновления токена
            });
            const newToken = response.data.token; // Предполагается, что новый токен возвращается в поле `token`
            // Сохраняем новый токен в куки
            Cookies.set("access_token", newToken);
            return newToken;
        } catch (error) {
            console.error("Error refreshing token", error);
            throw error;
        }
    };
    return { data, loading, error, reFetch };
};

export default useFetch;
