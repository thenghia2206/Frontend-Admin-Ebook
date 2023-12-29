import React from 'react'
import './style.totalbox.scss'
import numeral from 'numeral';
import { motion } from 'framer-motion';


interface Props {
    title: string
    number: string
    icon: any
}

const TotalBox = (props: Props) => {
    return (
        <motion.div className='total-box'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className='total-box-content'>
                <div className="total-box-title">
                    {props.title}
                </div>
                <div className="total-box-number">
                    {props.number}
                </div>
            </div>

        </motion.div >
    )
}

export default TotalBox