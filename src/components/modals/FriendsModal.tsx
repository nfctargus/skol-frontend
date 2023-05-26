import { Dispatch, FC, createRef, useContext, useEffect, useState } from "react";
import { ModalButton, ModalStyle, MessageInputField, ModalHeader, ModalSectionStyle, OverlayWindowStyle, InputLabel, SelectedFriendContainer } from "../../utils/styles";
import { Cross } from "akar-icons";
import styles from './index.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { AuthContext } from "../../utils/context/AuthContext";
import { returnFriendDetails } from "../../utils/helpers";
import FriendListItem from "../pages/partials/FriendListItem";
import { User } from "../../utils/types";
import { RecipientResultContainer } from "../pages/partials/FriendSearchResultContainer";
import { searchUsers } from "../../utils/api";
import { addFriendThunk } from "../../utils/store/friends/friendThunk";

type Props = {
    setShowFriendsModal:Dispatch<React.SetStateAction<boolean>>;
}
const FriendsModal:FC<Props> = ({setShowFriendsModal}) => {
    const ref = createRef<HTMLDivElement>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userResults, setUserResults] = useState<User[]>([]);
    const {user} = useContext(AuthContext)
    const friends = useSelector((state:RootState) => state.friend.friends);
    const myFriends = returnFriendDetails(friends,user!.id);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowFriendsModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) setShowFriendsModal(false);
    };
    const handleUserSelect = (user: User) => {
		setSelectedUser(user);
		setUserResults([]);
	};
    const handleFriendSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value) searchUsers(e.target.value)
        .then(({ data }) => {
            setUserResults(data);
        })
        else setUserResults([])
    }
    const addFriend = () => { if(selectedUser) {
        dispatch(addFriendThunk(selectedUser.id))
        .catch((err) => console.log(err.data.message))
        .finally(() => {
            setSelectedUser(undefined);
            setUserResults([]);
        })  
    }}
    
    return (
        <OverlayWindowStyle ref={ref} onClick={handleOverlayClick}>
            <ModalStyle>
                <ModalHeader>Friends<div onClick={() => setShowFriendsModal(false)}><Cross size={30}/></div></ModalHeader>
                {!selectedUser && (
				    <RecipientResultContainer userResults={userResults} handleUserSelect={handleUserSelect}  />
			    )}
                <ModalSectionStyle>
                    {!selectedUser && <InputLabel htmlFor="friendAdd">Add a friend</InputLabel>}
                    {selectedUser ? 
                    <div className={styles.selectedFriendWrapper}>
                        <SelectedFriendContainer>
                            {selectedUser.email}
                            <div onClick={() => setSelectedUser(undefined)}><Cross size={12}/></div> 
                        </SelectedFriendContainer>
                        <ModalButton onClick={addFriend}>Send</ModalButton>
                    </div> : <MessageInputField id="friendAdd" onChange={handleFriendSearchInput}/>}
                </ModalSectionStyle>
                {myFriends && myFriends.map((friend) => (<FriendListItem key={friend.id} friend={friend} />))}
            </ModalStyle>
        </OverlayWindowStyle>
    )
}
export default FriendsModal