import axios from "axios";
import { RegisterUser } from "../types/registerUser";


export const postUser = async (user: RegisterUser) => {
    const result = await axios.post("/users", user);
    console.log(result);
    return result.data;
};
