import { FC, useEffect, useState } from "react";
import { GroupMessage } from "../../../utils/types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../utils/store";
import { MessageContainerStyle } from "../../../utils/styles";
import { MessageContainerItem } from "../messages/MessageContainerItem";
import { editMessageContent, resetEditingContainer, setIsEditing, setSelectedMessage } from "../../../utils/store/group-messages/groupMessageSlice";
import SelectedGroupMessageContextMenu from "../../context-menus/SelectedGroupMessageContextMenu";

type Props = {
    messages?:GroupMessage[];
}
const GroupMessageContainer:FC<Props> = ({messages}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();
    const [points, setPoints] = useState({ x: 0, y: 0 });

    const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,message:GroupMessage) => {
        e.preventDefault();
        setShowMenu(true);
        dispatch(setSelectedMessage(message));
        setPoints({ x: e.pageX, y: e.pageY });
    };
    useEffect(() => {
        const handleClick = () => setShowMenu(false);
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false));
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown',handleKeyDown)
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown',handleKeyDown);
        }
    }, []);
    const onEditMessageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editMessageContent(e.target.value));
    } 
    useEffect(() => {
        dispatch(resetEditingContainer());
    },[id])
    
    return (
        <MessageContainerStyle>
            {messages && messages.map((message) => (
                <div key={JSON.stringify(message?.id)} onContextMenu={(e) => onContextMenu(e,message)}>
                    <MessageContainerItem message={message} onEditMessageChange={onEditMessageChange} />
                </div>
            ))}
            {showMenu && <SelectedGroupMessageContextMenu points={points} />}
        </MessageContainerStyle>
    )
}

export default GroupMessageContainer