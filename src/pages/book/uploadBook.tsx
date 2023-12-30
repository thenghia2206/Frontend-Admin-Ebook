import React, { useEffect, useState } from "react";
import "./uploadBook.styles.scss";
import { Space, Divider, Tooltip, UploadFile, Steps } from "antd";
import { ColumnType } from "antd/lib/table";
import CTable from "../../components/table/CTable";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import Utils from "../../utils/base-utils";
import { DeleteOutlined, EditOutlined, EyeOutlined, PictureOutlined, PlusOutlined, ProfileOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload , Button} from "antd";
import { addAuthorRequest, addBookRequest, addCategoryRequest, addPublisherRequest, getAuthorRequest, getCategoryRequest, getPublisherRequest, getStaffRequest,
 } from "../../redux/controller";
import { motion } from "framer-motion";
import Modal from "antd/lib/modal/Modal";
import { API_URL } from "../../enums/api.enums";
import { IGetStaffsRequest, IStaff } from "../../common/staff.interface";
import TextArea from "antd/lib/input/TextArea";
import { RcFile, UploadProps } from "antd/lib/upload";
import { useNavigate } from "react-router-dom";
import { TEXT_FIELD, TEXT_INPUT } from "../../enums/common.enum";

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
});

const UploadBook= () => {

    const Option = Select ;
    const { listCategory, listAuthor, listPublisher} =
    useSelectorRoot((state) => state.management);
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0); // Biến kiểm tra bước hiện tại
    const [selectTitle, setSelectTitle] = useState(""); // Biến lưu giá trị tiêu đề sách
    const [selectPrice, setSelectPrice] = useState(0); // Biến lưu giá trị giá sách
    const [selectCategories, setSelectCategories] = useState([]); // Biến lưu giá trị thể loại sách
    const [selectAuthors, setSelectAuthors] = useState([]); // Biến lưu giá trị tác giả
    const [selectPublisher, setSelectPublisher] = useState<string>(""); // Biến lưu giá trị nhà xuất bản
    const [selectDescription, setSelectDescription] = useState<string>(""); // Biến lưu giá trị nhà xuất bản
    const [imageUploadLst, setImageUploadLst] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh sách đã upload
    const [fileUploadLst, setFileUploadList] = useState<RcFile[]>([]); // Biến lưu giá trị file sách đã upload
    const [checkLstImageUploadLst, setCheckLstImageUploadLst] = useState<UploadFile[]>([])
    const [checkLstFileUploadLst, setCheckLstFileUploadLst] = useState<RcFile[]>([])

    const [openModalCategory,setOpenModalCategory] = useState<boolean>(false)
    const [openModalAuthor,setOpenModalAuthor] = useState<boolean>(false)
    const [openModalPublisher,setOpenModalPublisher] = useState<boolean>(false)

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        dispatch(getCategoryRequest());
      }, []);

    useEffect(() => {
        dispatch(getAuthorRequest());
    }, []);
    
    useEffect(() => {
        dispatch(getPublisherRequest());
    }, []);

    const dispatch = useDispatchRoot();

    const handleInputCategoryIdsChange = (event : any) => {
        setSelectCategories(event);
      };

    const handleInputAuthorIdsChange = (event : any) => {
        setSelectAuthors(event);
    };

    const onAddBook = () => {
        let files : any = imageUploadLst
        files.unshift(fileUploadLst.pop())
        const bodyRequest = {
            file : files,
            title : selectTitle,
            categoryIds : selectCategories,
            description : selectDescription,
            authorIds : selectAuthors,
            publisherId : selectPublisher,
            price : selectPrice,
        }
        dispatch(addBookRequest(bodyRequest))
        setImageUploadLst([])
        setFileUploadList([])
        setSelectTitle("")
        setSelectAuthors([])
        setSelectCategories([])
        setSelectPublisher("")
        setSelectDescription("")
        setSelectPrice(0)
        setCheckLstImageUploadLst([])
        navigate("/management/book")
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handlePreview = async (file: UploadFile) => {
        // Hàm xử lý khi click xem ảnh
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const handleClickBackBtn = () => {
        // Hàm xử lý khi click nút quay lại

        setCurrent(current - 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleClickNextBtn = () => {
        // Hàm xử lý khi click nút tiếp theo
        setCurrent(current + 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
            }) => {
        setCheckLstImageUploadLst(newFileList);
    };

    const uploadButton = // Hàm xử lý khi click upload ảnh
    (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

    const handleCancelPreview = () => setPreviewOpen(false); // Hàm xử lý khi click hủy xem ảnh
    
    const [newCategory,setNewCategory] = useState(null)
    const [newAuthor,setNewAuthor] = useState(null)
    const [newPublisher,setNewPublisher] = useState(null)

    const onAddCategory = () => {
        const bodyRequest = {
          name : newCategory
        }
        dispatch(addCategoryRequest(bodyRequest))
        setOpenModalCategory(false)
        setNewCategory(null)
    }

    const onCancelAddCategory = () => {
        setOpenModalCategory(false)
        setNewCategory(null)
    }

    const onAddAuthor = () => {
        const bodyRequest = {
          fullName : newAuthor
        }
        dispatch(addAuthorRequest(bodyRequest))
        setOpenModalAuthor(false)
        setNewAuthor(null)
    }

    const onCancelAddAuthor = () => {
        setOpenModalAuthor(false)
        setNewAuthor(null)
    }

    const onAddPublisher = () => {
        const bodyRequest = {
          name : newPublisher
        }
        dispatch(addPublisherRequest(bodyRequest))
        setOpenModalPublisher(false)
        setNewPublisher(null)
    }

    const onCancelAddPublisher = () => {
        setOpenModalPublisher(false)
        setNewPublisher(null)
    }

    const handleCategoryChange = (event: { target: { value: any } }) => {
        setNewCategory(event.target.value);
      };

    const handleAuthorChange = (event: { target: { value: any } }) => {
        setNewAuthor(event.target.value);
    };

    const handlePublisherChange = (event: { target: { value: any } }) => {
        setNewPublisher(event.target.value);
    };

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
    <div className="main-upload">
        <div className="upload-area">
        <Steps
                    responsive={false}
                    direction="horizontal"
                    className="upload-step"
                    current={current}
                    items={
                        windowSize[0] >= 850
                            ? [

                                {
                                    title: "Thông tin sách",
                                    icon: <ProfileOutlined />,
                                },
                                {
                                    title: "Upload file sách",
                                    icon: <PictureOutlined />,
                                },
                            ]
                            : [

                                {
                                    // title: 'Mô tả bản vẽ',
                                    icon: <ProfileOutlined />,
                                },
                                {
                                    // title: 'Thông tin bản vẽ',
                                    icon: <PictureOutlined />,
                                },
                            ]
                    }
                />
            <Form className="form">
                <div className="sketch-content-area">
                {current == 0 && (
                    <div className="content-area">
                        <div className="sketch-content">
                            <div className="title">Mô tả sách</div>
                                <div className="description">
                                    Vui lòng nhập các thông tin chung
                                </div>
                                <Form.Item>
                                    <div className="title-input">
                                        Tên sách <strong>*</strong>
                                    </div>
                                    <div className={`header-content-input`}>
                                        <Input
                                            className="search-input"
                                            placeholder="Nhập tiêu đề"
                                            onChange={(e) =>
                                                setSelectTitle(
                                                    e.target.value
                                                )
                                            }
                                            maxLength={TEXT_INPUT.MAX_LENGTH}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <div className="title-input">
                                        Giá (VNĐ){" "}
                                        <strong>*</strong>
                                    </div>
                                    <div className={`header-content-input`}>
                                        <Input
                                            type="number"
                                            className="search-input"
                                            placeholder="Nhập giá"
                                            min={1}
                                            onChange={(e) =>
                                                setSelectPrice(parseInt(e.target.value))
                                            }
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item className="categories" label="Thể Loại">
                                    <Select
                                        id="select-criteria"
                                        mode="multiple"
                                        className="select-criteria"
                                        placeholder="Chọn thể loại"
                                        onChange={handleInputCategoryIdsChange}
                                        style={{width : '40%'}}
                                        >
                                        {listCategory.map((index : any) => (
                                            <Option key={index.id} value={index.id}>{index.name}</Option>
                                        ))}
                                    </Select>
                                    <Tooltip placement="right" title={"Thêm Mới"}>
                                        <Button onClick={ () => setOpenModalCategory(true)} ><PlusOutlined /></Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item className="authors" label="Tác Giả">
                                    <Select
                                        id="select-criteria"
                                        mode="multiple"
                                        className="select-criteria"
                                        placeholder="Chọn tác giả"
                                        onChange={handleInputAuthorIdsChange}
                                        style={{width : '40%'}}
                                        >
                                        {listAuthor.map((index) => (
                                            <Option key={index.id} value={index.id}>{index.fullName}</Option>
                                        ))}
                                    </Select>
                                    <Tooltip placement="right" title={"Thêm Mới"}>
                                        <Button onClick={() => setOpenModalAuthor(true)} ><PlusOutlined  /></Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item className="publisher" label="Nhà xuất bản">
                                    <Select
                                        id="select-criteria"
                                        className="select-criteria"
                                        placeholder="Chọn nhà xuất bản"
                                        onChange={(value) =>
                                                setSelectPublisher(value)
                                            }
                                        style={{width : '40%'}}
                                        >
                                        {listPublisher.map((index) => (
                                            <Option key={index.id} value={index.id}>{index.name}</Option>
                                        ))}
                                    </Select>
                                    <Tooltip placement="right" title={"Thêm Mới"}>
                                        <Button onClick={() => setOpenModalPublisher(true)} ><PlusOutlined  /></Button>
                                    </Tooltip>
                                </Form.Item>
                        </div>
                        <motion.div className="btn-submit-upload">
                            {
                                selectTitle &&
                                    selectCategories &&
                                    selectAuthors &&
                                    selectPublisher &&
                                    selectPrice > 0 ? (
                                    <Button
                                        onClick={() => handleClickNextBtn()}
                                    >
                                        Tiếp tục
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleClickNextBtn()}
                                        disabled
                                    >
                                        Tiếp tục
                                    </Button>
                                )}
                        </motion.div>
                    </div>
                )}
                {current == 1 && (
                    <div className="content-area">
                        <div className="sketch-content">
                        <div className="image">
                            <Form.Item
                                    className="thumbnail"
                                    valuePropName="imageList"
                                >
                                    <div className="title-input">
                                        Hình ảnh <strong>*</strong>
                                    </div>
                                    <Upload
                                        multiple
                                        onRemove={(file) => {
                                            let tmplst = imageUploadLst;
                                            tmplst.filter((value,index,arr) => {
                                                if (value.name === file.name) {
                                                // Removes the value from the original array
                                                    arr.splice(index, 1);
                                                    return true;
                                                }
                                                return false;
                                            })
                                            

                                            setImageUploadLst(tmplst)
                                            return true
                                        }}
                                        listType="picture-card"
                                        showUploadList={{
                                            showRemoveIcon: true,
                                        }}
                                        onChange={(file) => {
                                            handleChangeFileLst(file)
                                            console.log(imageUploadLst)
                                        }}
                                        accept=".png, .jpeg, .jpg"
                                        beforeUpload={(file) => {
                                            let tmplst = imageUploadLst;
                                            tmplst.push(file);
                                            setImageUploadLst(tmplst);
                                            return false;
                                        }}
                                    >
                                        {imageUploadLst.length >= 8
                                            ? null
                                            : uploadButton}
                                    </Upload>
                                    <Modal
                                        open={previewOpen}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handleCancelPreview}
                                    >
                                        <img
                                            alt="example"
                                            style={{ width: "100%" }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </Form.Item>
                                <Form.Item
                                    className="image-list"
                                    valuePropName="fileList"
                                >
                                    <div className="title-input">
                                        Tải file sách{" "}
                                        <strong>*</strong>
                                    </div>
                                    <Upload.Dragger
                                        maxCount={1}
                                        listType="picture"
                                        action={
                                            "https://localhost:3000/"
                                        }
                                        showUploadList={{
                                            showRemoveIcon: true,
                                        }}
                                        onChange={(info) => {
                                            setCheckLstFileUploadLst(info.fileList as RcFile[])
                                        }}
                                        accept=".pdf"
                                        beforeUpload={(file) => {
                                            let tmplst = fileUploadLst;
                                            tmplst.push(file);
                                            setFileUploadList(tmplst);
                                            return false;
                                        }}
                                        progress={{
                                            strokeWidth: 3,
                                            strokeColor: {
                                                "0%": "#a9eab3",
                                                "100%": "#27CA40",
                                            },
                                            style: { top: 12 },
                                        }}
                                    >
                                        Click hoặc kéo file sách vào
                                        đây (file .pdf)
                                        <br />
                                    </Upload.Dragger>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="title-input">
                                    Mô tả chi tiết <strong>*</strong>
                                </div>
                                <div className={`header-content-input`}>
                                    <TextArea
                                        rows={4}
                                        placeholder="Nhập mô tả"
                                        onChange={(e) =>
                                            setSelectDescription(e.target.value)
                                        }
                                        maxLength={TEXT_FIELD.MAX_LENGTH}
                                    />
                                </div>
                            </Form.Item>  
                        </div>
                        <motion.div className="btn-submit-upload">
                            <Button
                                className="btn-back"
                                onClick={() => handleClickBackBtn()}
                            >
                                Quay lại
                            </Button>
                            {
                                selectAuthors.length > 0 && selectTitle && selectPrice && selectCategories.length > 0 && selectPublisher && checkLstImageUploadLst &&
                                checkLstImageUploadLst.length > 0 && checkLstFileUploadLst && checkLstFileUploadLst.length > 0 && selectDescription ?(
                                <Button onClick={() => onAddBook()}>
                                Thêm Sách 
                                </Button>
                                ) : (
                                <Button disabled>
                                Thêm Sách
                                </Button>
                                )
            
                            }
                        </motion.div>
                    </div>
                )} 
              </div>                
            </Form>
        </div>
        { openModalCategory && (
            <Modal
            open={openModalCategory}
            onOk={() => setOpenModalCategory(false)}
            closable={true}
            onCancel={onCancelAddCategory}
            title={"Thêm Thể Loại"}
            className="modal-add-category"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAddCategory}
          >
          <Form.Item className="title" label="Tên Thể Loại" >
                <Input style={{width : "70%"}} onChange={handleCategoryChange} />
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
        { openModalAuthor && (
            <Modal
            open={openModalAuthor}
            onOk={() => setOpenModalAuthor(false)}
            closable={true}
            onCancel={onCancelAddAuthor}
            title={"Thêm Tác Giả"}
            className="modal-add-author"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAddAuthor}
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
        { openModalPublisher && (
            <Modal
            open={openModalPublisher}
            onOk={() => setOpenModalPublisher(false)}
            closable={true}
            onCancel={onCancelAddPublisher}
            title={"Thêm Nhà Xuất Bản"}
            className="modal-add-publisher"
            footer={false}
            width={500}>
          <>
          <Form
              onFinish={onAddPublisher}
          >
          <Form.Item className="title" label="Tên nhà xuất bản" >
                <Input style={{width : "70%"}} onChange={handlePublisherChange} />
          </Form.Item>
          <motion.div>
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
    </div>
  );
};

export default UploadBook;
