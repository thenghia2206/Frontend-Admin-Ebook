import { Button, DatePicker, Select, Table } from 'antd';
import './ctable.styles.scss'

import React, { useEffect } from 'react'
import { ColumnsType } from 'antd/lib/table';
import Input from 'antd/lib/input/Input';
import { color } from 'framer-motion';
const { RangePicker } = DatePicker;

interface CTableProps {
    tableMainTitle?: string;
    allowTextSearch?: boolean;
    allowDateRangeSearch?: boolean;
    allowSelectBox?: boolean;
    allowAddObject?: boolean;
    selectBoxData?: any;
    selectBoxPlaceholder?: string;
    titleOfColumnList?: ColumnsType<any>;
    data?: any[];
    allowActionDetail?: boolean;
    allowActionBlock?: boolean;
    totalRecord: number;
    titleAddButton?: string;
    pageSize?: number;
    textSearch?: string;
    size? : number ;
    onChangeInput?: (event: any) => void;
    onChangeRangePicker?: (event: any) => void;
    onChangeSelectBox?: (event:any) => void;
    onSearch?: () => void;
    onChangePagination: (event: any) => void;
    handleAddObject?: () => void;
}

const CTable = (props: CTableProps) => {
    useEffect(() => {
    }, [])
    return (
        <div className='table-main'>
            <div className='title-and-search'>
                <div className='title'>{`${props.tableMainTitle} (${props.totalRecord})`}</div>
                <div className='search-area'>
                    {
                        props.allowTextSearch &&
                        <Input onChange={
                            (event) => {
                                if (props.onChangeInput) props.onChangeInput(event)
                            }
                        }
                        placeholder= {`${props.textSearch}`} />
                    }
                    {
                        (
                            props.allowTextSearch) &&
                        <Button 
                            onClick={() => {
                                if (props.onSearch) props.onSearch()
                            }}
                        >Tìm kiếm</Button>
                    }
                    {
                        props.allowAddObject && 
                        <Button style={{backgroundColor : '#CF0201ed' , color : 'White'}} onClick={props.handleAddObject}>{props.titleAddButton}</Button>
                    }
                </div>
            </div>
            <div className='table'>
                <Table
                    scroll={{y : props.size ? props.size : 350}}
                    columns={props.titleOfColumnList}
                    dataSource={props.data}
                    pagination={
                        {
                            total: props.totalRecord,
                            pageSize: props.pageSize,
                            onChange: (event) => {
                                props.onChangePagination(event)

                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

export default CTable