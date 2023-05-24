import { LoginPageImageContainer, Page, PageInnerContainer } from "../../utils/styles";
import bg from '../../assets/login-splash-bg.jpg';
import { RegisterForm } from "../forms/RegisterForm";

export const ReigsterPage = () => {
    return (
        <Page display="flex" justifyContent="center" alignItems="center">
            <PageInnerContainer>
                <LoginPageImageContainer>
                <img className="splashImage" src={bg} alt="Splash Art" />
                </LoginPageImageContainer>
                <RegisterForm />
            </PageInnerContainer>
        </Page>
    );
};