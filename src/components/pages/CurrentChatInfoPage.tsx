import { useParams } from 'react-router-dom';
import { ChatUserAvatarStyle, CurrentChatInfoPageOptions, CurrentChatInfoPageStyle } from '../../utils/styles'
import { User } from '../../utils/types';

import avatar from '../../assets/sampleUser.jpg';
import styles from './index.module.scss';
import { Person, Phone,Search,File,Filter } from 'akar-icons';

const CurrentChatInfoPage = () => {
    const { id } = useParams();
    //const currentUser:User | undefined = sampleUsers.find((u:any) => u.id === parseInt(id!))

    return (
        <CurrentChatInfoPageStyle>
            <div className={styles.userPic}>
                <ChatUserAvatarStyle src={avatar}/>
                {/* {currentUser?.name} */}
            </div>
            <CurrentChatInfoPageOptions>
                <li><Person strokeWidth={2} size={24} />Profile</li>
                <li><Phone strokeWidth={2} size={24} /> Call</li>
                <li><Filter strokeWidth={2} size={24} /> Change Colour</li>
                <li><Search strokeWidth={2} size={24} /> Search Chats</li>
                <li><File strokeWidth={2} size={24} /> View Shared Media</li>
            </CurrentChatInfoPageOptions>
        </CurrentChatInfoPageStyle>
    )
}

export default CurrentChatInfoPage