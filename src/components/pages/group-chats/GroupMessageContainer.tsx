import { FC, useEffect, useState } from "react";
import { GroupMessage } from "../../../utils/types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../utils/store";
import { MessageContainerStyle } from "../../../utils/styles";
import { editGroupMessageContent, resetGroupEditingContainer, setIsEditingGroup, setSelectedGroupMessage } from "../../../utils/store/group-messages/groupMessageSlice";
import SelectedGroupMessageContextMenu from "../../context-menus/SelectedGroupMessageContextMenu";
import GroupMessageContainerItem from "./GroupMessageContainerItem";


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
        dispatch(setSelectedGroupMessage(message));
        setPoints({ x: e.pageX, y: e.pageY });
    };
    useEffect(() => {
        const handleClick = () => setShowMenu(false);
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditingGroup(false));
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown',handleKeyDown)
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown',handleKeyDown);
        }
    }, []);
    const onEditMessageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editGroupMessageContent(e.target.value));
    } 
    useEffect(() => {
        dispatch(resetGroupEditingContainer());
    },[id])
    
    return (
        <MessageContainerStyle>
            {messages && messages.map((message) => (
                <div key={JSON.stringify(message?.id)} onContextMenu={(e) => onContextMenu(e,message)}>
                    <GroupMessageContainerItem message={message} onEditMessageChange={onEditMessageChange} />
                </div>
            ))}
            {showMenu && <SelectedGroupMessageContextMenu points={points} />}
        </MessageContainerStyle>
    )
}

export default GroupMessageContainer