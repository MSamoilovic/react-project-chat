import React from 'react'

import chatIcon from '../icons/chatIcon.png'
import closeIcon from '../icons/closeIcon.png'
import './ChatBar.css'

const ChatBar = ({ room }) => (
    <div className="chatBar">
        <div className="leftContainer">
            <img className="chatIcon" src={chatIcon} alt="online"/>
            <h3>{room}</h3>
        </div>
        <div className="rightContainer">
            <a href="/"><img src={closeIcon} alt="closeIcon" className="closeIcon" /></a>
        </div>
    </div>
)

export default ChatBar