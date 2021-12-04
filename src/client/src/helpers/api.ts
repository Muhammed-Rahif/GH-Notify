import axios from "axios";
import { RegisterUser } from "../types/register";

const registerUser = (data: RegisterUser): Promise<any> =>
    new Promise((resolve, reject) => {
        axios
            .post("/api/v1/register", { ...data })
            .then(response => {
                let resData = response.data;
                if (!resData.success) reject(resData);
                else resolve(resData);
            })
            .catch(err =>
                reject(err.response?.data?.message ? err.response?.data : err)
            );
    });

export { registerUser };
