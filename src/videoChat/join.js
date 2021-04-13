import React, { useState, useEffect } from 'react';
import { createChat, webSocketURL } from '../api/index';
import { Button, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mic, MicOff, CallEnd, Videocam, VideocamOff, VideoCallRounded } from '@material-ui/icons';
import { Paper, Container } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';

export default function JoinChat() {
    const classes = useStyles();
    useEffect(() => {
        document.getElementById('video-call-div').style.display = 'none';
        webSocket[0].onclose = (e) => {
            webSocket.shift();
            webSocket.push(new WebSocket(webSocketURL));
            console.log(e);
        }
    }, []);
    const [newMeetingId, setNewMeetingId] = useState('');
    const [error, setError] = useState('');
    const [localStreamState, setLocalStreamState] = useState();
    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);

    let peers = {};
    const webSocket = [new WebSocket(webSocketURL)]
    webSocket[0].onmessage = (event) => {
        handleSignallingData(JSON.parse(event.data))
    }

    function handleSignallingData(data) {
        switch (data.type) {
            case "error":
                document.getElementById('video-call-div').style.display = 'none';
                document.getElementById('videos').innerHTML = '';
                localStream.getTracks().forEach(function (track) {
                    track.stop();
                });
                setLocalStreamState(null);
                setError(data.error);
                document.getElementById("input-form").style.display = "block";
                break;
            case "send_offer":
                addNewPeer(data.askee);
                createAndSendOffer(data.askee);
                break;
            case "send_answer":
                addNewPeer(data.askee);
                peers[data.askee].conn.setRemoteDescription(data.offer);
                createAndSendAnswer(data.askee);
                break;
            case "answer":
                peers[data.sender].conn.setRemoteDescription(data.answer);
                break;
            case "candidate":
                peers[data.sender].conn.addIceCandidate(data.candidate)
                break;
            case "user_left":
                let item = document.getElementById(data.username);
                item.parentNode.removeChild(item);
                delete peers[data.username];
                break;
            default:
                break;
        }
    }

    let username
    let meetingId
    function sendUsername() {

        username = document.getElementById("username-input").value
        meetingId = document.getElementById("meetingid-input").value
        sendData({
            type: "store_user"
        })
    }

    function sendData(data) {
        data.username = username
        data.meetingId = meetingId
        webSocket[0].send(JSON.stringify(data))
    }

    const addNewPeer = (partner) => {
        peers[partner] = {};
        peers[partner].name = partner;
        const configuration = {
            iceServers: [
                {
                    "urls": ["stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302"]
                }
            ]
        }
        peers[partner].conn = new RTCPeerConnection(configuration);
        peers[partner].conn.addStream(localStream);
        peers[partner].conn.onaddstream = (e) => {
            let parent = document.getElementById("videos");
            let node = document.createElement('video');
            node.id = partner;
            node.className = classes.video;
            node.setAttribute('autoplay', '');
            node.srcObject = e.stream;
            parent.appendChild(node);
        }

        peers[partner].conn.onicecandidate = ((e) => {
            if (!e.candidate) return;

            sendData({
                type: "pass_candidate",
                address: partner,
                candidate: e.candidate
            })
        });
    }

    var localStream;
    function joinChat() {
        document.getElementById("input-form").style.display = "none";
        document.getElementById("video-call-div").style.display = "block";
        document.getElementById('video-call-div').className = classes.videoCallDiv;

        navigator.getUserMedia({
            video: {
                frameRate: 24,
                width: {
                    min: 480, ideal: 720, max: 1280
                },
                aspectRatio: 1.33333
            },
            audio: {
                autoGainControl: false,
                channelCount: 1,
                echoCancellation: true,
                latency: 0,
                noiseSuppression: true,
                sampleRate: 48000,
                sampleSize: 16,
                volume: 1.0
            }
        }, (stream) => {
            localStream = stream;
            setLocalStreamState(localStream);
            let parent = document.getElementById("videos");
            let node = document.createElement('video');
            node.id = 'local-video';
            node.className = classes.video;
            node.setAttribute('autoplay', '');
            node.muted = true;
            node.srcObject = localStream;
            parent.appendChild(node);
            sendUsername();
            window.addEventListener('beforeunload', () => {
                // webSocket.onclose = function () {}; // disable onclose handler first
                webSocket[0].close(1000, JSON.stringify({
                    meetingId: meetingId,
                    username: username
                }))
            })

        }, (error) => {
            console.log(error)
        })
    }

    function createAndSendOffer(partner) {
        peers[partner].conn.createOffer((offer) => {
            offer.sdp = offer.sdp.replace('useinbandfec=1', 'useinbandfec=1; stereo=1; maxaveragebitrate=510000');
            sendData({
                type: "pass_offer",
                address: partner,
                offer: offer
            })

            peers[partner].conn.setLocalDescription(offer)
        }, (error) => {
            console.log(error)
        })
    }

    const createAndSendAnswer = (partner) => {
        peers[partner].conn.createAnswer((answer) => {
            answer.sdp = answer.sdp.replace('useinbandfec=1', 'useinbandfec=1; stereo=1; maxaveragebitrate=510000');
            peers[partner].conn.setLocalDescription(answer)
            sendData({
                type: "pass_answer",
                address: partner,
                answer: answer
            });

        }, error => {
            console.log(error)
        })
    }

    const muteAudio = () => {
        setIsAudio(p => !p);
    }
    useEffect(() => {
        if (localStreamState)
            localStreamState.getAudioTracks()[0].enabled = isAudio;
    }, [isAudio])

    const muteVideo = () => {
        setIsVideo((p) => !p);
    }
    useEffect(() => {
        if (localStreamState)
            localStreamState.getVideoTracks()[0].enabled = isVideo;
    }, [isVideo])

    const leaveCall = () => {
        window.location.reload();
    }

    const createChatID = async () => {
        const { data } = await createChat();
        setNewMeetingId(data);
    }

    return (
        <>
            <div id="input-form">
                {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <VideoCallRounded style={{ fontSize: '60px' }} />
                        <Button variant="outline-dark" size="lg" block onClick={createChatID} className="mb-3">
                            Create a New Chat ID
                        </Button>
                        {newMeetingId && <><h6>Share &amp; Use this Chat ID to Join Video Chat :-</h6><h5 className={classes.chatId}>{newMeetingId}</h5></>}
                        <h4>OR</h4>
                        <input className={classes.input} placeholder="Enter your name..."
                            type="text"
                            id="username-input" /><br />
                        <input className={classes.input} placeholder="Enter Chat ID..."
                            type="text"
                            id="meetingid-input" autoComplete="off" /><br />
                        <Button variant="primary" onClick={joinChat}>Join Call</Button>
                    </Paper>
                </Container>
            </div>
            <div id="video-call-div" >
                <div id="videos" ></div>
                <div className="call-action-div">
                    <Navbar fixed="bottom" className={classes.callActionNavbar} >
                        <Nav >
                            <Nav.Item>
                                <Button onClick={muteVideo} className="mx-2">{isVideo ? <Videocam /> : <VideocamOff />}</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={muteAudio} className="mx-2">{isAudio ? <Mic /> : <MicOff />}</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={leaveCall} className="mx-2" variant="danger"><CallEnd /></Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </div>
            </div>
        </>
    )
}
