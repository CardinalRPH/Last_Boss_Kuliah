import useAxios from "axios-hooks"
import { httpURI } from "../config/originConfig"

const BASE_URL = httpURI

export const usePost = (url, manual = true) => {
    const [{ data, loading, error, response }, execute] = useAxios({
        url: `${BASE_URL}/${url}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        withCredentials: true
    },
        { manual },
    )

    return { data, loading, error, execute, response }
}

export const usePut = (url, manual = true) => {
    const [{ data, loading, error, response }, execute] = useAxios({
        url: `${BASE_URL}/${url}`,
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        withCredentials: true
    },
        { manual },
    )

    return { data, loading, error, execute, response }
}

export const useDelete = (url, manual = true) => {
    const [{ data, loading, error, response }, execute] = useAxios({
        url: `${BASE_URL}/${url}`,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        withCredentials: true
    },
        { manual },
    )

    return { data, loading, error, execute, response }
}

export const useGet = (url, manual = false, autoCancel = true) => {
    const [{ data, loading, error, response }, execute] = useAxios({
        url: `${BASE_URL}/${url}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        withCredentials: true
    },
        { manual, autoCancel }
    )

    return { data, loading, error, execute, response }
}

export const useGetByParam = (url, manual = true) => {
    const [{ data, loading, error, response }, execute] = useAxios({
        url: `${BASE_URL}/${url}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Credentials": true
        }
    },
        { manual },
    )

    return { data, loading, error, execute, response }
}
