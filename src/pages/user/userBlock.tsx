import React, { useEffect, useState } from "react";
import "./user.styles.scss";
import { Space, Divider, Tooltip, UploadFile } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { IUser ,
    IGetUsersRequest,
} from "../../common/user.interface";
import { getUserRequest, getUsersStatisticRequest, unblockUsersRequest,
 } from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import TotalBoxUser from "../../components/totalBox/TotalBoxUser";



const UserBlock = () => {

    const Option = Select ;
    const { listUser , totalUserRecords, userStatistic} =
    useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getUsersStatisticRequest())
    }, [totalUserRecords])

    const [currentSearchValue, setCurrentSearchValue] =
    useState<IGetUsersRequest>({
        size: QUERY_PARAM.size,
        offset: 0,
        type : "block",
    });
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getUserRequest(currentSearchValue));
      };

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
        };

    const columns: ColumnType<IUser>[] = [
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
            <Tooltip placement="top" title={"Bỏ chặn"}>
                <EditOutlined onClick={() => handleUnblockUser(record)} />
            </Tooltip>
        </Space>
        ),
    },
    ];

    useEffect(() => {
        dispatch(getUserRequest(currentSearchValue));
      }, []);


    const dispatch = useDispatchRoot();

    const onSearch = () => {
        const body: IGetUsersRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
            type : "block",
        };
        const finalBody = Utils.getRidOfUnusedProperties(body);
        setCurrentSearchValue(finalBody);
        dispatch(getUserRequest(finalBody));
    };

    const handleUnblockUser = (record: any) => {
        const bodyrequest = {
            userId: record.id,
        }
        dispatch(unblockUsersRequest(bodyrequest));
    }

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
    <div className="statistical-user">
        <TotalBoxUser
            key={0}
            title={"Tổng số người dùng"}
            number={userStatistic?.totalUser ? userStatistic?.totalUser.toString() : '0'}
            icon={""}
        />
        <TotalBoxUser
            key={1}
            title={"Tổng số người dùng bị chặn"}
            number={userStatistic?.totalUserBlock ? userStatistic?.totalUserBlock.toString() : '0'}
            icon={""}
        />
    </div>
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách người dùng bị chặn"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={listUser}
          totalRecord={totalUserRecords}
          textSearch="Tên người dùng, email"
          onChangePagination={onChangePagination}
          allowAddObject={true}
          pageSize={10}
        />
      </div>
    </motion.div>
  );
};

export default UserBlock;
