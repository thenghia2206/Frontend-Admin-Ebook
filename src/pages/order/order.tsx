import React, { useEffect, useState } from "react";
import "./order.styles.scss";
import { Space, Divider, Tooltip, UploadFile } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, KeyOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { deleteStaffRequest, getDetailOrderRequests, getOrderRequest, getStaffRequest,
 } from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import { IGetStaffsRequest, IStaff } from "../../common/staff.interface";
import CModalAddStaff from "../../components/modal/CModalAddStaff";
import { IOrder } from "../../common/order.interface";



const Order = () => {

    const Option = Select ;
    const { listOrder , totalOrderRecords,detailOrder} =
    useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [currentSearchValue, setCurrentSearchValue] =
    useState<any>({
        size: QUERY_PARAM.size,
        offset: 0,
    });
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getStaffRequest(currentSearchValue));
      };

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
        };

    const columns: ColumnType<IOrder>[] = [
    {
        title: "Số thứ tự",
        render: (_, __, rowIndex) => (
        <div className="span-table" style={{ textAlign: "center" }}>
            {rowIndex + 1}
        </div>
        ),
        width: "120px",
    },
    {
        title: "Mã đơn",
        dataIndex: "codeOrder",
        key: "codeOrder",
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{record.codeOrder}</div>
            </div>
        ),
    },
    {
        title: "Số lượng sản phẩm",
        dataIndex: "totalBook",
        key: "totalBook",
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{record.totalBook}</div>
            </div>
        ),
        width: "200px",
    },
    {
        title: "Tổng giá trị",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (_, record) => (
            <div>{Utils.formatMoneyToVnd(record.totalPrice)}</div>
        ),
        width: "200px",
    },
    {
        title: "Tên người mua",
        dataIndex: "userName",
        key: "userName",
        render: (_, record) => (
            <div>{record.user.fullName}</div>
        ),
    },
    {
        title: "Thời gian mua",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: "center" }} >{new Date(record.createdAt).toLocaleDateString("en-GB")}</div>
        </div>
        ),
    },
    {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
        <Space size="middle" style={{ display : 'flex' , justifyContent : 'center'}}>
            <Tooltip placement="top" title={"Xem chi tiết"} >
            <EyeOutlined onClick={() => handleDetail(record)} />
            </Tooltip>
            
        </Space>
        ),
    },
    ];

    useEffect(() => {
        dispatch(getOrderRequest(currentSearchValue));
      }, []);


    const dispatch = useDispatchRoot();

    const onSearch = () => {
        const body: any = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
        };
        const finalBody = Utils.getRidOfUnusedProperties(body);
        setCurrentSearchValue(finalBody);
        dispatch(getOrderRequest(finalBody));
    };

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    const handleDetail = (record: any) => {
        const bodyrequest = {
            id: record.id,
        }
        dispatch(getDetailOrderRequests(bodyrequest));
        setOpenModal(true)
    }

  return (
    <motion.div
      className="sketch-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
                {
                detailOrder && openModal &&
                <Modal
                    open={openModal}
                    onOk={() => setOpenModal(false)}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={() => setOpenModal(false)}
                    title={'Chi tiết đơn hàng'}
                    className='modal-detail-bill'
                    footer={false}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tổng tiền:</div>
                            <div>{Utils.formatMoneyToVnd(detailOrder.totalPrice)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tạo lúc: </div>
                            <div>{new Date(detailOrder.createdAt).toLocaleDateString('en-GB')}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Mã đơn hàng:</div>
                            <div>{detailOrder.codeOrder}</div>
                        </div>
                        <Divider>Thông tin người mua</Divider>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailOrder.user.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailOrder.user.fullName}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailOrder.user.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailOrder.user.phoneNumber}</div>
                            </div>
                        </div>
                        <Divider>Danh sách sản phẩm</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailOrder.book.map((item: any, index: number) => {
                                return (
                                    <div style={{ marginBottom: "30px" }}>
                                        <div><b>Sản phẩm {index + 1}:</b>
                                            <div style={{display : "flex", justifyContent : "center"}}>
                                                <img style={{ width: "200px" }} src={`${API_URL.IMAGE_URL}/${item.image}`} />
                                            </div>
                                            <br></br>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tiêu đề:</div>
                                                <div>{item.title}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Giá:</div>
                                                <div>{Utils.formatMoneyToVnd(item.price)}</div></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Modal>
            }
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách đơn hàng"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={listOrder}
          totalRecord={totalOrderRecords}
          textSearch="Mã đơn hàng"
          onChangePagination={onChangePagination}
          allowAddObject={true}
          pageSize={10}
          size={450}
        />
      </div>
    </motion.div>
  );
};

export default Order;
