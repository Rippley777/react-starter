import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../../../auth/authService';
import { setUserData } from '../../../../store/reducers/users';
import Page from '../../../components/layout/page';

const LoginForm = () => {

    // const store = useContext(StoreContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const userCredential = await signIn(email, password);
            console.log('submit', { state });

            dispatch(setUserData({ email: email }));

            console.log(userCredential.user);
            window.location.href = '/profile';
            // Redirect or perform additional actions
        } catch (error: any) {
            setError(error.message);
            console.error(error.message);
        }
    };

    return (
        <Page>
            {error && <p>{error} <a href="/signup">click here to sign up</a></p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </Page>
    );
};

export default LoginForm;
