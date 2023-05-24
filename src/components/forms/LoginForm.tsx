import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserCredentialsParams } from "../../utils/types";
import styles from './index.module.scss';
import { Button, FormContainerStyle, InputContainerStyle, InputField, InputLabel } from "../../utils/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { userLoginThunk } from "../../utils/store/auth/authThunk";
import { toast } from 'react-toastify';

export const LoginForm = () => {
    const {register,handleSubmit,formState: { errors }} = useForm<UserCredentialsParams>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit = async (data: UserCredentialsParams) => {
        dispatch(userLoginThunk(data)).then(() => navigate('/chats'))
        .catch((err) => {
            const {message:errMessage } = err.response.data
			toast.clearWaitingQueue();
            if(errMessage) toast(errMessage, { type: 'error', icon: true }); 
            else {
                console.log(err)
                toast("An error has occured during sign in. Please try again later.", { type: 'error', icon: true }); 
            }
        });

    };
    return (
        <FormContainerStyle className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.welcome}>Welcome Back!</div>
            <InputContainerStyle>
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField type="email" id="email" {...register('email', { required: true })} />
            </InputContainerStyle>
            <InputContainerStyle className={styles.loginFormPassword}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <InputField type="password" id="password" {...register('password', { required: true })} />
            </InputContainerStyle>
            <Button>Login</Button>
            <div className={styles.footerText}>
                <span>Don't have an account? </span>
                <Link to="/register">
                    <span>Register Now</span>
                </Link>
            </div>
        </FormContainerStyle>
    );
}