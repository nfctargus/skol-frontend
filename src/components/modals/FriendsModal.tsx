import { Dispatch, FC, createRef, useEffect, useState,  useContext } from "react";
import { AddFriendModalStyle, ModalHeader, ModalSectionStyle, OverlayWindowStyle, AddFriendFormStyle } from "../../utils/styles";
import { Cross } from "akar-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { addFriendThunk } from "../../utils/store/friends/friendThunk";
import { SocketContext } from "../../utils/context/SocketContext";
import { addFriendToPresence } from "../../utils/store/presence/presenceSlice";
import { getOtherUserFromFriend } from "../../utils/helpers";
import { AuthContext } from "../../utils/context/AuthContext";
import { toast } from 'react-toastify';

type Props = {
    setShowFriendsModal:Dispatch<React.SetStateAction<boolean>>;
}
const FriendsModal:FC<Props> = ({setShowFriendsModal}) => {
    const ref = createRef<HTMLDivElement>();
    const [emailInput,setEmailInput] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowFriendsModal(false);
        const handleEnterKeydown = (e: KeyboardEvent) => e.key === 'Enter' && handleSubmit;
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keydown', handleEnterKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keydown', handleEnterKeydown);
        }
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { current } = ref;
        if (current === e.target) setShowFriendsModal(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        dispatch(addFriendThunk(emailInput)).unwrap().then(({ data }) => {
            dispatch(addFriendToPresence(getOtherUserFromFriend(data,user)))
            socket.emit('onFriendAdded',{data})
        })
        .catch((err) => {
            if(err.message.includes('404')) {
                toast.clearWaitingQueue();
                toast("This user does not exist... at least in our database!", { type: 'error', icon: true }); 
            } else if(err.message.includes('409')) {
                toast.clearWaitingQueue();
                toast("Uhh, you're already friends with this user", { type: 'error', icon: true }); 
            } else {
                console.log(err)
            }
        })
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