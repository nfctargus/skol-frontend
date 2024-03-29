import { Dispatch, FC, SetStateAction } from 'react'
import { MessageInputContainerStyle, MessageInputField } from '../../../utils/styles'
import { User } from '../../../utils/types';

type Props = {
	handleMessageSend: (e: React.FormEvent<HTMLFormElement>) => void;
	messageTo?:string;
	content:string;
	setContent:Dispatch<SetStateAction<string>>;
}

const MessageInputContainer:FC<Props> = ({handleMessageSend,messageTo,content,setContent}) => {
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	}
	return (
		<MessageInputContainerStyle onSubmit={handleMessageSend}>
			<MessageInputField value={content} onChange={handleChange} placeholder={`Send a message to ${messageTo}...`} />
		</MessageInputContainerStyle>
	)
}

export default MessageInputContainer