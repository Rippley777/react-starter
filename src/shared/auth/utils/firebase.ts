import { auth } from '../firebase-config';
import { updateProfile } from 'firebase/auth';

export async function updateDisplayName(newDisplayName) {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, {
        displayName: newDisplayName,
      });
      console.log('Display name updated to:', newDisplayName);
      // Update successful
      // You can return or do something else here, like a callback or emit an event
    } catch (error) {
      console.error('Error updating display name:', error);
      // Handle errors here, such as displaying a notification to the user
    }
  } else {
    console.log('No user signed in.');
    // No user is signed in, handle accordingly
  }
}
