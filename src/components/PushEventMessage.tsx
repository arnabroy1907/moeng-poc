import React from 'react';
import { PushData } from '../types';
import st from 'styled-components';

const PushMessageWidget = st.div`
    width: 20rem;
    height: 15rem;

    background-color: rgb(238 250 255);
    border: solid 1px #222;
    box-shadow: 0 0 6px 3px #ccc;

    margin: 0.5rem;
`;

const PushHeader = st.div`
    height: 5rem;
    padding: 1rem;

    span {
        font-size: 18px;
        font-weight: bold;
    }
`;

const PushContent = st.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`;

const PushImageWrapper = st.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;

        overflow: hidden;
    }
`;

const PushBody = st.div`
    width: 12rem;
    padding: 1rem;
    font-size: 12px;
    font-weight: bold;
    color: #444;
`;

type PushEventMessageProps = {
    key: string;
    message: PushData;
}

export const PushEventMessage = (props: PushEventMessageProps) => {

    const messageData = props.message.payload;
    console.log(messageData);

    return (
        <PushMessageWidget key={props.key}>
            <PushHeader>
                <span> {messageData.title} </span>
            </PushHeader>
            <PushContent>
                <PushImageWrapper>
                    <img src={messageData.icon} alt='icon' />
                </PushImageWrapper>
                <PushBody>
                    <span> {messageData.message} </span>
                </PushBody>
            </PushContent>
        </PushMessageWidget>
    )
}
