import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { FriendContainerStyle, FriendIconContainer, FriendIconStyle, LandingPageFriendAddButton, LandingPageFriendSection, LandingPageHeaderStyle, LandingPageSearchInput, LandingPageStlye } from "../../utils/styles";
import { AppDispatch, RootState } from "../../utils/store";
import { getOtherUserFromFriend } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { ChatBubble, MoreHorizontalFill } from "akar-icons";
import { Friend } from "../../utils/types";
import { findOrCreateChatThunk } from "../../utils/store/chats/chatThunk";
import FriendsModal from "../modals/FriendsModal";


const LandingPage = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [query,setQuery] = useState("")
    const {user} = useContext(AuthContext)
    const dispatch = useDispatch<AppDispatch>();
    const friends = useSelector((state:RootState) => (
        query ? state.friend.friends.filter((friend) => getOtherUserFromFriend(friend,user).username.toLowerCase().includes(query.toLowerCase())) 
        : state.friend.friends));

    const navigate = useNavigate();
    const handleFriendMessage = (friend:Friend) => {
        const friendEmail = getOtherUserFromFriend(friend,user).email;
        dispatch(findOrCreateChatThunk(friendEmail)).unwrap().then(({data}) => {
            if(data) navigate(`/chats/${data.id}`);
        });
    }
    const filterFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };
    return (
        <>
            {showFriendsModal && <FriendsModal setShowFriendsModal={setShowFriendsModal}/>}
            <LandingPageStlye>
                <LandingPageHeaderStyle>
                    Friends <LandingPageFriendAddButton onClick={() => setShowFriendsModal(!showFriendsModal)}>Add Friend</LandingPageFriendAddButton>
                </LandingPageHeaderStyle>
                <LandingPageFriendSection>
                    <LandingPageSearchInput placeholder="Search Friends" onChange={filterFriends} />
                    <h2>Friends</h2>
                    {friends && friends.length > 0 ? (
                        friends.map((friend) => (
                            <FriendContainerStyle key={friend.id}>
                                {getOtherUserFromFriend(friend,user)?.username}
                                <FriendIconContainer>
                                    <FriendIconStyle onClick={() => handleFriendMessage(friend)}>
                                        <ChatBubble strokeWidth={1} size={36}/>
                                    </FriendIconStyle>
                                    <FriendIconStyle>
                                        <MoreHorizontalFill strokeWidth={1} size={36} />
                                    </FriendIconStyle>
                                </FriendIconContainer>
                            </FriendContainerStyle>
                        ))
                    ):<>You don't have any friends yet! Add a friend now!</>}
                </LandingPageFriendSection>
            </LandingPageStlye>
        </>
    )
}
export default LandingPage