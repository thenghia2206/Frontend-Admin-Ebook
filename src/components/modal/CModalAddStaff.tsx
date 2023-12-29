import { SelectProps, UploadFile, UploadProps, Steps, Form, Input, Checkbox, Radio, Button, Upload, Modal, Select, DatePicker } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import { useState, useEffect } from "react";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import { editAuthorRequest, editBookRequest, getAuthorRequest, getCategoryRequest, getPublisherRequest, registerRequest } from "../../redux/controller";
import { API_URL } from "../../enums/api.enums";
import { Option } from "antd/lib/mentions";
import { IAuthor } from "../../common/author.interface";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import './CModalAddStaff.styles.scss'
import moment from "moment";
import { TEXT_FIELD, TEXT_INPUT } from "../../enums/common.enum";

interface MyProps{
    open: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const CModalAddStaff = (props: MyProps) => {

    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const [form] = Form.useForm();
    const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 6 }, wrapperCol: { span: 18 } } : null;

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);


    const [userNameReq, setUserNameReq] = useState<string>("");
    const [userNumberPhoneReq, setUserNumberPhoneReq] = useState<string>("");
    const [userEmailReq, setUserEmailReq] = useState<string>("");
    const [userGenderReq, setUserGenderReq] = useState(null)
    const [userDobReq, setUserDobReq] = useState<Date>()
    const [userAddressReq, setUserAddressReq] = useState("")
    const [userPassReq, setUserPassReq] = useState<string>("");
    const [userConfirmPassReq, setUserConfirmPassReq] = useState<string>("");
    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);
    const dispatch = useDispatchRoot();
    const { registerSuccess } = useSelectorRoot((state) => state.login);

    useEffect(() => {
        userNameReq &&
            regexPhoneNumber.test(userNumberPhoneReq) &&
            regexEmail.test(userEmailReq) &&
            userGenderReq != null &&
            userDobReq &&
            userAddressReq.length > 0 
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userNameReq,
        userNumberPhoneReq,
        userEmailReq,
        userAddressReq,
        userDobReq,
        userGenderReq,
    ]);


    const handleInputNameReqChange = (event: { target: { value: any } }) => {
        setUserNameReq(event.target.value);
    };
    const handleInputPhoneNumberReqChange = (event: {
        target: { value: any };
    }) => {
        setUserNumberPhoneReq(event.target.value);
    };
    const handleInputEmailReqChange = (event: { target: { value: any } }) => {
        setUserEmailReq(event.target.value);
    };
    const handleInputGenderReqChange = (event: any ) => {
        setUserGenderReq(event);
    };
    const handleInputDobReqChange = (event: any ) => {
        setUserDobReq(new Date(event));
    };
    const handleInputAddressReqChange = (event: { target: { value: any } }) => {
        setUserAddressReq(event.target.value);
    };

    const phoneValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập số điện thoại");
        } else if (!regexPhoneNumber.test(value)) {
            callback("Số điện thoại không hợp lệ");
        } else {
            callback();
        }
    };

    const emailValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập email");
        } else if (!regexEmail.test(value)) {
            callback("Email không hợp lệ");
        } else {
            callback();
        }
    };

    const passwordValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập mật khẩu.");
        } else if (!regexPass.test(value)) {
            callback("Mật khẩu không hợp lệ.");
        } else {
            callback();
        }
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

    const handleAdd = () => {
        props.setOpenModal(false)
    };

    const handleCancelAdd = () => {
        props.setOpenModal(false)
    }

    const onAdd = () => {
        const bodyRequest = {
            email : userEmailReq,
            fullName : userNameReq,
            phoneNumber : userNumberPhoneReq,
            address : userAddressReq,
            dob : userDobReq,
            gender : userGenderReq,
        }
        dispatch(registerRequest(bodyRequest))
        props.setOpenModal(false)
    }


    return (
        <Modal
            open={props.open}
            onOk={handleAdd}
            onCancel={handleCancelAdd}
            title="Thêm mới nhân viên"
            width={1000}
            footer={false}
        >
            <div className="main-upload" style={{justifyContent : "center"}}>
                <div className="upload-area">
                    <Form 
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        layout="vertical"
                        onFinish={onAdd}
                    >
                    <div className="row-item">
                        <Form.Item
                            label="Họ và tên"
                            name="nameReg"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập họ tên"
                                onChange={handleInputNameReqChange}
                                maxLength={TEXT_INPUT.MAX_LENGTH}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumberReg"
                            rules={[
                                {
                                    validator: phoneValidator,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập số điện thoại"
                                onChange={handleInputPhoneNumberReqChange}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Email"
                            name="emailReg"
                            rules={[
                                {
                                    validator: emailValidator,
                                    message: "Email không hợp lệ",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập email"
                                onChange={handleInputEmailReqChange}
                            />
                        </Form.Item>
                        <div className="check-label">
                            Mỗi email chỉ được đăng ký 1 tài khoản.
                        </div>
                    </div>
                    <div className="row-item-1" >
                        <Form.Item
                            label="Giới tính"
                            name="genderReq"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                        >
                            <Radio.Group style={{textAlign: "left",display : "flex", width : "200px"}} 
                            onChange={(value) => handleInputGenderReqChange(value.target.value)}
                            >
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item                      
                            label="Năm sinh"
                            name="dobReq"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày tháng năm sinh' }]}
                            >
                            <DatePicker placeholder='Chọn năm sinh' style={{textAlign: "left",display : "flex", width : "200px", borderRadius : "1em"}} 
                            disabledDate={(current) => current && current > moment().endOf('day')} 
                            onChange={(event) => handleInputDobReqChange(event)}/>
                        </Form.Item> 
                    </div>
                    <div>
                        <Form.Item
                            label="Địa chỉ"
                            name="addressReq"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập địa chỉ"
                                onChange={handleInputAddressReqChange}
                                maxLength={TEXT_FIELD.MAX_LENGTH}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className="form-submit">
                        <motion.div
                            style={{
                                cursor: "pointer",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            whileFocus={{ scale: 1.05 }}
                        >
                            {checkReqBtn ? (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button active"
                                >
                                    Thêm
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    disabled
                                >
                                    Thêm
                                </Button>
                            )}
                        </motion.div>
                    </Form.Item>   
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalAddStaff;
