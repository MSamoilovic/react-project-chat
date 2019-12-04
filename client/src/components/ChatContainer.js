import React from 'react'

import chatIcon from "../icons/chatIcon.png"
import './ChatContainer.css'

const ChatContainer = ({ users }) => (
    <div className="textContainer">{users ? (
        <div>
            <h3>People currently on the chat:</h3>
            <div className="activeContainer">
                <h3>
                    {users.map(({name}) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="onlineIcon" src={chatIcon} />
                        </div>
                    ))}
                </h3>
            </div>
        </div>
    ): null }</div>
) 



export default ChatContainer