import React, { useState } from 'react'
import { UserProfileParams } from '../../utils/types';
import { useForm } from 'react-hook-form';
import { postNewUserProfile } from '../../utils/api';
import { FolderAdd } from 'akar-icons';
import { Button, FormContainerStyle, UserProfilePageImageContainer, UserProfileAvatarSectionStyle, UserProfilePageStyle, UserProfilePageUploadLabel, InputContainerStyle, InputField, InputLabel } from '../../utils/styles';
import styles from './index.module.scss';
const UserProfileForm = () => {
    const {register,handleSubmit,formState: {errors}} = useForm<UserProfileParams>();
    const [file, setFile] = useState<File>();
    const [imgPath,setImgPath] = useState('');
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
        const formData = new FormData();
        if(data.firstName) formData.append('firstName',data.firstName)
        if(data.lastName) formData.append('lastName',data.lastName)
        if(data.username) formData.append('username',data.username)
        if(file) formData.append('avatar', file)
        if(formData.entries.length <= 0) return;
        
        return postNewUserProfile(formData)
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
                        {imgPath ? <div><img src={imgPath} alt='Avatar'/></div> : <div><FolderAdd size={34} /></div>}
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