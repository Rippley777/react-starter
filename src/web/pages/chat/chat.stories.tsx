import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import '../../../index.css';
import Chat from '.'; // Ensure the import points to where the Chat component is actually located
import { Provider } from 'react-redux';
import store from '../../../shared/store/store'; // Adjust path as necessary
// import 'path/to/your/main/css/file.css'; // Uncomment if CSS is used and make sure your build system supports CSS imports in TypeScript files
// import { createMockStore } from './path/to/your/mockStore'; // Adjust the path as necessary

// Define the component's prop types if necessary
interface ChatProps {
  // Define any props the Chat component accepts
}

// Define default export with Meta type which includes the component and title
const chatStoriesMeta: Meta = {
  title: 'Chat',
  component: Chat,
};
export default chatStoriesMeta;

// Define the Template using the Story type
const Template: StoryFn<ChatProps> = (args) => (
  <Provider store={store}>
    <Chat />
  </Provider>
);

// Default story configuration
export const Default = Template.bind({});
Default.args = {
  // Default args go here
};

// LoggedIn story configuration
export const LoggedIn = Template.bind({});
LoggedIn.decorators = [(Story) => <Story />];
LoggedIn.args = {
  // Args for logged in state go here
};
