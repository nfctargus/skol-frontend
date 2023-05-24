import styled, { css } from 'styled-components';
import { ContextMenuProps, PageProps } from './styleTypes';


export const Page = styled.div<PageProps>`
    background-color: #E2EDF9;
    height: 100%;
    display: ${(props) => props.display};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
`;
export const FormContainerStyle = styled.form`
    width: 50%;
    margin: 0 2rem;
`
export const PageInnerContainer = styled.div`
    height:80vh;
    width:80vw;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#F6F6F6;
    border-radius:1rem;
`
export const LoginPageImageContainer = styled.div`
    height:100%;
    
    margin-right: auto;
    width:50%;

    .splashImage {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        object-fit: cover;
        width: 100%;
        height:100%;
        
    }
`
export const NavSideBarStyle = styled.div`
	height: 100%;
	background-color: #353840;
    color:#fff;
	display: flex;
	flex: 0 0 5rem;
	align-items: center;
	flex-direction: column;
    
`;
export const AppPageStyle = styled.div`
	height: 100%;
	display: flex;
`;
export const CurrentUserAvatarStyle = styled.img`
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    aspect-ratio:1/1;
    border-radius: 50%;
    padding:0.5rem;
`;
export const SideBarDivider = styled.hr`
    width: 80%;
	background-color: #84848432;
	height: 0.1rem;
	border: none;
`
export const ChatSideBarStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 15vw;
	background-color: #fff;
`;
export const ActiveChatPageStyle = styled.div`
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:row;
`;
export const MessagePanelStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #F6F6F6;
`;
export const MessageContainerStyle = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 2rem;
    gap:1rem;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
export const ReceivedMessageContainerStyle = styled.div`
    padding:1rem;
    box-sizing: border-box;
    display: flex;
    max-width:80%;
    border:1px solid #E2EDF9;
    background:#E2EDF9;
    border-top-right-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
`;
export const SentMessageContainerStyle = styled.div`
    padding:1rem;
    box-sizing: border-box;
    display: flex;
    max-width:80%;
    margin-left:auto;
    justify-content: end;
    padding:1rem;
    border:1px solid #0000002e;
    background:#fff;
    border-top-left-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
`;
export const MessageWrapperStyle = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
    img {
        max-height:2.5rem;
        aspect-ratio:1/1;
        border-radius: 50%;
    }
`;
export const MessageInputContainerStyle = styled.div`
    box-sizing: border-box;
    border-radius: 1rem;
    width: 100%;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const MessageInputField = styled.input`
    width: 100%;
    resize: none;
    background:inherit;
    border-radius:0.5rem;
    padding:1rem 1rem;
    border:1px solid #a4a4a475;
    box-sizing: border-box;
    outline:none;
    &:focus {
        outline:0.1rem solid #353840;   
    }
`;
export const CurrentChatInfoPageStyle = styled.div`
    width:20vw;
    transition:all 0.3s ease;
    background-color: #353840;
    color:#fff;
`
export const CurrentChatInfoPageOptions = styled.ul`
    list-style: none;
    font-size:1rem;
    padding:2rem;
    margin:0;
    li {
        display:flex;
        gap:1rem;
        align-items:center;
        padding:1rem;
        border-bottom: 1px solid #ffffff41;
    }
`
export const MessagePanelHeaderStyle = styled.div`
    width:100%;
    height:7vh;
    border-bottom: 1px solid #a4a4a475;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:0 2rem;
`
export const MessagePanelUserInfoStyle = styled.div`
    width:90%;
    height:100%;
    display: flex;
    align-items: center;

`
export const MessagePanelUserActionsStyle = styled.div`
    width:10%;
    display: flex;
    flex-direction: row;
    gap:1rem;
`
export const ChatSideBarHeaderStyle = styled.div`
    width:100%;
    height:7vh;
    border-bottom: 1px solid #a4a4a475;  
    font-size:1.9rem;
    display:flex;
    padding: 0 1rem;
    align-items:center;
    text-align: start;
    box-sizing: border-box;
`
export const SideBarSearchInput = styled.input`
    width:100%;
    border-radius:0.5rem;
    padding:0.7rem 1rem;
    border:1px solid #a4a4a475;
    box-sizing: border-box;
    outline:none;
    &:focus {
        outline:0.1rem solid #353840;   
    }
`
export const ChatSideBarItemContainer = styled.div`
    width:100%;
    padding:0rem 0.5rem;
    border:1px solid #a4a4a475;
    border-radius:1rem;
    box-sizing: border-box;
    margin:0.5rem 0;
    display:flex;
    gap:1rem;
    align-items:center;
`
export const ChatSideBarItemStyle = styled.div`
    display:flex;
    width:100%;
    height:100%;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    
    h1 {
        font-size:0.9rem;
        font-weight:500;
    }
    h2 {
        font-size:0.6rem;
        font-weight:400;
    }
`
export const ChatUserAvatarStyle = styled.img`
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    aspect-ratio:1/1;
    border-radius: 50%;
    padding:0.5rem;
`;
export const ContextMenuStyle = styled.div<ContextMenuProps>`
    border-radius: 1rem;
    box-sizing: border-box;
    position: fixed;
    width: 20rem;
    padding:1rem;
    background-color: #fff;
    border:1px solid #a4a4a475;
    ${(props) => css`
        top: ${props.top}px;
        left: ${props.left}px;
    `}
    ul {
        list-style-type: none;
        margin: 0;
        padding: 10px;
    }
    ul li {
        padding: 14px 16px;
        border-radius: 8px;
    }
    ul li:hover {
        cursor: pointer;
        background-color: #F6F6F6;
    }
    .chatProfileContainer {
        img {
            aspect-ratio:1/1;
            max-height:2.5rem;
            border-radius:50%;
        }   
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        padding:0 1rem;
        
    }
    
`;
export const InputContainerStyle = styled.div`
    background-color: #F6F6F6;
    border:0.1rem solid #ccc;
    padding: 0.7rem 0.8rem;
    border-radius: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    margin: 1rem 0;
    &:focus-within {
        border:0.1rem solid #353840;
    }
`;
export const InputLabel = styled.label`
    display: block;
    color: #8f8f8f;
    font-weight:500;
    font-size: 1rem;
    margin: 0.2rem 0;
`;
export const InputField = styled.input`
    font-family: 'Inter';
    outline: none;
    border: none;
    background-color: inherit;
    font-size: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0.3rem 0;
`;

export const Button = styled.button`
    width: 100%;
    outline: none;
    border: none;
    font-family: 'Inter';
    font-size: 1.2rem;
    background-color: #353840;
    color: #fff;
    border-radius: 0.5rem;
    padding: 2rem 0;
    font-weight: 500;
    transition: 250ms background-color ease;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    &:active {
        opacity: 0.8;
    }
    &:focus {
        opacity: 0.8;
    }
`;
