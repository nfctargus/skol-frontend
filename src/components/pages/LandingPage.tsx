import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendContainerStyle, FriendIconContainer, FriendIconStyle, LandingPageExpandableSection, LandingPageFriendAddButton, LandingPageFriendSection, LandingPageHeaderStyle, LandingPageSearchInput, LandingPageStyle } from "../../utils/styles";
import { AppDispatch, RootState } from "../../utils/store";
import { useNavigate } from "react-router-dom";
import { ChatBubble, MoreHorizontalFill } from "akar-icons";
import { User } from "../../utils/types";
import { findOrCreateChatThunk } from "../../utils/store/chats/chatThunk";
import FriendsModal from "../modals/FriendsModal";
import FriendListItemMenu from "../context-menus/FriendListItemMenu";
import { getAllFriendsPresenceThunk } from "../../utils/store/presence/presenceThunk";

const LandingPage = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [showFriendActionsMenu, setShowFriendActionsMenu] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [currentFriend,setCurrentFriend] = useState<User>();
    const [query,setQuery] = useState("")
    const dispatch = useDispatch<AppDispatch>();
    const friendPresence = useSelector((state:RootState) => query ? state.presence.presence.filter((friend) => friend.username.toLowerCase().includes(query.toLowerCase())) 
    : state.presence.presence);
    const onlineFriends = friendPresence.filter((user) => user.presence?.userPresence === "Online")
    const offlineFriends = friendPresence.filter((user) => user.presence?.userPresence === "Offline")
    const navigate = useNavigate();
    const handleFriendMessage = (email:string) => {
        dispatch(findOrCreateChatThunk(email)).unwrap().then(({data}) => {
            if(data) navigate(`/chats/${data.id}`);
        });
    }
    const filterFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };
    const handleFriendActions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,friend:User) => {
        e.preventDefault()
        setPoints({ x: e.pageX, y: e.pageY });
        setCurrentFriend(friend)
        setShowFriendActionsMenu(!showFriendActionsMenu);
    }
    useEffect(() => {
        dispatch(getAllFriendsPresenceThunk());
    },[]);
    return (
        <>
            {showFriendsModal && <FriendsModal setShowFriendsModal={setShowFriendsModal}/>}
            {showFriendActionsMenu && <FriendListItemMenu friend={currentFriend!} points={points} setShowFriendActionsMenu={setShowFriendActionsMenu}/>}
            <LandingPageStyle>
                <LandingPageHeaderStyle>
                    Friends <LandingPageFriendAddButton onClick={() => setShowFriendsModal(!showFriendsModal)}>Add Friend</LandingPageFriendAddButton>
                </LandingPageHeaderStyle>
                <LandingPageFriendSection>
                    <LandingPageSearchInput placeholder="Search Friends" onChange={filterFriends} />
                    <h2>Friends</h2>
                    {friendPresence && friendPresence.length > 0 ? (
                        <>
                            <LandingPageExpandableSection>
                                <summary>Online ({onlineFriends.length})</summary>
                                <p className="usersList">
                                    {onlineFriends && onlineFriends.length > 0 && (
                                        onlineFriends.map((friend) => (
                                            <FriendContainerStyle key={friend.id}>
                                                {friend.username}
                                                <FriendIconContainer>
                                                    <FriendIconStyle onClick={() => handleFriendMessage(friend.email)}>
                                                        <ChatBubble strokeWidth={1} size={36}/>
                                                    </FriendIconStyle>
                                                    <FriendIconStyle onClick={(e) => { handleFriendActions(e,friend) }}>
                                                        <MoreHorizontalFill strokeWidth={1} size={36} />
                                                    </FriendIconStyle>
                                                </FriendIconContainer>
                                            </FriendContainerStyle>
                                        ))
                                    )}
                                </p>
                            </LandingPageExpandableSection>
                            <LandingPageExpandableSection>
                                <summary className="offline">Offline ({offlineFriends.length})</summary>
                                <p className="usersList">
                                    {offlineFriends && offlineFriends.length > 0 && (
                                        offlineFriends.map((friend) => (
                                            <FriendContainerStyle key={friend.id}>
                                                {friend.username}
                                                <FriendIconContainer>
                                                    <FriendIconStyle onClick={() => handleFriendMessage(friend.email)}>
                                                        <ChatBubble strokeWidth={1} size={36}/>
                                                    </FriendIconStyle>
                                                    <FriendIconStyle onClick={(e) => { handleFriendActions(e,friend) }}>
                                                        <MoreHorizontalFill strokeWidth={1} size={36} />
                                                    </FriendIconStyle>
                                                </FriendIconContainer>
                                            </FriendContainerStyle>
                                        ))
                                    )}
                                </p>
                            </LandingPageExpandableSection>
                    </>
                    ): <>You don't have any friends. Such sad, wow</>}
                        
                    
                </LandingPageFriendSection>
            </LandingPageStyle>
        </>
    )
}
export default LandingPage