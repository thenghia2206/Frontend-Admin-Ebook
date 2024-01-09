import React, { useEffect } from 'react'
import './topBook.styles.scss'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { ColumnType } from 'antd/lib/table'
import { Tooltip } from 'antd'
import CTable from '../table/CTable'
import { getTopBookRequest } from '../../redux/controller'
import { API_URL } from '../../enums/api.enums'
import Utils from '../../utils/base-utils'
import CTable1 from '../table/CTable1'
const StatisticalBook = () => {

    const columns: ColumnType<any>[] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <div className='title-table'>
                    <img src={`${API_URL.IMAGE_URL}/${record.image}`} alt="" width={50} />
                    <Tooltip title={record.title}>
                        <span className='span-title-table' >{record.title}</span>
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price)}</span>
            )
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            render: (_, record) => (
                <span  style={{ display: 'flex', justifyContent: 'center' }} >{record.sold}</span>
            )
        },
    ];

    const { bookBestSeller } = useSelectorRoot((state) => state.management); 
    const dispatch = useDispatchRoot()     

    useEffect(() => {
        const req = {
            size: 5,
            offset: 0,
            type: "bestSeller"
        }
        dispatch(getTopBookRequest(req));
    }, [])

    const onChangePagination = (event: any) => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='main-static-product'>
            <div className="static-product-title">
                Top {bookBestSeller.length} sản phẩm bán chạy
            </div>
            <div className="static-product-content">
                <CTable1
                    tableMainTitle=''
                    allowDateRangeSearch={false}
                    allowTextSearch={false}
                    data={bookBestSeller}
                    titleOfColumnList={columns}
                    totalRecord={bookBestSeller.length}
                    onChangePagination={onChangePagination}
                />
            </div>
        </div>
    )
}

export default StatisticalBook
