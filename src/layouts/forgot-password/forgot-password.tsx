import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { forgotPasswordInfoRequest, registerRequest } from "../../redux/controller";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import "./forgot-password.styles.scss";
import { useNavigate } from "react-router-dom";
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const ForgotPassword = () => {

    const [userEmailReq, setUserEmailReq] = useState<string>("");

    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);

    const navigate = useNavigate();

    const dispatch = useDispatchRoot();

    useEffect(() => {
            regexEmail.test(userEmailReq) 
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userEmailReq,
    ]);

    const handleInputEmailReqChange = (event: { target: { value: any } }) => {
        setUserEmailReq(event.target.value);
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

    const onFinish = () => {
        const bodyRequest = {
            email : userEmailReq
        }
        dispatch(forgotPasswordInfoRequest(bodyRequest))
        navigate("/")
    }

    return (
        <div className='main'>
			<div className='content-area'>
				<div className='container'>
					<div className='title'>Quên mật khẩu</div>
	               <Form
                    name="normal_login"
                    className="login-form"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div>
                        <Form.Item
                            label="Email"
                            name="emailReg"
                            rules={[
                                {
                                    required : true,
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
                    <Form.Item className="form-submit">
                        <div style={{display: 'flex', justifyContent: 'end', gap: 16}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="cancel-button"
                            style={{color : "black",background : "white"}}
                            onClick={() => navigate("/")}
                        >
                            Hủy
                        </Button>
                        <motion.div> 
                            {
                                checkReqBtn ? (
                                    <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="forgot-button"
                                >
                                    Tiếp tục
                                </Button>
                                ) : (
                                    <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="forgot-button"
                                    disabled
                                >
                                    Tiếp tục
                                </Button>
                                )
                            }
                        </motion.div>
                        </div>
                    </Form.Item>
                </Form>
				</div>
			</div>
		</div>
    );
};

export default ForgotPassword;
