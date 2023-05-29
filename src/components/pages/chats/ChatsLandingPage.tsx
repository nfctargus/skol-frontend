import { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../utils/context/AuthContext";


const ChatLandingPage = () => {
    const {user} = useContext(AuthContext)
    return (
        <>
            <div>Logged in as: {user?.email}</div>
        </>
    )
}
export default ChatLandingPage