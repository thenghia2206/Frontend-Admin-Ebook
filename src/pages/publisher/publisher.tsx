import React, { useEffect, useState } from "react";
import "./publisher.styles.scss";
import { Space, Divider, Tooltip, UploadFile } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import { IAuthor } from "../../common/author.interface";
import { addPublisherRequest, deletePublisherRequest, getListAuthorsRequest, getListCategoriesRequest, getListPublishersRequest } from "../../redux/controller";
import CModalEditPublisher from "../../components/modal/CModalEditPublisher";




const Publisher = () => {

    const Option = Select ;
    const { publishers, totalPublishersRecords} =
    useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState("");
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [currentSearchValue, setCurrentSearchValue] =
    useState<any>({
        size: QUERY_PARAM.size,
        offset: 0,
    });
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getListPublishersRequest(currentSearchValue));
      };

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
        };

    const columns: ColumnType<IAuthor>[] = [
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
        title: "Tên nhà xuất bản",
        dataIndex: "name",
        key: "name",
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
            <Tooltip placement="top" title={"Chỉnh sửa"}>
            <EditOutlined onClick={(event) => handleEdit(record)} />
            </Tooltip>
            <Tooltip placement="top" title={"Xóa"}>
            <DeleteOutlined  onClick={(event) => handleDelete(record)} />
            </Tooltip>
            
        </Space>
        ),
    },
    ];

    useEffect(() => {
        dispatch(getListPublishersRequest(currentSearchValue));
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
        dispatch(getListPublishersRequest(finalBody));
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

    const [newPublisher, setNewPublisher] = useState<any>()
    const onCancelAdd = () => {
        setOpenModalAdd(false)
        setNewPublisher(null)
    }

    const handleChange = (event: { target: { value: any } }) => {
        setNewPublisher(event.target.value);
    };

    const onAdd = () => {
        const bodyRequest = {
          name : newPublisher
        }
        dispatch(addPublisherRequest(bodyRequest))
        setOpenModalAdd(false)
        setNewPublisher(null)
    }

    const [publisher,setPublisher] = useState()
    const handleEdit = (record: any) => {
        const selected : any = {
            id : record.id,
            name : record.name,
        }
        setPublisher(selected) 
        setOpenModalEdit(true);
      };

    const handleDelete = (record: any) => {
        const bodyRequest = {
          id : record.id,
        }
        dispatch(deletePublisherRequest(bodyRequest))
    };


  return (
    <motion.div
      className="sketch-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    { openModalAdd && (
            <Modal
            open={openModalAdd}
            onOk={() => setOpenModalAdd(false)}
            closable={true}
            onCancel={onCancelAdd}
            title={"Thêm nhà xuất bản"}
            className="modal-add"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAdd}
          >
          <Form.Item className="title" label="Tên NXB" >
                <Input style={{width : "100%"}} onChange={handleChange} />
          </Form.Item>
          <motion.div style={{display : "flex",justifyContent : "center"}}>
                  {
                    newPublisher?(
                      <Button type="primary" htmlType="submit">
                      Thêm
                    </Button>
                    ) : (
                      <Button type="primary" htmlType="submit" disabled>
                      Thêm
                      </Button>
                    )
 
                  }
          </motion.div>
          </Form>
          </>
        </Modal>
        )}
    { openModalEdit && (
        <CModalEditPublisher 
            open = {openModalEdit}
            data={publisher}
            setOpenModalEdit={setOpenModalEdit}
        />
    )}
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách nhà xuất bản"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={publishers}
          totalRecord={totalPublishersRecords}
          titleAddButton="Thêm NXB"
          textSearch="Tên nhà xuất bản"
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

export default Publisher;
