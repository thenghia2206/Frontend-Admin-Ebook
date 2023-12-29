import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { registerRequest } from "../../redux/controller";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import "./register.scss";
import { useNavigate } from "react-router-dom";
const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPass =
    /^.{6,}$/;

const Register = () => {
    const [userNameReq, setUserNameReq] = useState<string>("");
    const [userNumberPhoneReq, setUserNumberPhoneReq] = useState<string>("");
    const [userEmailReq, setUserEmailReq] = useState<string>("");
    const [userPassReq, setUserPassReq] = useState<string>("");
    const [userConfirmPassReq, setUserConfirmPassReq] = useState<string>("");
    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);
    const dispatch = useDispatchRoot();
    const [checked, setChecked] = useState<boolean>(false);
    const { registerSuccess } = useSelectorRoot((state) => state.login);

    useEffect(() => {
        userNameReq &&
            regexPhoneNumber.test(userNumberPhoneReq) &&
            regexEmail.test(userEmailReq) &&
            regexPass.test(userPassReq) &&
            userConfirmPassReq === userPassReq &&
            checked
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userNameReq,
        userNumberPhoneReq,
        userEmailReq,
        userPassReq,
        userConfirmPassReq,
        checked,
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
    const handleInputPassReqChange = (event: { target: { value: any } }) => {
        setUserPassReq(event.target.value);
    };
    const handleInputConfirmPassReqChange = (event: {
        target: { value: any };
    }) => {
        setUserConfirmPassReq(event.target.value);
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

    const onFinish = async (account: any): Promise<any> => {
        console.log(account);
        var dateObject = new Date();
        var year = dateObject.getUTCFullYear();
        var month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        var day = dateObject.getUTCDate().toString().padStart(2, '0');
        var hours = dateObject.getUTCHours().toString().padStart(2, '0');
        var minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
        var seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
        var milliseconds = dateObject.getUTCMilliseconds().toString().padStart(3, '0');
        var newDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
        const bodyrequest = {
            email: account.emailReg,
            password: account.passwordReq,
            confirmPassword: account.confirmPasswordReq,
            name: account.nameReg,
            phone: account.phoneNumberReg,
            address: "string",
            dob: newDateString,
            gender: true,
            additionalProp1: {}
        };
        console.log(bodyrequest)
        dispatch(registerRequest(bodyrequest));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (registerSuccess) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [registerSuccess]);

    return (
        <div className='main'>
			<div className='content-area'>
				<div className='container'>

					<div className='title'>Đăng Ký</div>
	\               <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(item) => onFinish(item)}
                    layout="vertical"
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
                    </div>
                    <div>
                        <Form.Item
                            label="Mật khẩu"
                            name="passwordReq"
                            rules={[
                                {
                                    validator: passwordValidator,
                                    message:
                                        "Mật khẩu chưa đủ mạnh. Vui lòng nhập lại.",
                                },
                            ]}
                        >
                            <Input.Password
                                className="form-input"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                type="password"
                                placeholder="Nhập mật khẩu"
                                onChange={handleInputPassReqChange}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            // className='form-input'
                            label="Xác nhận mật khẩu"
                            name="confirmPasswordReq"
                            dependencies={["passwordReq"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("passwordReq") ===
                                            value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Mật khẩu xác nhận không đúng!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                className="form-input"
                                id="basic_ConfirmPasswordRegiter"
                                placeholder="Nhập lại mật khẩu"
                                onChange={handleInputConfirmPassReqChange}
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Đăng ký
                        </Button> 
                        </motion.div>
                        <br></br>
                        <div className="inline-div">
                            Bạn đã có tài khoản ?
                        </div>
                        <a className="inline-div" href='/' > Đăng Nhập</a>
                    </Form.Item>
                </Form>
				</div>
			</div>
		</div>
    );
};

export default Register;
