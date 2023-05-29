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
export const returnGroupTitle = (groupChat:GroupChat) => {
    let concatName = groupChat.name?.split(/\s/).reduce((response,word)=> response+=word.slice(0,1).toUpperCase(),'')
    concatName = concatName?.substring(0,2);
    return groupChat.avatar ? groupChat.avatar : concatName
}
export const formatGroupChatName = (MAX_LENGTH:number,groupChat?:GroupChat) => {
    if (!groupChat?.name) return groupChat?.members.map((member) => member.firstName).join(', ');
    return groupChat?.name.length > MAX_LENGTH ? groupChat.name.slice(0, MAX_LENGTH).concat('...') : groupChat.name;
}