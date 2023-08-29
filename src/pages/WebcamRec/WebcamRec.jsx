import React, { useState } from 'react';
import axios from 'axios';

const WebcamRec = ()=>{
    const [mediaStream, setMediaStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recording, setRecording] = useState(false);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = event => {
            if (event.data.size > 0) {
            setRecordedChunks(prevChunks => [...prevChunks, event.data]);
            }
        };

        recorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded-video.webm';
            a.click();
            setRecordedChunks([]);
        };

        setMediaStream(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const handleUpload = async () => {
        if (recordedChunks.length === 0) return;

        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', blob);

        try {
            const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <h1>웹캠 동영상 녹화</h1>
            <div>
            {mediaStream && <video srcObject={mediaStream} autoPlay />}
            </div>
            <div>
            {!recording ? (
                <button onClick={startRecording}>녹화 시작</button>
            ) : (
                <button onClick={stopRecording}>녹화 중지</button>
            )}
            <button onClick={handleUpload}>녹화된 동영상 업로드</button>
            </div>
        </div>
    );
}
export default WebcamRec