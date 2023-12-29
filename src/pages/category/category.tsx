import React, { useEffect, useState } from "react";
import "./category.styles.scss";
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
import { addCategoryRequest, deleteCategoryRequest, getListAuthorsRequest, getListCategoriesRequest } from "../../redux/controller";
import CModalEditCategory from "../../components/modal/CModalEditCategory";




const Category = () => {

    const Option = Select ;
    const { categories, totalCategoriesRecords} =
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
        dispatch(getListCategoriesRequest(currentSearchValue));
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
        title: "Tên thể loại",
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
            <Tooltip placement="top" title={"Chỉnh sửa"} >
            <EditOutlined onClick={(event) => handleEdit(record)} />
            </Tooltip>
            <Tooltip placement="top" title={"Xóa"}>
            <DeleteOutlined onClick={(event) => handleDelete(record)}  />
            </Tooltip>
            
        </Space>
        ),
    },
    ];

    useEffect(() => {
        dispatch(getListCategoriesRequest(currentSearchValue));
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
        dispatch(getListCategoriesRequest(finalBody));
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

    const [newCategory, setNewCategory] = useState<any>()
    const onCancelAdd = () => {
        setOpenModalAdd(false)
        setNewCategory(null)
    }

    const handleChange = (event: { target: { value: any } }) => {
        setNewCategory(event.target.value);
    };

    const onAdd = () => {
        const bodyRequest = {
          name : newCategory
        }
        dispatch(addCategoryRequest(bodyRequest))
        setOpenModalAdd(false)
        setNewCategory(null)
    }

    const [category,setCategory] = useState()
    const handleEdit = (record: any) => {
        const selected : any = {
            id : record.id,
            name : record.name,
        }
        setCategory(selected) 
        setOpenModalEdit(true);
      };

    const handleDelete = (record: any) => {
        const bodyRequest = {
          id : record.id,
        }
        dispatch(deleteCategoryRequest(bodyRequest))
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
            title={"Thêm thể loại"}
            className="modal-add"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAdd}
          >
          <Form.Item className="title" label="Tên thể loại" >
                <Input style={{width : "70%"}} onChange={handleChange} />
          </Form.Item>
          <motion.div>
                  {
                    newCategory?(
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
    {openModalEdit && (
        <CModalEditCategory
            open = {openModalEdit}
            data={category}
            setOpenModalEdit={setOpenModalEdit}
        />
    )}
      <div className="table-area">
        <CTable
          tableMainTitle="Danh sách thể loại"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={categories}
          totalRecord={totalCategoriesRecords}
          titleAddButton="Thêm thể loại"
          textSearch="Tên thể loại"
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

export default Category;
