import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";

export default function ShowChats() {

    const [messageValue, setMessageValue] = useState();
    const [isLoading, setIsLoading] = useState();
    const [messages, setMessages] = useState();
    const chatWindowRef = useRef(null);
    const [data, setData] = useState();
    const [timezone, setTimezone] = useState();
    const location = useLocation();

    useEffect(() => {
        const data = location.state?.data;
        setData(data.storeName);
        let text = data.timezone
        let pattern = /(\+|\-)\d+.\d+/;
        let result = text.match(pattern);
        let done = result[0];
        let finall = Number(done.replace(":", "."));
        setTimezone(finall);

    }, []);

    const getChats = async () => {
        setIsLoading(true);
        const response = await fetch("https://tags.mabbonz.in/malik/mapi/getChats", {
            method: 'post',
            body: JSON.stringify({ "storeName": location.state?.data.storeName }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        setMessages(result);
        setIsLoading(false);
    };

    const deleteChats = async()=>{
        setIsLoading(true);
        const response = await fetch("https://tags.mabbonz.in/malik/mapi/deleteChats", {
            method: 'post',
            body: JSON.stringify({ "storeName": location.state?.data.storeName }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        setMessages([]);
        await getChats();
        setIsLoading(false);
    }

    useEffect(() => {
        getChats();
    }, []);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [isLoading]);

    const handleSubmit = async () => {
        if (!messageValue) {
            return;
        };

        setIsLoading(true);
        await fetch("https://tags.mabbonz.in/malik/mapi/setChats", {
            method: 'post',
            body: JSON.stringify({ "storeName": data, "message": messageValue, "timezone": timezone }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const response = await fetch("https://tags.mabbonz.in/malik/mapi/getChats", {
            method: 'post',
            body: JSON.stringify({ "storeName": data }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        setMessages(result);
        setMessageValue('');
        setIsLoading(false);
    };

    return (
        <div>
            <Link to="/app/priceandtagapp"><button className="btn btn-xl">Back</button></Link>
            <TitleCard title={"Chats"}>
                <div className='chat-buttons'>
                    <button className="btn btn-primary" onClick={getChats}>Refresh</button>
                    <button className="btn btn-error" onClick={deleteChats}>Delete Chats</button>
                </div>
                <span className="loading loading-spinner loading-lg"></span>
                <div className='box' ref={chatWindowRef}>
                    {messages?.map((message) => {
                        return (
                            <div style={{ display: 'flex' }} key={message.time}>
                                {message.sender === 'Admin' && <div className='adminIcon'></div>}
                                <div className='messagebox-admin'>
                                    <div>
                                        <b>{message.sender}</b>
                                    </div>
                                    {message.message}
                                    <div style={{ textAlignLast: 'right' }}>
                                        <small>{message.time.substring(0, 16)}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='message-input'>
                    <input type="text" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} autoComplete="off" placeholder="Message" className="input input-bordered w-full" />
                    <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
                </div>
            </TitleCard>
        </div>
    )
}
