import { SelectProps, UploadFile, UploadProps, Steps, Form, Input, Checkbox, Radio, Button, Upload, Modal, Select } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import { useState, useEffect } from "react";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import { IEditBookReq } from "../../common/book.interface";
import { editBookRequest, getAuthorRequest, getCategoryRequest, getPublisherRequest } from "../../redux/controller";
import { API_URL } from "../../enums/api.enums";
import './CModalEditBook.styles.scss'
import { Option } from "antd/lib/mentions";


interface MyProps{
    open: boolean;
    data?: IEditBookReq;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


const CModalEditBook = (props: MyProps) => {

    const [selectTitle, setSelectTitle] = useState(""); // Biến lưu giá trị tiêu đề sách
    const [selectPrice, setSelectPrice] = useState(0); // Biến lưu giá trị giá sách
    const [selectCategories, setSelectCategories] = useState([]); // Biến lưu giá trị thể loại sách
    const [selectAuthors, setSelectAuthors] = useState([]); // Biến lưu giá trị tác giả
    const [selectPublisher, setSelectPublisher] = useState<string>(""); // Biến lưu giá trị nhà xuất bản
    const [selectDescription, setSelectDescription] = useState<string>(""); // Biến lưu giá trị nhà xuất bản
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');


    const { listCategory , listAuthor , listPublisher} = useSelectorRoot((state) => state.management);
    const dispatch = useDispatchRoot();

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getCategoryRequest())
        dispatch(getAuthorRequest())
        dispatch(getPublisherRequest())
    }, [])

    useEffect(() => {
        if (props.data) {
          setSelectCategories(props.data.categories.map((category : any) => category.id));
          setSelectAuthors(props.data.authors.map((author : any) => author.id));
          setSelectPublisher(props.data?.publisher.id);
        }
      }, [props.data]);

    const handleChangeCategory = (event: any ) => {
        setSelectCategories(event);
    };

    const handleChangeAuthor = (event : any ) => {
        setSelectAuthors(event);
    };

    const handleChangePublisher = (event: any) => {
        setSelectPublisher(event);
    };



    const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 6 }, wrapperCol: { span: 18 } } : null;



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




    const handleEditBook = () => {
        
        const bodyRequest = {
            id : props.data?.id,
            title : form.getFieldsValue().title,
            price : form.getFieldsValue().price,
            description : form.getFieldsValue().description,
            publisherId : selectPublisher,
            authorIds : selectAuthors,
            categoryIds : selectCategories,
        }
        dispatch(editBookRequest(bodyRequest));
        props.setOpenModalEdit(false)

    };

    const handleCancelEditBook = () => {
        setSelectPublisher("")
        setSelectAuthors([])
        setSelectCategories([])
        props.setOpenModalEdit(false)
    }

    const values = Form.useWatch([],form)
    const [checkForm, setCheckForm] = useState(false)
    useEffect(() => {
        form.validateFields({validateOnly : true}).then(
            () => {
                setCheckForm(true)
            },
            () => {
                setCheckForm(false)
            }
        )
    },[values])

    const checkButton = (checkForm && selectAuthors.length > 0 && selectCategories.length > 0 &&  selectPublisher.length > 0)

    return (
        <Modal
            open={props.open}
            onOk={handleEditBook}
            okText={'Cập nhật'}
            onCancel={handleCancelEditBook}
            cancelText={'Hủy'}
            okButtonProps={{disabled : !checkButton }}
            title="Chỉnh sửa sách"
            width={1100}
        >
            <div className="main-upload">
                <div className="upload-area">
                    <Form 
                        initialValues={props.data}
                        form={form} 
                        className="form"
                        {...formItemLayout}
                        layout={formLayout}
                        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}

                    >
                            <Form.Item
                                label="Tên sách"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                            >
                                <Input
                                    className="search-input"
                                    placeholder="Nhập tên sách"
                                />
                            </Form.Item>      
                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng nhập giá sách' }]}
                            >
                                <Input
                                    type="number"
                                    className="search-input"
                                    placeholder="Nhập giá sách"
                                    min={0}
                                />
                            </Form.Item>
                            <Form.Item className="categories" label="Thể Loại" rules={[{ required: true, message: 'Vui lòng chọn thể loại' }]} >
                                <Select
                                id="select-criteria"
                                mode="multiple"
                                className="select-criteria"
                                placeholder="Chọn thể loại"
                                defaultValue={props.data?.categories.map((category : any) => category.id)}
                                onChange={handleChangeCategory}
                                >
                                {listCategory.map((category) => (
                                    <Option key={category.id} value={category.id}>{category.name}</Option>
                                ))}
                                </Select>
                                {selectCategories.length <= 0 && <p style={{ color: 'red' }}>Vui lòng chọn thể loại</p>}
                            </Form.Item>
                            <Form.Item className="authors" label="Tác giả"
                            rules={[{ required: true, message: 'Vui lòng chọn tác giả' }]}
                            >
                                <Select
                                id="select-criteria"
                                mode="multiple"
                                className="select-criteria"
                                placeholder="Chọn thể loại"
                                defaultValue={props.data?.authors.map((author : any) => author.id)}
                                onChange={handleChangeAuthor}
                                >
                                {listAuthor.map((author) => (
                                    <Option key={author.id} value={author.id}>{author.fullName}</Option>
                                ))}
                                </Select>
                                {selectAuthors.length <= 0 && <p style={{ color: 'red' }}>Vui lòng chọn tác giả</p>}
                            </Form.Item>
                            <Form.Item className="publisher" label="Nhà xuất bản"
                            rules={[{ required: true, message: 'Vui lòng chọn nhà xuất bản' }]}
                            >
                                    <Select
                                        id="select-criteria"
                                        className="select-criteria"
                                        placeholder="Chọn nhà xuất bản"
                                        onChange={handleChangePublisher}
                                        defaultValue={props.data?.publisher.id}
                                        >
                                        {listPublisher.map((index) => (
                                            <Option key={index.id} value={index.id}>{index.name}</Option>
                                        ))}
                                    </Select>
                                    {!selectPublisher && <p style={{ color: 'red' }}>Vui lòng chọn nhà xuất bản</p>}
                                </Form.Item>
                            <Form.Item
                                label="Mô tả sách"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng điền mô tả' }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả sách"
                                />
                            </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditBook;
