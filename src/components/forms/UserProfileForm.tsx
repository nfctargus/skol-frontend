import React, { useContext, useState } from 'react'
import { UserProfileParams } from '../../utils/types';
import { useForm } from 'react-hook-form';
import { postUpdateUser } from '../../utils/api';
import { Button, FormContainerStyle, UserProfilePageImageContainer, UserProfileAvatarSectionStyle, UserProfilePageStyle, UserProfilePageUploadLabel, InputContainerStyle, InputField, InputLabel, ChatUserAvatarStyle } from '../../utils/styles';
import styles from './index.module.scss';
import { AuthContext } from '../../utils/context/AuthContext';
import { getUserInitials, hasProfilePicture } from '../../utils/helpers';
const UserProfileForm = () => {
    const {register,handleSubmit,formState: {errors}} = useForm<UserProfileParams>();
    const [file, setFile] = useState<File>();
    const [imgPath,setImgPath] = useState('');
    const { user } = useContext(AuthContext);
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length) {
            const file = files.item(0);
            if (file) {
                setImgPath(URL.createObjectURL(file));
                setFile(file);
            }
        }
    };
    const onSubmit = (data:UserProfileParams) => {
        console.log(data)
        const formData = new FormData();
        if(data.firstName) formData.append('firstName',data.firstName)
        if(data.lastName) formData.append('lastName',data.lastName)
        if(data.username) formData.append('username',data.username)
        if(file) formData.append('avatar', file)
        
        return postUpdateUser(formData)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };
    return (
        <UserProfilePageStyle>
            <FormContainerStyle onSubmit={handleSubmit(onSubmit)}>
                <h1>My Profile</h1>
                <h2>Manage your profile settings</h2>
                <UserProfileAvatarSectionStyle>   
                    <UserProfilePageImageContainer>
                        {user && imgPath ? <div><img src={imgPath} alt='Avatar'/></div> : hasProfilePicture(user) ? <ChatUserAvatarStyle src={`../images/${user?.avatar}`}/> : <div className={styles.noAvatarContainer}>{getUserInitials(user!)}</div>}
                    </UserProfilePageImageContainer>
                    <UserProfilePageUploadLabel htmlFor='avatar'>Change Avatar</UserProfilePageUploadLabel> 
                    <input type='file' id='avatar' {...register('avatar', {onChange: (e) => {handleFileUpload(e)}})} style={{display:'none'}}/>
                </UserProfileAvatarSectionStyle>
                <div className={styles.profileUpdate}>Update Your Personal Information</div>
                <section className={styles.nameFieldRow}>
                    <InputContainerStyle>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <InputField type="text" id="firstName" {...register('firstName')} />
                    </InputContainerStyle>
                </section>
                <section className={styles.nameFieldRow}>
                    <InputContainerStyle>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <InputField type="text" id="lastName" {...register('lastName')} />
                    </InputContainerStyle>
                </section>
                <section className={styles.nameFieldRow}>
                    <InputContainerStyle>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <InputField type="text" id="username" {...register('username')} />
                    </InputContainerStyle>
                </section>
                <Button>Submit</Button>
            </FormContainerStyle>
            
        </UserProfilePageStyle>
    )
}

export default UserProfileForm