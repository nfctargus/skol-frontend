import { LoginPageImageContainer, Page, PageInnerContainer } from "../../utils/styles";
import { LoginForm } from "../forms/LoginForm";
import bg from '../../assets/login-splash-bg.jpg';

export const LoginPage = () => {
    return (
        <Page display="flex" justifyContent="center" alignItems="center">
            <PageInnerContainer>
                <LoginPageImageContainer>
                    <img src={bg} />
                </LoginPageImageContainer>
                <LoginForm />
            </PageInnerContainer>
        </Page>
    );
};