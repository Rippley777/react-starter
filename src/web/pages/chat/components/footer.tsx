import { SiAzuredevops, SiExpress, SiMongodb } from 'react-icons/si';

function ChatFooter() {
  return (
    <div className="pb-10 text-center">
      This page is powered by websockets over a Mongo{' '}
      <SiMongodb className="inline text-green-400" /> Express{' '}
      <SiExpress className="inline text-blue-700" /> backend hosted on Azure{' '}
      <SiAzuredevops className="inline text-blue-400" />
    </div>
  );
}

export default ChatFooter;
