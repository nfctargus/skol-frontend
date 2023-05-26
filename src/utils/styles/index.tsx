import styled, { css,keyframes  } from 'styled-components';
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

    @media screen and (max-width:768px) {
        width: 90%;
        margin: 0.5rem 0 4rem 0;
    }
`
export const PageInnerContainer = styled.div`
    height:80vh;
    width:80vw;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#F6F6F6;
    border-radius:1rem;

    @media screen and (max-width:480px) {
        flex-direction: column;
        width:95%;
    }
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

    @media screen and (max-width:480px) {
        width:100%;
        height:25%;
        margin-bottom:auto;
        .splashImage { 
            border-radius:0;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
        }
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
    @media screen and (max-width:768px) {
        padding: 0.3rem 0.8rem;
        margin: 0.5rem 0;
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
const spinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

export const LoadingContainerStyle = styled.div`
    background-color: #f6f6f66f;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
        display: inline-block;
        width: 10rem;
        height: 10rem;
    }
    .spinner:after {
        content: " ";
        display: block;
        width: 6rem;
        height: 6rem;
        margin: 1rem;
        border-radius: 50%;
        border: 0.5rem solid #353840;
        border-color: #353840 transparent #353840 transparent;
        animation: ${spinAnimation} 1.5s linear infinite;
    }
`
export const OverlayWindowStyle = styled.div`
    height: 100%;
    width: 100%;
    background-color: #00000088;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;
export const FriendModalStyle = styled.div`
    position: relative;
    background-color: #F6F6F6;
    width: 40%;
    box-sizing: border-box;
    border-radius: 1rem;

`;
export const ModalHeader = styled.header`
    text-align:center;
    font-size:2rem;
    margin:1rem 2rem;
    display:flex;
    justify-content: space-between;
    div:hover {
        cursor:pointer;
        opacity:0.8;
    }
`
export const ModalSectionStyle = styled.div`
    background:#fff;
    padding:1rem;
    margin:1rem;
    border-radius:0.5rem;
    font-size:0.8rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap:1rem;
`
export const ModalButton = styled.button`
    width: 50%;
    outline: none;
    border: none;
    background-color: #353840;
    color: #fff;
    border-radius: 0.5rem;
    padding: 0.3rem 0;
    font-weight: 500;
    transition: 250ms background-color ease;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    &:focus {
        opacity: 0.8;
    }
`;

export const RecipientResultContainerStyle = styled.div`
	position: absolute;
	background-color: #ccc;
	right: 0;
	left: 0;
	margin: 5rem 1rem;
    border-radius: 0.5rem;
`;

export const RecipientScrollableItemContainer = styled.div`
	max-height: 11rem;
	overflow: scroll;
    scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;
export const RecipientResultItem = styled.div`
	padding: 0.6rem 1rem;
	box-sizing: border-box;
    
	&:hover {
		cursor: pointer;
		background:#ffffffaa
	}
`;
export const SelectedFriendContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    gap:0.2rem;
    border-radius:0.5rem;
    border:1px solid #ccc;
    padding:0.3rem 1rem;
    div {
        display: grid;
        place-items: center;
    }
    div:hover {
        opacity:0.8;
        cursor: pointer;
    }
`