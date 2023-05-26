import { Chat, Friend, User } from "./types";

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