import React, { useEffect, useState } from "react";
import "./book.styles.scss";
import { Space, Divider, Tooltip, UploadFile, Rate } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import TotalBoxUser from "../../components/totalBox/TotalBoxUser";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { BookOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import {
  IBook,
  ICategory,
  IEditBookReq,
  IGetBooksRequest,
  IReqGetLatestBooks,
} from "../../common/book.interface";
import {
  addCategoryRequest,
  deleteBookRequest,
  editBookRequest,
  getBookRequest,
  getCategoryRequest,
  getDetailBookRequests,
} from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import CKEditorComponent from "../../components/CKEditorComponent";
import * as parse from 'html-react-parser'
import DOMPurify from 'dompurify';
import { RcFile } from "antd/lib/upload";
import { API_URL } from "../../enums/api.enums";
import TextArea from "antd/lib/input/TextArea";
import { AiOutlineEdit } from "react-icons/ai";
import CModalEditSketch from "../../components/modalEditBook/CModalEditBook";
import CModalEditBook from "../../components/modalEditBook/CModalEditBook";


function escapeHtml(html : any) {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Book = () => {

  const Option = Select ;
  const { bookList, totalBookRecords, detailBook, listCategory , listAuthor, listPublisher } =
    useSelectorRoot((state) => state.management);

  const [textSearch, setTextSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditBook, setOpenModalEditBook] = useState(false);

  const [currentSearchValue, setCurrentSearchValue] =
    useState<IGetBooksRequest>({
      size: QUERY_PARAM.size,
      offset: 0,
    });

  const columns: ColumnType<IBook>[] = [
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
      title: "Tên Sách",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      key: "author",
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: "center" }} >{record.authors
                  .map((author: any) => author.fullName)
                  .join(", ")}</div>
        </div>
      ),
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
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: "center" }} >{Utils.formatMoney(record.price)} VNĐ</div>
        </div>
      ),
    },
    {
      title: "Ảnh Bìa",
      dataIndex: "cover",
      key: "cover",
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ width: "90px" , height : "110px"}} src={`${API_URL.IMAGE_URL}/${record.image}`} />
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ display : 'flex' , justifyContent : 'center'}}>
          <Tooltip placement="top" title={"Chỉnh Sửa"}>
            <EditOutlined onClick={(event) => handleEditBook(record)}/>
          </Tooltip>
          <Tooltip placement="top" title={"Xem Chi Tiết"}>
            <EyeOutlined onClick={(event) => handleDetail(record)} />
          </Tooltip>
          <Tooltip placement="top" title={"Xóa"}>
            <DeleteOutlined onClick={(event) => handleDelete(record)} />
          </Tooltip>
          
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getBookRequest(currentSearchValue));
  }, []);

  const onChangeInput = (event: any) => {
    setTextSearch(event.target.value);
  };

  const dispatch = useDispatchRoot();

  const onSearch = () => {
    const body: IGetBooksRequest = {
      size: QUERY_PARAM.size,
      offset: 0,
      search: textSearch,
    };
    const finalBody = Utils.getRidOfUnusedProperties(body);
    setCurrentSearchValue(finalBody);
    dispatch(getBookRequest(finalBody));
  };

  const onChangePagination = (event: any) => {
    currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
    setCurrentSearchValue(currentSearchValue);
    dispatch(getBookRequest(currentSearchValue));
  };

  const handleDetail = (record: any) => {
    const bodyrequest = {
      id: record.id,
    };
    dispatch(getDetailBookRequests(bodyrequest))
    setOpenModal(true);
  };

  const [bookDetailEdit, setBookDetailEdit] = useState()

  const handleEditBook = (record: any) => {
    setOpenModalEditBook(true);

    const selectedBook : any = {
        id : record.id,
        title : record.title,
        price : record.price,
        description : record.description,
        authors : record.authors,
        publisher : record.publisher,
        categories : record.categories,
    }
    dispatch(getDetailBookRequests(selectedBook))
    setBookDetailEdit(selectedBook) 
  };


  useEffect(() => {
    dispatch(getCategoryRequest())
  },[])


  const handleDelete = (record: any) => {
      const bodyRequest = {
        id : record.id,
      }
      dispatch(deleteBookRequest(bodyRequest))
  };



  const [categoryModal, setCategoryModal] = useState(false);
  const handleCategory = () => {
    setCategoryModal(true)
  };

  const [category, setCategory] = useState("");
  
  const handleCategoryChange = (event: { target: { value: any } }) => {
    setCategory(event.target.value);
  };

  const onAddCategory = () => {
    const bodyRequest = {
      name : category
    }
    dispatch(addCategoryRequest(bodyRequest))
    setCategoryModal(false)
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

  const modalFooter = (
    <Button key="cancel" onClick={() => setOpenModal(false)}>
      Đóng
    </Button>
  );


  return (
    <motion.div
      className="sketch-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {detailBook && openModal && (
        <Modal
          open={openModal}
          onOk={() => setOpenModal(false)}
          closable={true}
          onCancel={() => setOpenModal(false)}
          title={"Chi Tiết Sách"}
          className="modal-detail-book"
          footer={modalFooter}
          width={1400}
        >
          <div className='profile-content' style={{marginTop : "-150px" , marginBottom : "-100px"}}>
            <div className='profile-content-left'>
                <img className='profile-content-avatar'  src={`${API_URL.IMAGE_URL}/${detailBook.image}`} alt='' />
            </div>
            <div className='profile-content-right'>
              <div className="title" style={{ fontWeight: "500" , fontSize : "clamp(1em, 4vw, 2em)", lineHeight : "48px"}}>{detailBook.title}</div>
              <div className="price" style={{ fontWeight: "500" , fontSize : "clamp(1em, 3.5vw, 1.5em)", lineHeight : "48px" , color : "#C30200"}}>
                {Utils.formatMoney(detailBook.price)} VNĐ
              </div>
                <div className="property" style={{margin : "1em 0",display : "grid", gridTemplateColumns : "auto auto", gap : "1em"}}>
                      <div className="content">
                          <ClockCircleOutlined />
                          <div className="text">
                              Ngày đăng:{" "}
                              {new Date(
                                  detailBook.createdAt
                              ).toLocaleDateString("en-GB")}
                          </div>
                      </div>
                      <div className="content">
                          <TeamOutlined />
                          <div className="text">
                              Tác giả:
                              {detailBook.authors.map((author : any, index : any) =>
                                  index ===
                                      detailBook.authors.length - 1 ? (
                                      <span key={index}>
                                          {" "}
                                          {author.fullName}
                                      </span>
                                  ) : (
                                      <span key={index}>
                                          {" "}
                                          {author.fullName},
                                      </span>
                                  )
                              )}
                          </div>
                      </div>
                      <div className="content">
                          <BookOutlined />
                          <div className="text">
                              Thể loại:
                              {detailBook.categories.map((category : any, index : any) =>
                                  index ===
                                      detailBook.categories.length - 1 ? (
                                      <span key={index}>
                                          {" "}
                                          {category.name}
                                      </span>
                                  ) : (
                                      <span key={index}>
                                          {" "}
                                          {category.name},
                                      </span>
                                  )
                              )}
                          </div>
                      </div>
                      <div className="content">
                          <UserOutlined />
                          <div className="text">
                              Nhà xuất bản:{" "}
                              {detailBook.publisher.name}
                          </div>
                      </div>
                  </div>
                  <div className="description">
                      <div className="des-title">Mô tả</div>
                      <div className="des-text">
                          {detailBook.description}
                      </div>
                  </div>
            </div>
        </div>
        </Modal>
      )}
      {detailBook && openModalEditBook && 
        <CModalEditBook 
            open = {openModalEditBook}
            data={bookDetailEdit}
            setOpenModalEdit={setOpenModalEditBook}
        />
      }
      <div className="table-area">
        <CTable
          tableMainTitle="Thông Tin Sách"
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onSearch={onSearch}
          titleOfColumnList={columns}
          data={bookList}
          totalRecord={totalBookRecords}
          onChangePagination={onChangePagination}
          allowAddObject={true}
          textSearch="Tên Sách, Tác Giả"
          pageSize={10}
          size={450}
        />
      </div>
    </motion.div>
  );
};

export default Book;
