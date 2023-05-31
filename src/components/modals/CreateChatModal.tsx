import React, { Dispatch, FC, createRef, useContext, useEffect, useState } from 'react'
import { CreateChatForm, ModalHeader, CreateChatModalStyle, OverlayWindowStyle, SelectedFriendContainerStyle , FriendSelectionContainerStyle, FriendSelectionInfoStyle, FriendSelectionInputContainer, LandingPageFriendAddButton } from '../../utils/styles';
import { Cross } from 'akar-icons';
import {  User } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { postNewChatThunk } from '../../utils/store/chats/chatThunk';
import { getOtherUserFromFriend } from '../../utils/helpers';
import { AuthContext } from '../../utils/context/AuthContext';
import { postNewGroupChatThunk } from '../../utils/store/group-chats/groupChatThunk';

type Props = {
    setShowCreateChatModal:Dispatch<React.SetStateAction<boolean>>;
};

const CreateChatModal:FC<Props> = ({setShowCreateChatModal}) => {
    const navigate = useNavigate();
    const [query,setQuery] = useState("")
   
    const dispatch = useDispatch<AppDispatch>();
    const ref = createRef<HTMLDivElement>();
    const [selectedRecipients,setSelectedRecipients] = useState<User[]>([]);
    const { user } = useContext(AuthContext);
    const friends = useSelector((state:RootState) => state.friend.friends.map((friend) => getOtherUserFromFriend(friend,user)) );
    var filteredFriends = friends.reduce<User[]>(function(filtered, friend) {
        if (friend.username.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(friend);
        }
        return filtered;
    }, []);
    
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowCreateChatModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) setShowCreateChatModal(false);
    };
    const addOrRemoveRecipient = (user:User) => {
        const exists = selectedRecipients.find((u) => u.id === user.id);
        if(!exists) {
            setSelectedRecipients((prev) => [...prev,user]);
        }
        else {
            setSelectedRecipients((prev) => prev.filter((u) => u.id !== user.id));    
        }
        setQuery("");
    };
    const filterFriends = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {   
        e.preventDefault();
        const members = selectedRecipients.map((recipient) => recipient.email);
		try {	
            if(selectedRecipients.length > 1) {
                dispatch(postNewGroupChatThunk({members}))
                .unwrap().then(({ data }) => {
                    setShowCreateChatModal(false);
                    navigate(`/groups/${data.id}`);
                }).catch((err) => console.log(err));
            } else {
                dispatch(postNewChatThunk({email:members[0]}))
                .unwrap().then(({ data }) => {
                    setShowCreateChatModal(false);
                    navigate(`/chats/${data.id}`);
                }).catch((err) => console.log(err));
            } 
		} catch (err) {
           console.log(err)
		}
        setSelectedRecipients([]);
	};
    
    return (
        <OverlayWindowStyle ref={ref} onClick={handleOverlayClick}>
            <CreateChatModalStyle>
                <ModalHeader>Select Friends<div onClick={() => setShowCreateChatModal(false)}><Cross size={30}/></div></ModalHeader>
                <h2>Select 1 or more friends to start chatting to.</h2>
                <CreateChatForm onSubmit={onSubmit}>
                    <FriendSelectionInputContainer>
                        {selectedRecipients && selectedRecipients.map((recipient) => (
                            <SelectedFriendContainerStyle key={recipient.id}>{recipient.username}<div onClick={() => addOrRemoveRecipient(recipient)}><Cross size={12}/></div></SelectedFriendContainerStyle>
                        ))}
                        <input placeholder='Search friends' onChange={(filterFriends)} value={query}/>
                    </FriendSelectionInputContainer>
                    {filteredFriends && filteredFriends.map((friend) => (
                        <FriendSelectionContainerStyle onClick={() => addOrRemoveRecipient(friend)} key={friend.id}>
                            <FriendSelectionInfoStyle>
                                <div>{friend.username}</div>
                                <div>{friend.email}</div>
                            </FriendSelectionInfoStyle>
                        </FriendSelectionContainerStyle>
                    ))}
                    <LandingPageFriendAddButton>{selectedRecipients && selectedRecipients.length > 1 ? "Create Group Chat" : "Create Private Chat"}</LandingPageFriendAddButton>
                </CreateChatForm>
            </CreateChatModalStyle>
        </OverlayWindowStyle>
    )
}
export default CreateChatModal