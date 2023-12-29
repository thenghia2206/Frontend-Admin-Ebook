import React, { useEffect, useState } from 'react'
import TotalBox from '../../components/totalBox/TotalBox'
import CoinIcon from '../../assets/image/coin.png'
import ShopIcon from '../../assets/image/shop.png'
import UserIcon from '../../assets/image/3-user.png'

import './general.styles.scss'
import { motion } from 'framer-motion'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import Utils from '../../utils/base-utils'
import Statistical from '../../components/statistical/Statistical'
import { getStatisticOverviewRequest } from '../../redux/controller'


const General = () => {
    const { overviewStatistical  } = useSelectorRoot((state) => state.management); // lấy ra state từ store
    const dispatch = useDispatchRoot() // dispatch action   
    const [TotalBoxData, setTotalBoxData] = useState<any>([]) // state của component

    useEffect(() => {
        dispatch(getStatisticOverviewRequest());
    }, [])

    // Gán dữ liệu vào state của component
    useEffect(() => {
        if (1) {
            const tmp = [
                {
                    title: "Tổng doanh thu",
                    number: Utils.formatMoney(overviewStatistical?.totalRevenue) + ' VND',
                    icon: CoinIcon
                },
                {
                    title: "Tổng số sách",
                    number: overviewStatistical?.totalBook,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số đơn hàng",
                    number: overviewStatistical?.totalOrder,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số người dùng",
                    number: overviewStatistical?.totalUser,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số nhân viên",
                    number: overviewStatistical?.totalStaff,
                    icon: UserIcon
                },
            ]
            setTotalBoxData(tmp)
        }
    })


    return (
        <motion.div
            className="main-general"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='total-boxs'>
                {TotalBoxData.map((item: any, index: React.Key | null | undefined) => (
                    <TotalBox
                        key={index}
                        title={item.title}
                        number={item.number}
                        icon={item.icon}
                    />
                ))}
            </div>
            <Statistical></Statistical>
        </motion.div>
    )
}

export default General