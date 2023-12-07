import axios from "axios";
import { getDefaultHeaders } from "./util";
import { Message } from "../types/message";


export const getMessages = async (jwt: string): Promise<Message[]> => {
    const result = await axios.get("/messages", {headers: getDefaultHeaders(jwt)});
}

export const postMessage = async (message: Message, jwt: string) => {
    const result = await axios.post("/messages",message, {headers: getDefaultHeaders(jwt)});
    return result.data;
}