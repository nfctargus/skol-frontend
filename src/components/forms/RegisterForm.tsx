import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserParams } from "../../utils/types";
import styles from './index.module.scss';
import { Button, FormContainerStyle, InputContainerStyle, InputField, InputLabel } from "../../utils/styles";
import { toast } from 'react-toastify';
import { postRegisterUser } from "../../utils/api";

export const RegisterForm = () => {
    const {register,handleSubmit,formState: { errors }} = useForm<CreateUserParams>();
    const navigate = useNavigate();
    const onSubmit = async (data: CreateUserParams) => {
        
		try {
            await postRegisterUser(data);
			navigate('/login');
			toast.clearWaitingQueue();
			toast('Account created!', { type: 'success', icon: true });
		} catch (err:any) {
            const {message:errMessage } = err.response.data
			toast.clearWaitingQueue();
            if(errMessage) toast(errMessage, { type: 'error', icon: true }); 
            else toast("An error has occured during registration process. Please try again later.", { type: 'error', icon: true }); 
		}
	};
    return (
        <FormContainerStyle className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.welcome}>Hi There!</div>
            <section className={styles.nameFieldRow}>
				<InputContainerStyle>
					<InputLabel htmlFor="firstName">First Name</InputLabel>
					<InputField type="text" id="firstName" {...register('firstName', { required: 'First Name is Required' })} />
				</InputContainerStyle>
				<InputContainerStyle>
					<InputLabel htmlFor="lastName">Last Name</InputLabel>
					<InputField type="text" id="lastName" {...register('lastName', { required: 'Last Name is Required' })} />
				</InputContainerStyle>
			</section>
			<InputContainerStyle>
				<InputLabel htmlFor="username">Username</InputLabel>
				<InputField type="text" id="username" {...register('username', {required: 'Username is required'})} />
			</InputContainerStyle>
            <InputContainerStyle>
				<InputLabel htmlFor="email">Email</InputLabel>
				<InputField type="email" id="email" {...register('email', {required: 'Email is required'})} />
			</InputContainerStyle>
			<InputContainerStyle>
				<InputLabel htmlFor="password">Password</InputLabel>
				<InputField type="password" id="password" {...register('password', { required: 'Password is Required' })} />
			</InputContainerStyle>
			<Button className={styles.button}>Create My Account</Button>
			<div className={styles.footerText}>
				<span>Already have an account? </span>
				<Link to="/login">
					<span>Login</span>
				</Link>
			</div>
		</FormContainerStyle>
    );
}