import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { forgotPasswordRequest, registerRequest } from "../../redux/controller";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useNavigate } from "react-router-dom";
import { IForgotPassword } from "../../common/forgotPassword.interface";
const regexPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ResetPasswordSuccess = () => {
    const [userPassReq, setUserPassReq] = useState<string>("");
    const [userConfirmPassReq, setUserConfirmPassReq] = useState<string>("");
    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);
    const dispatch = useDispatchRoot();



    useEffect(() => {
            regexPass.test(userPassReq) &&
            userConfirmPassReq === userPassReq
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userPassReq,
        userConfirmPassReq,
    ]);

    const handleInputPassReqChange = (event: { target: { value: any } }) => {
        setUserPassReq(event.target.value);
    };
    const handleInputConfirmPassReqChange = (event: {
        target: { value: any };
    }) => {
        setUserConfirmPassReq(event.target.value);
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

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/")
    }

    const onFinish = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const bodyRequest = {
            key : queryParameters.get("key"),
            token : queryParameters.get("token"),
            newPassword : userPassReq,
            confirmPassword : userConfirmPassReq,
        }
        dispatch(forgotPasswordRequest(bodyRequest))
        navigate("/")
    }

    return (
        <div className='main'>
            <div className='content-area'>
            <div className='container'>
            <div className='title'>TẠO LẠI MẬT KHẨU</div>
                <Form
                    name="reset-password"
                    className="reset-password"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div>
                        <Form.Item
                            label="Mật khẩu mới"
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
                            label="Xác nhận mật khẩu mới"
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
                                className="login-form-button"
                            >
                                Xác nhận
                            </Button> 
                        ) : (
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                disabled
                            >
                                Xác nhận
                            </Button> 
                        )}

                        </motion.div>
                        <br></br>
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
                        <Button onClick={handleCancel}>
                            Hủy
                        </Button> 
                        </motion.div>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            </div>
        </div>

                
    );
};

export default ResetPasswordSuccess;
