import React from 'react'

import './messageDisplay.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'

const MessageDisplay = ({messages, name}) => (
    <ScrollToBottom>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
)

export default MessageDisplay