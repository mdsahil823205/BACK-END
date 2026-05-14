import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const register = async ({ email, password, username }) => {
    const response = await api.post("/register", {
        email, password, username
    })
    return response.data
}

export const login = async ({ email, password, username }) => {
    const response = await api.post("/login", {
        email, password, username
    })
    return response.data
}
export const getMe = async () => {
    const response = await api.get("/get-me")
    return response.data
}
export const logout = async () => {
    const response = await api.get("/logout")
    return response.data
}

