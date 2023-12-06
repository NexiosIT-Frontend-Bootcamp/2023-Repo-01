import axios from "axios";
import { RegisterUser } from "../types/registerUser";
import { IUser } from "../contexts/useUserContext";


export const postUser = async (user: RegisterUser) => {
    const result = await axios.post("/users", user);
    return result.data;
};

export const getProfileUser = async (jwt: string ): Promise<IUser> => {
    const result = await axios.get("/users/profile", { headers: getDefaultHeaders(jwt) });
    console.log(result.data);
    return result.data;
}

// In utility file
export const getDefaultHeaders = (jwt: string) => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
    };
};


