import { useSelector } from 'react-redux';
import Page from '../../../components/layout/page';

const UserProfile = () => {
    const state = useSelector((state: any) => state.user.userData);
    console.log({ state });


    return (
        <Page>
            <h1>User Profile</h1>
            {state.email ? (
                <div>
                    <p>Email: {state.email}</p>
                </div>
            ) : (
                <p>No user data</p>
            )}
        </Page>
    );
};

export default UserProfile;
