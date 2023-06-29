import { getUserPresence } from "./api";
import { ChatUserAvatarStyle, ChatUserDefaultAvatarStyle } from "./styles";
import { Chat, Friend, User,GroupChat } from "./types";

export const shortenString = (data:string,maxLength:number) => {
    if(data.length > maxLength) {
        const newString = data.substring(0,maxLength) + "...";
        return newString
    }
    return data
}
export const returnFriendDetails = (friends:Friend[],userId:number) => {
    const filteredFriends:User[] = []
    friends.filter((friend) => friend.userOne.id === userId ? filteredFriends.push(friend.userTwo) : filteredFriends.push(friend.userOne) )
    return filteredFriends
}
export const getChatRecipient = (chat:Chat,user?:User) => {
    return user?.id === chat?.creator.id ? chat?.recipient : chat?.creator;
}
export const returnGroupTitle = (groupChat?:GroupChat) => {
    let concatName = groupChat?.name?.split(/\s/).reduce((response,word) => response += word.slice(0,1).toUpperCase(),'')
    concatName = concatName?.substring(0,2);
    if(!groupChat?.name && !groupChat?.avatar) return 'G';
    return groupChat?.avatar ? groupChat?.avatar : concatName
}
export const formatGroupChatName = (MAX_LENGTH:number,groupChat?:GroupChat) => {
    if (!groupChat?.name) return groupChat?.members.map((member) => member.firstName).join(', ');
    return groupChat?.name.length > MAX_LENGTH ? groupChat.name.slice(0, MAX_LENGTH).concat('...') : groupChat.name;
}
export const getOtherUserFromFriend = (friend:Friend,user?:User) => {
    return friend?.userOne.id === user?.id ? friend?.userTwo : friend?.userOne;
}
export const hasProfilePicture = (user?:User) => {
    if(user?.profile?.avatar) return true;
    return false;
}
export const groupHasAvatar = (group?:GroupChat) => {
    if(group?.avatar) return true;
    return false;
}
export const getUserInitials = (user:User) => {
    const name = user.firstName + " " + user.lastName;
    let concatName = name.split(/\s/).reduce((response,word) => response += word.slice(0,1).toUpperCase(),'')
    return concatName?.substring(0,2);
}
export const getGroupMembers = (group?:GroupChat) => {
    if(group) return group.members.map((member) => member.firstName).join(', ');
    return "Group";
}
export const returnProfilePic = (user:User) => {
    return (
        <div>
            {hasProfilePicture(user) ? (<ChatUserAvatarStyle src={`../images/${user?.profile?.avatar}`}/>) 
            : (<ChatUserDefaultAvatarStyle>{getUserInitials(user)}</ChatUserDefaultAvatarStyle>)}
        </div>
    );
}
export const formatUserPresence = (presence:string) => {
    
    switch(presence) {
        case 'Online': return <h2>Online</h2>
        case 'Away': return <h3>Away</h3>
        case 'Offline': return <h4>Offline</h4>
    }
    
}