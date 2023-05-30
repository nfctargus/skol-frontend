import { Dispatch, FC, createRef, useEffect, useState } from "react";
import { AddFriendModalStyle, ModalHeader, ModalSectionStyle, OverlayWindowStyle, AddFriendFormStyle } from "../../utils/styles";
import { Cross } from "akar-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { addFriendThunk } from "../../utils/store/friends/friendThunk";

type Props = {
    setShowFriendsModal:Dispatch<React.SetStateAction<boolean>>;
}
const FriendsModal:FC<Props> = ({setShowFriendsModal}) => {
    const ref = createRef<HTMLDivElement>();
    const [emailInput,setEmailInput] = useState('');
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        dispatch(addFriendThunk(emailInput))
        .catch((err) => console.log(err.data.message))
        .finally(() => {
            setEmailInput("");
            setShowFriendsModal(false);
        })  
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    }
    
    return (
        <OverlayWindowStyle ref={ref} onClick={handleOverlayClick}>
            <AddFriendModalStyle>
                <ModalHeader>Add Friend<div onClick={() => setShowFriendsModal(false)}><Cross size={30}/></div></ModalHeader>
                <h2>You can add a friend by their email address.</h2>
                <ModalSectionStyle>
                    <AddFriendFormStyle onSubmit={handleSubmit} >
                        <input id="friendAdd" value={emailInput} onChange={handleChange} placeholder="example@domain.com"/>
                        <button>Add Friend</button>
                    </AddFriendFormStyle>
                </ModalSectionStyle>
            </AddFriendModalStyle>
        </OverlayWindowStyle>
    )
}
export default FriendsModal