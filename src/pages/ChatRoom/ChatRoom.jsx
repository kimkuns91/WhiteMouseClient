import React, { useEffect, useReducer, useState } from 'react';
import './ChatRoom.css'

function chatReducer(state, action) {
    switch (action.type) {
        // 유저가 Input 값에 값을 넣을 때
        case 'INPUT_USER_MESSAGE':
            return { ...state, message: action.payload.message };
        // 유저가 Send 버튼을 눌렀을 때
        case 'ADD_USER_MESSAGE':
            return { ...state, chatLogs: [...state.chatLogs, action.payload], message: '' };
        case 'ADD_AI_MESSAGE_PART':
            return { ...state, message: '', streamMessage: state.streamMessage + action.payload };
        case 'COMMIT_AI_MESSAGE':
            return {
                ...state,
                chatLogs: [...state.chatLogs, { role: '🐭', message: state.streamMessage }],
                streamMessage: ''
            };
        default:
            return state;
    }
}

function ChatRoom() {
    const [ nickName, setNickName ] = useState('')
    const [ enterChatRoom, setEnterChatRoom ] = useState(false)
    const [state, dispatch] = useReducer(chatReducer, {
        message: '',
        chatLogs: [],
        streamMessage: ''
    });
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('wss://ws.whitemouse.dev');
        // const socket = new WebSocket('ws://localhost:8081');
        setWs(socket);

        socket.addEventListener('open', () => {
            console.log('WebSocket 연결이 열렸습니다.');
        });

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.answer) {
                dispatch({ type: 'ADD_AI_MESSAGE_PART', payload: data.answer });
            }
            if (data.status && data.status === 'completed') {
                dispatch({ type: 'COMMIT_AI_MESSAGE' });
            }
        });
    

        return () => {
            socket.close();
        };
    }, []);

    const handleMessage = (e) => {
        dispatch({ type: 'INPUT_USER_MESSAGE', payload: { role: nickName, message: e.target.value } });
    }

    const sendMessage = () => {
        if (state.message.trim() === '') return;

        ws.send(JSON.stringify({ text: state.message }));
        dispatch({ type: 'ADD_USER_MESSAGE', payload: { role: nickName, message: state.message } });
    }
    const handleNickName = (e)=>{
        setNickName(e.target.value)
    }
    const handleSendNickName = ()=>{
        setEnterChatRoom(true)
    }

    return (
        <> 
            {
                !enterChatRoom
                ? <div className='NickNameWrap'>
                    <input type="text" value={ nickName } onChange={ handleNickName } placeholder="닉네임을 입력해주세요" onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            handleSendNickName()
                        }
                    }}/>
                    <button onClick={ handleSendNickName }>입장</button>
                </div>
                :<div className="chatroom">
                    <div className="header">White Mouse Chat</div>
                    <div className="chatlogs">
                        {state.chatLogs.map((msg, index) => (
                            <div key={index} className="message">
                                {msg.role} : {msg.message}
                            </div>
                        ))}
                        {state.streamMessage && <div className="message">🐭 : {state.streamMessage}</div>}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={state.message}
                            onChange={handleMessage}
                            onKeyUp={(e) => { if (e.key === 'Enter') sendMessage(); }}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            }
        </>
    );
}

export default ChatRoom;
