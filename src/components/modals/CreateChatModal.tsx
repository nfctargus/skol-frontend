import React, { Dispatch, FC, createRef, useContext, useEffect, useState } from 'react'
import { Button, CreateChatForm, InputContainerStyle, InputField, InputLabel, InputTextArea, ModalHeader, CreateChatModalStyle, OverlayWindowStyle, SelectedFriendContainer as SelectedUserContainer, FriendSelectionContainerStyle } from '../../utils/styles';
import { Cross } from 'akar-icons';
import { RecipientResultContainer } from '../pages/partials/FriendSearchResultContainer';
import { CreateChatParams, User } from '../../utils/types';
import { searchUsers } from '../../utils/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { postNewChatThunk } from '../../utils/store/chats/chatThunk';
import { getOtherUserFromFriend } from '../../utils/helpers';
import { AuthContext } from '../../utils/context/AuthContext';
import styles from './index.module.scss';

type Props = {
    setShowCreateChatModal:Dispatch<React.SetStateAction<boolean>>;
}

const CreateChatModal:FC<Props> = ({setShowCreateChatModal}) => {
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const ref = createRef<HTMLDivElement>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userResults, setUserResults] = useState<User[]>([]);
    const { user } = useContext(AuthContext);
    const friends = useSelector((state:RootState) => state.friend.friends.map((friend) => getOtherUserFromFriend(friend,user)) );

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowCreateChatModal(false);
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) setShowCreateChatModal(false);
    };
    const handleUserSelect = (user: User) => {
		setSelectedUser(user);
		setUserResults([]);
	};
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value) searchUsers(e.target.value)
        .then(({ data }) => {
            setUserResults(data);
        })
        else setUserResults([])
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {   
        e.preventDefault();
        const {email} = selectedUser!;
		try {	
            dispatch(postNewChatThunk({email,message}))
            .unwrap().then(({ data }) => {
                setShowCreateChatModal(false);
                navigate(`/chats/${data.id}`);
            }).catch((err) => console.log(err));
            
		} catch (err) {
           console.log(err)
		}
	};
    
    return (
        <OverlayWindowStyle ref={ref} onClick={handleOverlayClick}>
            <CreateChatModalStyle>
                <ModalHeader>Select Friends<div onClick={() => setShowCreateChatModal(false)}><Cross size={30}/></div></ModalHeader>
                <h2>Select 1 or more friends to start chatting to.</h2>
                <CreateChatForm onSubmit={onSubmit}>
                    {friends && friends.map((friend) => (
                        <FriendSelectionContainerStyle>
                            <section>
                                <div>{friend.username}</div>
                                <div>{friend.email}</div>
                            </section>
                            <label className={styles.container}>
                                <input type="checkbox"/>
                                <span className={styles.checkmark}/>
                            </label>
                        </FriendSelectionContainerStyle>
                    ))}
                </CreateChatForm>
               {/*  <CreateChatForm onSubmit={onSubmit}>
                    {!selectedUser && (
                        <RecipientResultContainer userResults={userResults} handleUserSelect={handleUserSelect}  />
                    )}
                    {selectedUser ? (
                        <SelectedUserContainer>
                            {selectedUser.email}
                            <div onClick={() => setSelectedUser(undefined)}><Cross size={12}/></div> 
                        </SelectedUserContainer>
                    ) : (
                        <InputContainerStyle>
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <InputField id='email' onChange={handleChange}/>
                        </InputContainerStyle>
                    )}
                    <InputContainerStyle>
                        <InputLabel htmlFor='message'>Message</InputLabel>
                        <InputTextArea id='message' value={message} onChange={(e) => setMessage(e.target.value)} />
                    </InputContainerStyle>
                    <Button>Send</Button>
                </CreateChatForm> */}
            </CreateChatModalStyle>
        </OverlayWindowStyle>
    )
}
export default CreateChatModal