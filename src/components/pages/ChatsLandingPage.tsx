import { useSelector } from "react-redux";
import { currentUser } from "../../utils/store/auth/authSlice";

const ChatLandingPage = () => {
    const user = useSelector(currentUser);
    return (
        <>
            <div>Chat Landing Page</div>
            <div>{user && user.firstName}</div>
        </>
    )
}
export default ChatLandingPage