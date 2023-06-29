import { Dispatch, FC, useContext, useRef, useState } from "react";
import { ContextMenuAvatarStyle, ContextMenuButtonStyle, ContextMenuMembersHeaderContainer, ContextMenuStyle, ContextMenuUploadContainer } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { AuthContext } from "../../utils/context/AuthContext";
import { GroupChatFormParams } from "../../utils/types";
import { useForm } from "react-hook-form";
import { uploadGroupProfilePicture } from "../../utils/api";
import { useContextMenuToggler } from "../../utils/hooks";
import { deleteGroupChatMemberThunk, postNewGroupChatNameThunk } from "../../utils/store/group-chats/groupChatThunk";
import { Plus, TrashCan } from "akar-icons";
import { Tooltip } from "react-tooltip";
import AddGroupMembersModal from "../modals/AddGroupMembersModal";
import { SocketContext } from "../../utils/context/SocketContext";

type Props = {
    points: { x: number; y: number };
    id:number;
    setShowGroupActionsMenu:Dispatch<React.SetStateAction<boolean>>;
};

const EditGroupChatContextMenu:FC<Props> = ({ points,id,setShowGroupActionsMenu }) => {
    const wrapperRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    useContextMenuToggler(wrapperRef,setShowGroupActionsMenu);
    const {register,handleSubmit,formState: {errors}} = useForm<GroupChatFormParams>();
    const [file, setFile] = useState<File>();
    const [imgPath,setImgPath] = useState('');
    const { user } = useContext(AuthContext);
    const group = useSelector((state:RootState) => state.groupChat.groupChats.find((group) => group.id === id));
    const [groupName,setGroupName] = useState(group?.name || "");
    const [isEditing,setIsEditing] = useState(false);
    const [showAddMembersModal, setShowAddMembersModal] = useState(false);
    const socket = useContext(SocketContext);
    const editGroupName = () => {
        dispatch(postNewGroupChatNameThunk({id:group!.id,name:groupName}))
        setIsEditing(false);
        setShowGroupActionsMenu(false);
    };
    const changeGroupName = () => {
        setIsEditing(true);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length) {
            const file = files.item(0);
            if (file) {
                setImgPath(URL.createObjectURL(file));
                setFile(file);
            }
        }
    };
    const onSubmit = (data:GroupChatFormParams) => {
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            uploadGroupProfilePicture(group!.id,formData)
            .then((response) => console.log(response))
            .catch((err) => console.log(err))
            .finally(() => setShowGroupActionsMenu(false));
        }
    };
    const removeGroupMember = (userId:number) => {
        const groupId = id;
        dispatch(deleteGroupChatMemberThunk({groupId,userId}));
        socket.emit('onGroupChatMemberRemove',{groupId,userId});
    }
    const addGroupMember = () => {
        setShowAddMembersModal(!showAddMembersModal);
    }

    return (
        <ContextMenuStyle top={points.y} left={points.x} width={25} ref={wrapperRef}>
            {showAddMembersModal && <AddGroupMembersModal groupId={group!.id} setShowAddMembersModal={setShowAddMembersModal} groupChatMembers={group!.members}/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul>
                    {group?.creator?.id === user?.id && (
                        <li>
                            {file ? (
                                <ContextMenuUploadContainer>
                                    {imgPath && <ContextMenuAvatarStyle src={imgPath} alt=""/>}
                                    <ContextMenuButtonStyle>Save</ContextMenuButtonStyle>
                                </ContextMenuUploadContainer>
                            ): <label htmlFor="avatar">Change Avatar</label>}
                            <input type='file' id='avatar' {...register('avatar', {required:true,onChange: (e) => {handleFileUpload(e)}})} style={{display:'none'}}/>
                        </li>
                    )}
                    {group?.creator?.id === user?.id && !isEditing && <li onClick={changeGroupName}>Change Group Name</li>}
                    {isEditing && (
                            <>
                                <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name"/>
                                <button onClick={editGroupName}>Save</button>
                            </>
                    )}
                </ul>
                <ContextMenuMembersHeaderContainer>
                    <h2>{group?.name ? `Members of ${group?.name}` : "Group Members"}</h2>
                    {group?.creator?.id === user?.id && <div id='add-member-select' className="addIcon" onClick={addGroupMember}><Plus size={20} strokeWidth={1} /></div>}
                </ContextMenuMembersHeaderContainer>
                <div className="groupMembersContainer">
                    {group?.members.map((member) => (
                        <div className="members" key={member.id}>{member.username}
                            {group?.creator?.id === user?.id && <div className="deleteMember"><TrashCan size={20} onClick={() => removeGroupMember(member.id)}/></div>}
                        </div>
                    ))}
                </div>
            </form>
            <Tooltip anchorId="add-member-select" place="bottom" content="Add members to this group" />
        </ContextMenuStyle>
    )
}

export default EditGroupChatContextMenu