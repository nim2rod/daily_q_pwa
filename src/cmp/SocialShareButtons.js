// src/cmp/SocialShareButtons.js
import React, { useState, useEffect } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    XIcon,
    LinkedinIcon,
    WhatsappIcon
} from 'react-share';
import Modal from './ModalCopy'

const SocialShareButtons = ({ url, text }) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        navigator.clipboard.writeText(text).then(() => {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 1500)
        }, (err) => {
            console.error('Failed to copy: ', err)
        })
    }, [text])

    const handleShareClick = (() => {
        navigator.clipboard.writeText(text).then(() => {
            alert("The content is copied, you can now share it on social (Ctrl+V)");
        }, (err) => {
            console.error('Failed to copy: ', err)
        })
    })


    const handleShareOptions = (() => {
        navigator.share({
            title: "Share dailyQ app",
            text: text,
            url: 'https://dailyqpwa-nimrod-devs-projects.vercel.app/',
        });
    })


    return (
        <div>
            <span><span className="btn-share" onClick={handleShareClick}>Share</span> on social that you solved the daily_q!</span>
            <div className="social-wraper">
                <FacebookShareButton url={url} quote={text} title={text} hashtag='#daily_q'>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={text}>
                    <XIcon size={32} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton url={url} title={text} summary={text} source={url} >
                    <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <WhatsappShareButton url={url} title={text}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <p onClick={handleShareOptions}>•••</p>
            </div>
            <Modal show={showModal} />
        </div>
    );
};

export default SocialShareButtons;
