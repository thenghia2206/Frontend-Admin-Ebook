import React, { useEffect, useState } from "react";
import "./author.styles.scss";
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
import { addAuthorRequest, deleteAuthorRequest, getListAuthorsRequest } from "../../redux/controller";
import CModalEditAuthor from "../../components/modal/CModalEditAuthor";




const Author = () => {

    const Option = Select ;
    const { authors , totalAuthorsRecords} =
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
        dispatch(getListAuthorsRequest(currentSearchValue));
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
        title: "Họ và tên",
        dataIndex: "fullName",
        key: "fullName",
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
            <Tooltip placement="top" title={"Chỉnh sửa"} >
            <EditOutlined onClick={(event) => handleEdit(record)} />
            </Tooltip>
            <Tooltip placement="top" title={"Xóa"}>
            <DeleteOutlined onClick={(event) => handleDelete(record)} />
            </Tooltip>
            
        </Space>
        ),
    },
    ];

    useEffect(() => {
        dispatch(getListAuthorsRequest(currentSearchValue));
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
        dispatch(getListAuthorsRequest(finalBody));
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
    const [newAuthor, setNewAuthor] = useState<any>()
    const onCancelAddAuthor = () => {
        setOpenModalAdd(false)
        setNewAuthor(null)
    }

    const handleAuthorChange = (event: { target: { value: any } }) => {
        setNewAuthor(event.target.value);
    };

    const onAdd = () => {
        const bodyRequest = {
          fullName : newAuthor
        }
        dispatch(addAuthorRequest(bodyRequest))
        setOpenModalAdd(false)
        setNewAuthor(null)
    }

    const [author,setAuthor] = useState()
    const handleEdit = (record: any) => {
        const selectedAuthor : any = {
            id : record.id,
            fullName : record.fullName,
        }
        setAuthor(selectedAuthor) 
        setOpenModalEdit(true);
        console.log(author)
      };

    const handleDelete = (record: any) => {
        const bodyRequest = {
          id : record.id,
        }
        dispatch(deleteAuthorRequest(bodyRequest))
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
            onCancel={onCancelAddAuthor}
            title={"Thêm Tác Giả"}
            className="modal-add-author"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAdd}
          >
          <Form.Item className="title" label="Tên tác giả" >
                <Input style={{width : "70%"}} onChange={handleAuthorChange} />
          </Form.Item>
          <motion.div>
                  {
                    newAuthor?(
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
            <CModalEditAuthor 
                open = {openModalEdit}
                data={author}
                setOpenModalEdit={setOpenModalEdit}
             />
        )}
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách tác giả"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={authors}
          totalRecord={totalAuthorsRecords}
          titleAddButton="Thêm tác giả"
          textSearch="Tên tác giả"
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

export default Author;
