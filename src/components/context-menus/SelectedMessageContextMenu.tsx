import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ContextMenuStyle } from '../../utils/styles';
import { User } from '../../utils/types';

import recipientAvatar from '../../assets/sampleUser.jpg';
type Props = {
    points: { x: number; y: number };
};

export const SelectedMessageContextMenu: FC<Props> = ({ points }) => {
    const { id } = useParams();
    //const currentUser:User | undefined = sampleUsers.find((u:any) => u.id === parseInt(id!))

    return (
        <ContextMenuStyle top={points.y} left={points.x}>
            <div className='chatProfileContainer'><img src={recipientAvatar} />{/* currentUser?.name */}</div>
            <ul>
                
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </ContextMenuStyle>
    );
};
