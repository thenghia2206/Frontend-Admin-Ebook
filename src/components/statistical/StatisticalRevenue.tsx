import React, { useEffect, useRef, useState } from 'react'
import './StatisticalRevenue.styles.scss'
import { Button, DatePicker, notification } from 'antd'
import { motion } from 'framer-motion'
import is from 'date-fns/esm/locale/is'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { format } from 'date-fns';
import moment from 'moment'
import { getOverviewStatisticDayRequest, getOverviewStatisticMonthRequest, getOverviewStatisticYearRequest, setViewStatistic } from '../../redux/controller'
import StatisticalChart from './StatisticalChart'
const { RangePicker } = DatePicker;


const StatisticalRevenue = () => {

    const [dataChart, setDataChart] = useState<any>([]) // Biến lưu trữ dữ liệu thống kê
    const [startDate, setStartDate] = useState<string>('') // Biến lưu trữ ngày bắt đầu thống kê
    const [endDate, setEndDate] = useState<string>('') // Biến lưu trữ ngày kết thúc thống kê
    const dispatch = useDispatchRoot() // dispatch action
    const { typeViewStatistic, overViewStatisticDay, overViewStatisticYear, overViewStatisticMonth } = useSelectorRoot((state) => state.management); // lấy ra state từ store


    useEffect(() => {
        switch (typeViewStatistic) {
            case 'day':
                setStartDate(moment().subtract(7, 'days').format('YYYY-MM-DD'))
                setEndDate(moment().format('YYYY-MM-DD'))
        }
    }, [typeViewStatistic])


    // useEffect(() => {
    //     console.log(overViewStatisticUserDay, overViewStatisticSellerDay);

    //     overViewStatisticUserDay && setDataUserChart(overViewStatisticUserDay);
    //     overViewStatisticSellerDay && setDataSellerChart(overViewStatisticSellerDay);
    // }, [overViewStatisticUserDay, overViewStatisticSellerDay])


    // Hàm gọi khi thay đổi ngày thống kê
    const handleChangeDate = (date: any) => {
        if (date) {
            setStartDate(date[0].format('YYYY-MM-DD'))
            setEndDate(date[1].format('YYYY-MM-DD'))
        }
    }

    const isDateRangeValid = (startDate: string, endDate: string) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
        return diffInDays <= 7;
    }
    const isDateRangeValid4Day = (startDate: string, endDate: string) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
        return diffInDays <= 4;
    }


    useEffect(() => {
        if (startDate && endDate) {
            if (typeViewStatistic === 'day') {
                if (isDateRangeValid(startDate, endDate)) {
                    const req = {
                        startDay: startDate,
                        endDay: endDate
                    }
                    dispatch(getOverviewStatisticDayRequest(req))
                }
                else {
                    notification.error({
                        message: 'Lấy dữ liệu không thành công',
                        description: 'Khoảng thời gian thống kê không được vượt quá 7 ngày',
                    });
                }
            }
            if (typeViewStatistic === 'month') {
                const start = new Date(startDate);
                start.setDate(1)
                const end = new Date(endDate);
                const endTime = format(end, 'yyyy-MM-dd');
                const startTime = format(start,'yyyy-MM-dd')
                const req = {
                    startMonth: startTime,
                    endMonth: endTime,
                }
                dispatch(getOverviewStatisticMonthRequest(req))
            }

            if (typeViewStatistic === 'year') {
                const start = new Date(startDate);
                start.setDate(1)
                start.setMonth(0)
                const end = new Date(endDate);
                const endTime = format(end, 'yyyy-MM-dd');
                const startTime = format(start,'yyyy-MM-dd')
                const req = {
                    startYear: startTime,
                    endYear: endTime,
                }
                dispatch(getOverviewStatisticYearRequest(req))
            }
        }

    }, [startDate, endDate])

    const disabledDate = (current : any ) => {
        return current && current > moment().endOf('day');
      };

    const handleClickDay = () => {
        let currentDate = new Date();
        const endTime = format(currentDate, 'yyyy-MM-dd');
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        const firstTime = format(sevenDaysAgo, 'yyyy-MM-dd');
        const req = {
            startDay: firstTime,
            endDay: endTime,
        }
        dispatch(getOverviewStatisticDayRequest(req))
        dispatch(setViewStatistic('day'))
    }

    const handleClickMonth = () => {
        let currentDate = new Date();
        const endTime = format(currentDate, 'yyyy-MM-dd');
        let firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
        const firstTime = format(firstDayOfLastMonth, 'yyyy-MM-dd');
        const req = {
            startMonth: firstTime,
            endMonth: endTime,
        }
        dispatch(getOverviewStatisticMonthRequest(req))
        dispatch(setViewStatistic('month'))

    }

    const handleClickYear = () => {
        const currentDate = new Date();
        const endTime = format(currentDate, 'yyyy-MM-dd');
        const firstDayOfLastMonth = new Date(currentDate.getFullYear() - 1, 0, 1);
        const firstTime = format(firstDayOfLastMonth, 'yyyy-MM-dd');
        const req = {
            startYear: firstTime,
            endYear: endTime,
        }
        dispatch(getOverviewStatisticYearRequest(req))
        dispatch(setViewStatistic('year'))
    }

    useEffect(() => {
        let outputData : any
        if(overViewStatisticDay){
             outputData = overViewStatisticDay.map((item : any) => ({
                totalRevenue: item.totalRevenue,
                day: new Date(item.day).toLocaleDateString('en-GB')
              }));
            setDataChart(outputData)
        }
    }, [overViewStatisticDay])

    useEffect(() => {
        let outputData : any
        if(overViewStatisticMonth){
             outputData = overViewStatisticMonth.map((item : any) => ({
                totalRevenue: item.totalRevenue,
                day: new Date(item.month).toLocaleDateString('en-GB', { month: 'numeric', year: 'numeric' })
              }));
            setDataChart(outputData)
        }
    }, [overViewStatisticMonth])

    useEffect(() => {
        let outputData : any
        if(overViewStatisticYear){
             outputData = overViewStatisticYear.map((item : any) => ({
                totalRevenue: item.totalRevenue,
                day: new Date(item.year).toLocaleDateString('en-GB', { year: 'numeric' })
              }));
            setDataChart(outputData)
        }
    }, [overViewStatisticYear])

    return (
        <div className='general-statistical'>
            <div className="main-statistical">
                <div className='title-text'>
                        Báo cáo doanh thu
                </div>
                <div className="statistical-title">
                    <div className='type-statistical'>
                        <div className='type-content'>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'day' ? 'active' : ''}`}
                                onClick={() => handleClickDay()}
                            >
                                Ngày
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'month' ? 'active' : ''}`}
                                onClick={() => handleClickMonth()}
                            >
                                Tháng
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'year' ? 'active' : ''}`}
                                onClick={() => handleClickYear()}
                            >
                                Năm
                            </motion.div>
                        </div>
                        {typeViewStatistic === 'day' &&
                            <RangePicker
                                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                                onChange={handleChangeDate}
                                defaultValue={[moment().subtract(7, 'days'), moment()]}
                                disabledDate={disabledDate}
                            />
                        }

                        {typeViewStatistic === 'month' &&
                            <RangePicker placeholder={['Tháng bắt đầu', 'Tháng kết thúc']} onChange={handleChangeDate} picker="month" disabledDate={disabledDate} />
                        }


                        {typeViewStatistic === 'year' &&
                            <RangePicker placeholder={['Năm bắt đầu', 'Năm kết thúc']} onChange={handleChangeDate} picker="year" disabledDate={disabledDate} />
                        }

                    </div>
                </div>
                <StatisticalChart 
                data={dataChart}
                ></StatisticalChart>
            </div>
        </div>
    )
}

export default StatisticalRevenue