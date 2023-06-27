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
    h1 {
        font-size:1.1rem;
        text-align: center;
        margin:1rem;
        font-weight:500;
    }
`;
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
`;
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
`;
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
    &:hover {
        cursor: pointer;
    }
`;
export const SideBarDivider = styled.hr`
    width: 80%;
	background-color: #84848432;
	height: 0.1rem;
	border: none;
`;
export const ChatSideBarStyle = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 20vw;
    min-width:15rem;
	background-color: #fff;
    border-right: 1px solid #a4a4a475;  
`;
export const ChatSideBarHeaderStyle = styled.div`
    width:100%;
    height:7vh;
    min-height:3.4rem;
    border-bottom: 1px solid #a4a4a475;  
    font-size:1.9rem;
    display:flex;
    padding: 0 1rem;
    align-items:center;
    text-align: start;
    box-sizing: border-box;
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
    padding: 0 1rem;
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
    font-size:0.9rem;
    padding:1rem;
    box-sizing: border-box;
    display: flex;
    width:fit-content;
    max-width:80%;
    border:1px solid #E2EDF9;
    background:#E2EDF9;
    border-top-right-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
`;
export const SentMessageContainerStyle = styled.div`
    font-size:0.9rem;
    padding:1rem;
    box-sizing: border-box;
    display: flex;
    width:fit-content;
    max-width:80%;
    border:1px solid #0000002e;
    background:#fff;
    border-top-right-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
        /* margin-left:auto;
    justify-content: end; 
    border-top-left-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
    */
`;
export const MessageWrapperStyle = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
    img {
        max-height:3rem;
        aspect-ratio:1/1;
        border-radius: 50%;
    }
`;
export const MessageInputContainerStyle = styled.form`
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
`;
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
`;
export const MessagePanelHeaderStyle = styled.div`
    height:7vh;
    min-height:3.4rem;
    border-bottom: 1px solid #a4a4a475;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:0.2rem 2rem;
    box-sizing: border-box;
    gap:0.5rem;
`;
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
`;
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
`;
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
`;
export const ChatUserAvatarStyle = styled.img`
    max-width:100%;
    max-height:100%;
    border-radius: 50%;
    aspect-ratio:1/1;
    object-fit:cover;
    box-sizing: border-box;
`;
export const ChatUserAvatarContainer = styled.div`
    height:3rem;
    width:3rem;
    display:grid;
    place-items:center;
    box-sizing: border-box;
    
`
export const ChatUserDefaultAvatarStyle = styled.div`
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;
    display:grid;
    place-items:center;
    background:#4183c9;
    color:#fff;
    border-radius: 50%;
`;
export const ContextMenuStyle = styled.div<ContextMenuProps>`
    border-radius: 1rem;
    box-sizing: border-box;
    position: fixed;

    background-color: #fff;
    border:1px solid #a4a4a475;
    ${(props) => css`
        top: ${props.top}px;
        left: ${props.left}px;
        width:${props.width}rem;
    `}
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0.5rem;
    }
    ul li {
        padding: 14px 16px;
        border-radius: 8px;
    }
    ul li:hover {
        cursor: pointer;
        background-color: #F6F6F6;
    }
    h2 {
        padding: 0.2rem 1rem;
    }
    .groupMembersContainer {
        display:flex;
        flex-direction:column;
        gap:0.3rem;
        padding:0.5rem;
    }
    .members {
        background: #ccc;
        box-sizing:border-box;
        padding:0.6rem 0.5rem;
        border-radius:0.2rem;
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
    outline: none;
    border: none;
    background-color: inherit;
    font-size: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0.3rem 0;
`;
export const InputTextArea = styled.textarea`
    font-family:'Inter';
    outline: none;
    border: none;
    background-color: inherit;
    font-size: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0.3rem 0;
    resize:none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
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
`;
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
`;
export const OverlayWindowStyle = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;
export const CreateChatModalStyle = styled.div`
    position: relative;
    background-color: #F6F6F6;
    box-shadow: 1px 1px 10px 1px #888888;
    width: 35vw;
    box-sizing: border-box;
    border-radius: 1rem;

    h2 {
        padding:0 2rem;
    }
`;
export const AddFriendModalStyle = styled.div`
    position: relative;
    margin-bottom:auto;
    margin-top:6vh;
    margin-right:10vw;
    background-color: #F6F6F6;
    box-shadow: 1px 1px 10px 1px #888888;
    width: 35vw;
    box-sizing: border-box;
    border-radius: 1rem;

    h2 {
        padding:0 2rem;
    }
`;

export const AddFriendFormStyle = styled.form`
    width:100%;  
    display:flex;
    gap:0.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background:#ccc;
    border-radius:0.3rem;
    padding: 0.5rem;
    button {
        border-radius:0.3rem;
        padding:0.8rem 2rem;
        
        font-size:1.1rem;
        background:#4183c9;
        color:#fff;
        font-weight:500;
        font-family:Inter;
        border:none;
        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
    input {
        width:65%;
        padding: 1rem;
        border-radius:0.3rem;
        border:none;
        outline:none;
        background:inherit;
        font-family: Inter;
        font-size:1.1rem;
    }
`;
export const ModalHeader = styled.header`
    text-align:center;
    text-transform: uppercase;
    font-size:1.6rem;
    font-weight:500;

    margin:1rem 2rem;
    display:flex;
    justify-content: space-between;
    div:hover {
        cursor:pointer;
        opacity:0.8;
    }
`;
export const ModalSectionStyle = styled.div`
    padding:1rem;
    margin:1rem;
    border-radius:0.5rem;
    font-size:0.8rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap:1rem;
`;
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
export const CreateChatForm = styled.form`
    padding:1rem;

    button {
        display:flex;
        align-items: center;
        justify-content: center;
        width:100%;
        margin-top:1rem;
    }
`;
export const FriendSelectionContainerStyle = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 0.5rem;
    border-radius:0.3rem;
    &:hover {
        background:#ccc;
    }
`;
export const FriendSelectionInfoStyle = styled.section`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap:1rem;
    font-size:1.2rem;
    user-select: none;
    padding: 0.5rem 0;
    div:last-child {
        font-size:0.9rem;
        font-weight:300;
        color:#7a7a7a;
    } 
`;
export const FriendSelectionInputContainer = styled.div`
    background:#ccc;
    height:fit-content;
    max-width:100%;
    display:flex;
    gap:0.4rem;
    padding: 0.2rem;
    border-radius:0.2rem;
    box-sizing: border-box;
    overflow-wrap:break-word;
    overflow:hidden scroll;
    scrollbar-width:none;
    flex:1 1 auto;
    flex-wrap: wrap;
    margin-bottom:1rem;
    input {
        background:none;
        border:none;
        outline:none;
        width:8rem;
        padding: 0.5rem 0.2rem;
    }
`;
export const SelectedFriendContainerStyle = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    gap:0.2rem;
    border-radius:0.2rem;
    background:#5f5f5f;
    color:#fff;
    font-size:0.9rem;
    padding:0.5rem 0.4rem;

    div {
        display: grid;
        place-items: center;
    }
    div:hover {
        opacity:0.8;
        cursor: pointer;
    }
`;
export const EditMessageInputField = styled.input`
    padding:0.9rem;
    background-color: #fff;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-size: 0.9rem;
    font-family:Inter;
    border:1px solid #0000002e;
    width: 100%;
    border-top-right-radius:0.5rem;
    border-bottom-left-radius:0.5rem;
    border-bottom-right-radius:0.5rem;
    resize: none;
`;
export const EditMessageActionsContainer = styled.div`
    padding:0;
    color:#6d6d6d;
    margin: 0.1rem 0 0.2rem 0.1rem;
    font-size:0.8rem;
    
    small,button {
        color:#3f74c5;
        text-decoration:underline;
        font-weight:600;
        cursor:pointer;
        font-size:0.8rem;
    }
    button {
        border:none;
        outline:none;
        background:transparent;
        margin:0;
        padding:0;
    }
`;
export const LandingPageStlye = styled.div`

    width:100%;
`;
export const LandingPageHeaderStyle = styled.div`
    width:100%;
    height:7vh;
    border-bottom: 1px solid #a4a4a475;  
    font-size:1.9rem;
    display:flex;
    padding: 0 1rem;
    align-items:center;
    padding:0 1.5rem;
    gap:4rem;
    box-sizing: border-box;
`;
export const LandingPageFriendAddButton = styled.button`
    background:#4183c9;
    color:#fff;
    font-size:1rem;
    font-weight:500;
    font-family: Inter;
    border:none;
    outline:none;
    padding: 1rem 2rem;
    border-radius:0.2rem;
    &:hover {
        cursor: pointer;
        opacity:0.8;
    }
`;
export const LandingPageSearchInput = styled.input`
    width:100%;
    padding: 1rem 2rem;
    box-sizing: border-box;
    border-radius:0.5rem;
    border:none;
    background:#cacaca;
    font-weight:500;
    font-size:1.1rem;
    font-family: Inter;
    &:focus {
        outline:1px solid #adadad;
    }
`
export const LandingPageFriendSection = styled.div`
    padding:1rem;
    gap:1rem;
    display:flex;
    flex-direction: column;
    h2 {
        padding:1rem;
        font-size:0.9rem;
        text-transform: uppercase;
    }
`;
export const FriendContainerStyle = styled.div`
    width:100%;
    box-sizing: border-box;
    padding:1rem 2rem;
    border-radius:0.5rem;
    border:1px solid #ccc;
    display:flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background:#e0e0e0;
        transition:all 0.1s;
    }
`;
export const FriendIconStyle = styled.div`
    border-radius: 50%;
    background:#cacaca;
    width:2.5rem;
    height:2.5rem;
    padding: 0.4rem;
    display: grid;
    place-items: center;
    &:hover {
        cursor: pointer;
        color:#f3f3f3;
        transition:all 0.1s;
    }
`;
export const FriendIconContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
    gap:0.5rem;
`;
export const OnboardingFormPageStyle = styled.div`
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items:center
`;
export const OnboardingFormImageSection = styled.section`
    margin-bottom:10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width:100%;
    align-items:center;
    gap:20px;
`;
export const OnboardingFormImage = styled.div`
    width:10rem;
    height:10rem;
    border-radius:0.2rem;
    background:#ccc;
    display:flex;
    justify-content:center;
    align-items:center;
    box-sizing: border-box;
    div {
 
        display: grid;
        place-items:center;
        border-radius:50%;
        background:#4183c9;
        width:80%;
        height:80%;
        color:#fff;
    }
    img {
        width:100%;
        height:100%;
        object-fit:contain;
        border-radius:50%;
    }
`;
export const OnboardingFormUploadLabel = styled.label`
    display: block;
    background:#989898;
    font-size:18px;
    font-weight:600;
    border:none;
    padding:15px;
    border-radius:10px;
    cursor: pointer;
`;