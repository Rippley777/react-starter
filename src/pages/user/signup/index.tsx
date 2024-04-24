import { useState } from 'react';
import { signUp } from '../../../auth/authService';
import Page from '../../../components/layout/page';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const userCredential = await signUp(email, password);
            console.log(userCredential.user);
            // Redirect or perform additional actions
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <Page>
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
                <button type="submit">Sign up</button>
            </form>
        </Page>
    );
};

export default SignupForm;
