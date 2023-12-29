import { SelectProps, UploadFile, UploadProps, Steps, Form, Input, Checkbox, Radio, Button, Upload, Modal, Select } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import { useState, useEffect } from "react";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import { editAuthorRequest, editBookRequest, editCategoryRequest, getAuthorRequest, getCategoryRequest, getPublisherRequest } from "../../redux/controller";
import { API_URL } from "../../enums/api.enums";
import { Option } from "antd/lib/mentions";
import { IAuthor } from "../../common/author.interface";
import { ICategory } from "../../common/category.interface";
import './CModal.styles.scss'

interface MyProps{
    open: boolean;
    data?: ICategory;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


const CModalEditCategory = (props: MyProps) => {

    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const dispatch = useDispatchRoot();

    const [form] = Form.useForm();

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

    const handleEdit = () => {
        
        const bodyRequest = {
            id : props.data?.id,
            name : form.getFieldsValue().name,
        }
        dispatch(editCategoryRequest(bodyRequest));
        props.setOpenModalEdit(false)

    };

    const handleCancelEdit = () => {
        setNewFullName("")
        props.setOpenModalEdit(false)
    }

    const [newFullName, setNewFullName] = useState("")

    const handleChange = (event: { target: { value: any } }) => {
        setNewFullName(event.target.value);
      };

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

    const checkButton = (checkForm && newFullName.length > 0)

    return (
        <Modal
            open={props.open}
            onOk={handleEdit}
            okText={'Cập nhật'}
            onCancel={handleCancelEdit}
            cancelText={'Hủy'}
            okButtonProps={{disabled : !checkButton }}
            title="Chỉnh thể loại"
            width={500}
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
                                label="Tên thể loại"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên thể loại' }]}
                            >
                                <Input
                                    className="search-input" onChange={handleChange}
                                />
                            </Form.Item>      
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditCategory;
