import { Dispatch, FC, useContext, useRef, useState } from "react";
import { ContextMenuAvatarStyle, ContextMenuButtonStyle, ContextMenuStyle, ContextMenuUploadContainer } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { AuthContext } from "../../utils/context/AuthContext";
import { GroupChatFormParams } from "../../utils/types";
import { useForm } from "react-hook-form";
import { uploadGroupProfilePicture } from "../../utils/api";
import { useContextMenuToggler } from "../../utils/hooks";
import { postNewGroupChatNameThunk } from "../../utils/store/group-chats/groupChatThunk";

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
            return uploadGroupProfilePicture(group!.id,formData)
            .then((response) => console.log(response))
            .catch((err) => console.log(err))
            .finally(() => setShowGroupActionsMenu(false));
        }
    };

    return (
        <ContextMenuStyle top={points.y} left={points.x} width={20} ref={wrapperRef}>
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
                <h2>{group?.name ? `Members of ${group?.name}` : "Group Members"}</h2>
                <div className="groupMembersContainer">
                    {group?.members.map((member) => <div className="members" key={member.id}>{member.username}</div>)}
                </div>
            </form>
        </ContextMenuStyle>
    )
}

export default EditGroupChatContextMenu