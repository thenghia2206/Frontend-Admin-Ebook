import React, { useEffect } from 'react'
import './style.changepassword.scss'
import { Button, Form, Input } from 'antd'
import { motion } from 'framer-motion';
import { useDispatchRoot } from '../../redux/store';
import { changePasswordRequest } from '../../redux/controller';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';

const regexPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ChangePassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();


    const onFinish = (values: any) => {
        const req = {
            ...values,
            additionalProp1: {}
        }
        dispatch(changePasswordRequest(req));
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

    return (
        <div className='change-pawword-main'>
            <h3 className='change-password-title'>Đổi mật khẩu</h3>
            <Form
                className='change-password-form'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                >
                    <Input.Password className='change-password-input' placeholder='Nhập mật khẩu cũ'                                 
                        iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                } />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        {
                            required : true,
                            validator: passwordValidator,
                            message:
                                "Mật khẩu chưa đủ mạnh. Vui lòng nhập lại.",
                        },
                    ]}
                >
                    <Input.Password className='change-password-input' placeholder='Nhập mật khẩu mới'
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            } />
                </Form.Item>
                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("newPassword") ===
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
                    <Input.Password className='change-password-input' placeholder='Nhập lại mật khẩu mới'
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            } />
                </Form.Item>
                <motion.div className='change-passowrd-btn-item'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                >
                    <Button className='change-password-btn' type="primary" htmlType="submit">Đổi mật khẩu</Button>
                </motion.div>
            </Form>
        </div >
    )
}

export default ChangePassword
