import React, { useEffect, useState } from "react";
import "./staff.styles.scss";
import { Space, Divider, Tooltip, UploadFile } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, KeyOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { deleteStaffRequest, getStaffRequest,
 } from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import { IGetStaffsRequest, IStaff } from "../../common/staff.interface";
import CModalAddStaff from "../../components/modal/CModalAddStaff";



const Staff = () => {

    const Option = Select ;
    const { listStaff, totalStaffRecords} =
    useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState("");
    const [openModalAdd, setOpenModalAdd] = useState(false);

    const [currentSearchValue, setCurrentSearchValue] =
    useState<IGetStaffsRequest>({
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

    const columns: ColumnType<IStaff>[] = [
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
        title: "Họ và tên",
        dataIndex: "fullName",
        key: "fullName",
    },
    {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        render: (_, record) => (
            <Space size="middle">
                <p>{Utils.formatPhoneNumber(record.phoneNumber)}</p>
            </Space>
        ),
        },
    {
        title: "email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Thời gian tạo",
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
            <Tooltip placement="top" title={"Xóa"} >
            <DeleteOutlined onClick={() => handleDeleteStaff(record)} />
            </Tooltip>
            
        </Space>
        ),
    },
    ];

    const [staffIdReset , setStaffIdReset] = useState("")

    const handleDeleteStaff = (value : any) => {
        const bodyRequest = {
            id : value.id
        }
        dispatch(deleteStaffRequest(bodyRequest))
    }

    useEffect(() => {
        dispatch(getStaffRequest(currentSearchValue));
      }, []);


    const dispatch = useDispatchRoot();

    const onSearch = () => {
        const body: IGetStaffsRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
        };
        const finalBody = Utils.getRidOfUnusedProperties(body);
        setCurrentSearchValue(finalBody);
        dispatch(getStaffRequest(finalBody));
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

  return (
    <motion.div
      className="sketch-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    { openModalAdd && (
        <CModalAddStaff
        open = {openModalAdd}
        setOpenModal={setOpenModalAdd}
        />
    )}
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách nhân viên"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={listStaff}
          totalRecord={totalStaffRecords}
          titleAddButton="Thêm nhân viên"
          textSearch="Tên nhân viên, email"
          onChangePagination={onChangePagination}
          allowAddObject={true}
          pageSize={10}
          size={450}
          handleAddObject={() => setOpenModalAdd(true)}
        />
      </div>
    </motion.div>
  );
};

export default Staff;
