import { FormEvent, useState } from 'react';
import st from 'styled-components';
import { User } from '../types';
import { loginUser } from '../utils/common.utils';

const LoginWidget = st.div`
    width: 25rem;
    height: 30rem;
    border: 1px solid #333;

    background-color: #eeeeee;
    box-shadow: 0 0 6px 4px #999;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginHeader = st.div`
    width: 100%;
    height: 6rem;

    display: flex;
    align-items: center;
    justify-content: center;
    
    span {
        font-size: 28px;
        font-weight: 600;
    }
`;

const LoginContent = st.div`
    width: 100%;
    height: 20rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        width: 18rem;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;

const LoginInputWrapper = st.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;

    label {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 0.25rem;
    }

    input {
        font-size: 16px;
        width: 100%;
        padding: 0.5rem;
    }

    span {
        position: relative;
        left: 100%;
        transform: translate(-100%, -150%);

        cursor: pointer;
        font-size: 16px;
        font-weight: bold;

        color: #5f62f7;
    }
`;

const LoginSubmitWrapper = st.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        width: 9rem;
        height: 2.5rem;

        font-size: 18px;
        font-weight: bold;

        color: #fff;
        background-color: #3f49af;

        outline: none;
        cursor: pointer;
    }
`;

const LoginErrorWrapper = st.div`
    width: 18rem;
    height: 2rem;
    text-align: center;
    text-overflow: wrap;
    padding: 1rem 0;

    color: #cf254f;

    p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: bold;
    }
`;

type LoginPageProps = {
    setUserData: (user: User) => void;
}

export const LoginPage = (props: LoginPageProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setError('');

            if (!email || !password) {
                setError('Email/Password is required !');
                return;
            }

            const user = await loginUser(email, password);
            props.setUserData(user);

            window.location.reload(); // needed
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setPassword('');
        }
    }

    return (
        <LoginWidget>
            <LoginHeader>
                <span> Login </span>
            </LoginHeader>
            <LoginErrorWrapper>
                <p> {error} </p>
            </LoginErrorWrapper>
            <LoginContent>
                <form name='login-form' onSubmit={submitForm} autoComplete="true">
                    <LoginInputWrapper>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); }}
                            autoComplete="true"
                        />
                    </LoginInputWrapper>
                    <LoginInputWrapper>
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                            autoComplete="true"
                        />
                        <span onClick={() => { setShowPassword(!showPassword); }}> { showPassword ? 'Hide' : 'Show' } </span>
                    </LoginInputWrapper>
                    <LoginSubmitWrapper>
                        <button type='submit' onClick={submitForm}> Login </button>
                    </LoginSubmitWrapper>
                </form>
            </LoginContent>
        </LoginWidget>
    )
}
