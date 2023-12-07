import axios from "axios";
import { RegisterUser } from "../types/registerUser";
import { IUser } from "../contexts/useUserContext";
import { getDefaultHeaders } from "./util";


export const postUser = async (user: RegisterUser) => {
    const result = await axios.post("/users", user);
    return result.data;
};

export const  getProfileUser = async (jwt: string ): Promise<IUser> => {
    const result = await axios.get("/users/profile", { headers: getDefaultHeaders(jwt) });
    console.log(result.data);
    return result.data;
}

export const getUser = async (jwt: string): Promise<IUser[]> => {
    const result = await axios.get("/users", {headers: getDefaultHeaders(jwt)});
    return result.data;
}



