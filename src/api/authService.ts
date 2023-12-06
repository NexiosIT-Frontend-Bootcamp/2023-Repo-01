import axios from "axios";
import { LoginUser } from "../types/loginUser";


export const loginUser = async (user: LoginUser) => {
    const result = await axios.post("/auth/login", user);
    console.log(result);
    return result.data.access_token;
}