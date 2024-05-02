import { useEffect, useRef, useState } from 'react';

const SERVER_URL =
  process.env.REACT_APP_WEBSOCKET_URL ??
  'ws://localhost:8080' ??
  'wss://be-test-mongo-express.azurewebsites.net'; // Your WebSocket server URL

const configuration: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const VideoChat: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);

  // Initialize WebSocket and handle incoming messages
  useEffect(() => {
    ws.current = new WebSocket(SERVER_URL);
    ws.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'offer':
          handleOffer(data.offer);
          break;
        case 'answer':
          handleAnswer(data.answer);
          break;
        case 'candidate':
          handleCandidate(data.candidate);
          break;
        default:
          break;
      }
    };

    return () => {
      ws.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Media stream handling
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current!.srcObject = stream;
        setLocalStream(stream);
      })
      .catch(console.error);
  }, []);

  // Initialize Peer Connection and stream handling
  const initializePeerConnection = () => {
    const pc = new RTCPeerConnection(configuration);
    localStream?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    pc.ontrack = (event) => {
      if (event.streams[0])
        remoteVideoRef.current!.srcObject = event.streams[0];
    };
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current?.send(
          JSON.stringify({ type: 'candidate', candidate: event.candidate }),
        );
      }
    };
    setPeerConnection(pc);
  };

  // Create and send an offer to initiate a call
  const createAndSendOffer = async () => {
    if (!peerConnection) initializePeerConnection();
    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer!);
    ws.current?.send(JSON.stringify({ type: 'offer', offer }));
  };

  // Handle WebRTC offers
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnection) initializePeerConnection();
    await peerConnection?.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer!);
    ws.current?.send(JSON.stringify({ type: 'answer', answer }));
  };

  // Handle WebRTC answers
  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerConnection?.setRemoteDescription(
      new RTCSessionDescription(answer),
    );
  };

  // Handle ICE candidates
  const handleCandidate = async (candidate: RTCIceCandidateInit) => {
    await peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={createAndSendOffer}>Start Call</button>
    </div>
  );
};

export default VideoChat;
