import { useUserContext } from "../../contexts/useUserContext"


function Main() {
    const { user, signOut } = useUserContext();

    return (
        <>
            <h1>Welkom op de landing page, {user?.username}</h1>
            <button onClick={signOut}>Log Out!</button>
        </>
    )
}

export default Main