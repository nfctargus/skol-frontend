import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserCredentialsParams } from "../../utils/types";
import styles from './index.module.scss';
import { Button, InputContainerStyle, InputField, InputLabel } from "../../utils/styles";

export const LoginForm = () => {
    const {register,handleSubmit,formState: { errors }} = useForm<UserCredentialsParams>();
    const navigate = useNavigate();

    const onSubmit = async (data: UserCredentialsParams) => {
        try {
          //await postLoginUser(data);
          console.log('Success');
          navigate('/chats');
        } catch (err) {
          console.log(err);
        }
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    );
}