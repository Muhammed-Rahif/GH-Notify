import axios from "axios";
import { RegisterUser } from "../types/register";

const registerUser = (data: RegisterUser): Promise<any> =>
    new Promise((resolve, reject) => {
        axios
            .post("/api/v1/register-user", { ...data })
            .then(response => {
                let resData = response.data;
                if (!resData.success) reject(resData);
                else resolve(resData);
            })
            .catch(err =>
                reject(err.response?.data?.message ? err.response?.data : err)
            );
    });

const updateUser = (data: Partial<RegisterUser>): Promise<any> =>
    new Promise((resolve, reject) => {
        axios
            .put("/api/v1/update-user", { ...data })
            .then(response => {
                let resData = response.data;
                if (!resData.success) reject(resData);
                else resolve(resData);
            })
            .catch(err =>
                reject(err.response?.data?.message ? err.response?.data : err)
            );
    });

export { registerUser, updateUser };
