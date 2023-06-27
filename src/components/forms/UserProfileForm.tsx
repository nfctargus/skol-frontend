import React, { useState } from 'react'
import { UserOnboardingParams } from '../../utils/types';
import { useForm } from 'react-hook-form';
import { postNewUserProfile } from '../../utils/api';
import { FolderAdd, Image } from 'akar-icons';
import { Button, FormContainerStyle, OnboardingFormImage, OnboardingFormImageSection, OnboardingFormPageStyle, OnboardingFormUploadLabel } from '../../utils/styles';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
const UserOnboardingForm = () => {
    const {register,handleSubmit,formState: {errors}} = useForm<UserOnboardingParams>();
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

    const onSubmit = (data:UserOnboardingParams) => {
        console.log(file);
        console.log(imgPath);
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            console.log(data);
            return postNewUserProfile(formData)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }
    };
    return (
        <OnboardingFormPageStyle>
            <FormContainerStyle onSubmit={handleSubmit(onSubmit)}>
                <h1>Upload a profile picture to finish setting up your account</h1>
                <OnboardingFormImageSection>   
                    <OnboardingFormUploadLabel htmlFor='avatar'>Browse</OnboardingFormUploadLabel>     
                    <OnboardingFormImage>
                        {imgPath ? <div><img src={imgPath} alt='Avatar'/></div> : <div><FolderAdd size={34} /></div>}
                    </OnboardingFormImage>
                    <input type='file' id='avatar' {...register('avatar', {required:true,onChange: (e) => {handleFileUpload(e)}})} style={{display:'none'}}/>
                </OnboardingFormImageSection>
                <Button>Submit</Button>
                <div className={styles.footerText}>
                    <span>Don't want to upload a picture? </span>
                    <Link to="/chats">
                        <span>Skip</span>
                    </Link>
                </div>
            </FormContainerStyle>
            
        </OnboardingFormPageStyle>
    )
}

export default UserOnboardingForm