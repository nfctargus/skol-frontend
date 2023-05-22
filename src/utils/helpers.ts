export const shortenString = (data:string,maxLength:number) => {
    if(data.length > maxLength) {
        const newString = data.substring(0,maxLength) + "...";
        return newString
    }
    return data
}