import './message.css';
import motion from 'framer-motion'
import { useEffect, useState } from 'react';
function Message(props) {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, props.time || 5000)
    }, [])
    return (
        visible && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='messageContainer'>
            <span className='title'>Update</span>
            <span className='body'>{props.message}</span>
        </motion.div>)
    )
}

export default Message
