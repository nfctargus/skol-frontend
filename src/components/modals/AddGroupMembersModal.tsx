import React, { Dispatch, FC, createRef, useContext, useEffect, useState } from 'react'
import { CreateChatForm, ModalHeader, CreateChatModalStyle, OverlayWindowStyleRelative, SelectedFriendContainerStyle , FriendSelectionContainerStyle, FriendSelectionInfoStyle, FriendSelectionInputContainer, LandingPageFriendAddButton } from '../../utils/styles';
import { Cross } from 'akar-icons';
import {  User } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { AuthContext } from '../../utils/context/AuthContext';
import { addGroupChatMemberThunk } from '../../utils/store/group-chats/groupChatThunk';
import { getFriends } from '../../utils/store/friends/friendSlice';
import { SocketContext } from '../../utils/context/SocketContext';

type Props = {
    setShowAddMembersModal:Dispatch<React.SetStateAction<boolean>>;
    groupChatMembers:User[];
    groupId:number;
};

const AddGroupMembersModal:FC<Props> = ({setShowAddMembersModal,groupChatMembers,groupId}) => {
    const [query,setQuery] = useState("")
    const dispatch = useDispatch<AppDispatch>();
    const ref = createRef<HTMLDivElement>();
    const [selectedRecipients,setSelectedRecipients] = useState<User[]>([]);
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const friends = useSelector((state:RootState) => getFriends(state,user!.id));
    const friendsNotInGroup = friends.filter((friend) => {
        return !groupChatMembers.find((member) => {
            return friend.id === member.id
        })
    })
    var filteredFriends = friendsNotInGroup.reduce<User[]>(function(filtered, friend) {
        groupChatMembers.filter((gcm) => gcm.id !== friend.id)
        if (friend.username.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(friend);
        }
        return filtered;
    }, []);
    
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowAddMembersModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) setShowAddMembersModal(false);
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
        const users = selectedRecipients.map((recipient) => recipient.id);

        if(users.length < 1) return;
		try {	
            dispatch(addGroupChatMemberThunk({groupId,users}))
            .unwrap().then(({ data }) => {
                socket.emit('onGroupChatMemberAdd',{groupId})
                setShowAddMembersModal(false);
            }).catch((err) => console.log(err));
            
		} catch (err) {
           console.log(err)
		}
        setSelectedRecipients([]);
	};
    
    return (
        <OverlayWindowStyleRelative ref={ref} onClick={handleOverlayClick}>
            <CreateChatModalStyle>
                <ModalHeader>Select Friends<div onClick={() => setShowAddMembersModal(false)}><Cross size={30}/></div></ModalHeader>
                <h2>Select 1 or more friends to add to this group.</h2>
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
                    <LandingPageFriendAddButton>Add</LandingPageFriendAddButton>
                </CreateChatForm>
            </CreateChatModalStyle>
        </OverlayWindowStyleRelative>
    )
}
export default AddGroupMembersModal