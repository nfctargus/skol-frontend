import React, { Dispatch, FC, createRef, useEffect, useState } from 'react'
import { Button, CreateChatForm, InputContainerStyle, InputField, InputLabel, InputTextArea, ModalHeader, ModalStyle, OverlayWindowStyle, SelectedFriendContainer as SelectedUserContainer } from '../../utils/styles';
import { Cross } from 'akar-icons';
import { RecipientResultContainer } from '../pages/partials/FriendSearchResultContainer';
import { CreateChatParams, User } from '../../utils/types';
import { searchUsers } from '../../utils/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Props = {
    setShowCreateChatModal:Dispatch<React.SetStateAction<boolean>>;
}

const CreateChatModal:FC<Props> = ({setShowCreateChatModal}) => {
    const {handleSubmit,formState: { errors }} = useForm<CreateChatParams>();
    const navigate = useNavigate();
    const ref = createRef<HTMLDivElement>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userResults, setUserResults] = useState<User[]>([]);
    
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
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value) searchUsers(e.target.value)
        .then(({ data }) => {
            setUserResults(data);
        })
        else setUserResults([])
    };
    const onSubmit = async (data: CreateChatParams) => {   
		try {
            //await postRegisterUser(data);
			//navigate('/chats/');

		} catch (err) {
           console.log(err)
		}
	};
    
    return (
        <OverlayWindowStyle ref={ref} onClick={handleOverlayClick}>
            <ModalStyle>
                <ModalHeader>Create a new Chat<div onClick={() => setShowCreateChatModal(false)}><Cross size={30}/></div></ModalHeader>
                <CreateChatForm onSubmit={handleSubmit(onSubmit)}>
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
                            <InputField id='email' onChange={handleSearchInputChange}/>
                        </InputContainerStyle>
                    )}
                    <InputContainerStyle>
                        <InputLabel htmlFor='message'>Message</InputLabel>
                        <InputTextArea id='message' />
                    </InputContainerStyle>
                    <Button>Send</Button>
                </CreateChatForm>
            </ModalStyle>
        </OverlayWindowStyle>
    )
}
export default CreateChatModal