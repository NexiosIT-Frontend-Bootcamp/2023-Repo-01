import axios from "axios";
import { Room } from "../types/room";
import { getDefaultHeaders } from "./util";


export const postRoom = async (room: Room, jwt: string) => {
    const result = await axios.post("/rooms", room, {headers: getDefaultHeaders(jwt)});
    return result.data;
};

export const getRooms = async (jwt: string): Promise<Room[]> => {
    const result = await axios.get("/rooms", {headers: getDefaultHeaders(jwt)});
    return result.data;
}

export const getRoom = async (roomId: string, jwt: string): Promise<Room> => {
    const result = await axios.get("/rooms/"+roomId, {headers: getDefaultHeaders(jwt)});
    return result.data;
}