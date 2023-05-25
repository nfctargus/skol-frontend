import { FC } from 'react';

import { User } from '../../../utils/types';
import { RecipientResultContainerStyle, RecipientScrollableItemContainer, RecipientResultItem } from '../../../utils/styles';


type Props = {
    userResults: User[];
    handleUserSelect: (user: User) => void;
};

export const RecipientResultContainer: FC<Props> = ({userResults,handleUserSelect}) => {
	return (
		<RecipientResultContainerStyle>
			<RecipientScrollableItemContainer>
				{userResults.map((user) => (
					<RecipientResultItem key={user.id} onClick={() => handleUserSelect(user)}>
						<span>{user.email}</span>
					</RecipientResultItem>
				))}
			</RecipientScrollableItemContainer>
		</RecipientResultContainerStyle>
	);
};
