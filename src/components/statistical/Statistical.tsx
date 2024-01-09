import React, { useEffect, useRef, useState } from 'react'
import './style.statistical.scss'
import { Button, DatePicker, notification } from 'antd'
import { motion } from 'framer-motion'
import is from 'date-fns/esm/locale/is'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import moment from 'moment'
import { getTopBookRequest } from '../../redux/controller'
import TopBook from './TopBook'
import StatisticalBook from './TopBook'
import StatisticalRevenue from './StatisticalRevenue'
const { RangePicker } = DatePicker;

const Statistical = () => {

    const { bookBestSeller } =
    useSelectorRoot((state) => state.management);

    const dispatch = useDispatchRoot();

    useEffect(() => {
        const bodyRequest = {
            size : 5,
            offset : 0,
            type : "bestSeller"
        }
        dispatch(getTopBookRequest(bodyRequest))
    },[])

    return (
        <div style={{display : 'flex'}}>
            <StatisticalRevenue></StatisticalRevenue>

            <div className="main-statistical">
                <StatisticalBook></StatisticalBook>
            </div>
        </div>
    )
}

export default Statistical