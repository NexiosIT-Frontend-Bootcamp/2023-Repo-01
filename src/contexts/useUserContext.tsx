import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/authService";
import { getProfileUser } from "../api/userService";

export interface IUser {
    username: string,
    email: string,
    _id: string
}

export interface IUserContext {
    loading: boolean;
    user?: IUser;
    jwt?: string;
    signIn: (email: string, password: string) => Promise<LoginResult>;
    signOut: () => void;
}

interface IProviderProps {
    children: React.ReactNode;
}

interface LoginResult {
    accessToken: string;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: IProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();
    const [jwt, setJwt] = useState<string>();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const us = localStorage.getItem('user');
        if (token && us) {
            setJwt(token);
            setUser(JSON.parse(us));
        }
    }, [])

    const signIn = async (email: string, password: string): Promise<LoginResult> => {
        setLoading(true);
        const result = await loginUser({email, password});
        console.log(result.toString());
        setJwt(result.toString());
        const user = await getProfileUser(result??'');
        setUser(user);
        localStorage.setItem('jwt', result);
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
        return result;
    }

    const signOut = async () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(undefined);
        setJwt(undefined);
    }
    return <UserContext.Provider value={{ loading, user, jwt, signIn, signOut }} >{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): IUserContext => {
    const context = useContext<IUserContext | null>(UserContext);

    if (!context) {
        throw new Error("User context must be used within a Provider");
    }
    return context;
}

