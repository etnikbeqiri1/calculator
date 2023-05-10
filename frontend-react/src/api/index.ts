import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api",
    headers: {
        "Content-Type": "application/json"
    }
});
export class ApiClient {
    static login(username: string, password: string) {
        return axiosInstance.post<{
            user: {
                id: number,
                username: string,
                name: string
            },
            token: string
        }>("/login", {
            username,
            password
        })
    }

    static register(name: string, username: string, password: string, terms: boolean) {
        return axiosInstance.post<{
            user: {
                id: number,
                username: string,
                name: string
            },
            message: string
        }>("/register", {
            name,
            username,
            password,
            terms
        })
    }

    static calculate(expr: string) {
        return axiosInstance.get<{
            result: string
        }>("/calculate", {params: {expr}})
    }

    static getHistory() {
        return axiosInstance.get<Array<{
            id: number,
            expr: string,
            result: string
            created_at: string
            updated_at: string
        }>>("/history")
    }

    static deleteHistoryItem(id: number) {
        return axiosInstance.delete<{}>("/history/"+id);
    }

    static deleteHistory() {
        return axiosInstance.delete<{}>("/history/");
    }


}