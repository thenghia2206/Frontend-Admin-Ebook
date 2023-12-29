import React, { useEffect, useState } from "react";
import "./history.styles.scss";
import { Space, Divider, Tooltip, UploadFile } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { getHistoryRequest,
 } from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import { IGetHistoriesRequest, IHistory } from "../../common/history.interface";



const History = () => {

    const Option = Select ;
    const { listHistory , totalHistoryRecords} =
    useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [currentSearchValue, setCurrentSearchValue] =
    useState<IGetHistoriesRequest>({
        size: QUERY_PARAM.size,
        offset: 0,
        type : "ALL",
    });
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getHistoryRequest(currentSearchValue));
      };

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
        };

    const columns: ColumnType<IHistory>[] = [
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
        title: "Tên sách",
        dataIndex: "bookName",
        key: "bookName",
    },
    {
        title: "Người thực hiện",
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{record.admin.fullName}</div>
            </div>
            ),
    },
    {
        title: "Email người thực hiện",
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{record.admin.email}</div>
            </div>
            ),
    },
    {
        title: "Thời gian thực hiện",
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
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: "center" }} >{Utils.formatMethod(record.method)}</div>
            </div>
            ),
    },
    ];

    useEffect(() => {
        dispatch(getHistoryRequest(currentSearchValue));
      }, []);


    const dispatch = useDispatchRoot();

    const onSearch = () => {
        const body: IGetHistoriesRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            type: textSearch,
        };
        const finalBody = Utils.getRidOfUnusedProperties(body);
        setCurrentSearchValue(finalBody);
        dispatch(getHistoryRequest(finalBody));
    };


    // const handleDetail = (record: any) => {
    //     const bodyrequest = {
    //         id: record.id,
    //     };
    //     dispatch(getDetailBookRequests(bodyrequest));
    //     setOpenModal(true);
    // };



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
      <div className="table-area">
        <CTable
          tableMainTitle="Lịch sử"
          onChangeInput={onChangeInput}
          titleOfColumnList={columns}
          data={listHistory}
          totalRecord={totalHistoryRecords}
          onChangePagination={onChangePagination}
          allowAddObject={true}
          pageSize={10}
          size={450}
        />
      </div>
    </motion.div>
  );
};

export default History;
