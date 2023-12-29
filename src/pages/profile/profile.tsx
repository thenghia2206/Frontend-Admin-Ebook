import { Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import "./profile.styles.scss"
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { useEffect, useState } from 'react'
import { editProfileRequest, getProfileRequest,
} from "../../redux/controller";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment'
import { Rule } from 'antd/lib/form';
import { motion } from "framer-motion";
import { IStaffChange } from '../../common/staff.interface';
import { useNavigate } from 'react-router-dom';

dayjs.extend(customParseFormat);

const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;

const Profile = () => {


    const [userNameReq, setUserNameReq] = useState<string>("");
    const [userNumberPhoneReq, setUserNumberPhoneReq] = useState<string>("");
    const [userGenderReq, setUserGenderReq] = useState(null)
    const [userDobReq, setUserDobReq] = useState<Date>()
    const [userAddressReq, setUserAddressReq] = useState("")
    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);

    
    useEffect(() => {
        dispatch(getProfileRequest());
      }, []);
    let { profile } = useSelectorRoot((state) => state.management)


    useEffect(() => {
        userNameReq &&
            regexPhoneNumber.test(form.getFieldValue("phoneNumber")) ||
            form.getFieldValue("gender") != null ||
            form.getFieldValue("dob") ||
            form.getFieldValue("address").length > 0 || form.getFieldValue("fullName").length > 0
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userNameReq,
        userNumberPhoneReq,
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
    const handleInputGenderReqChange = (event: any ) => {
        setUserGenderReq(event);
    };
    const handleInputDobReqChange = (event: any ) => {
        setUserDobReq(new Date(event));
    };
    const handleInputAddressReqChange = (event: { target: { value: any } }) => {
        setUserAddressReq(event.target.value);
    };

    const [form] = Form.useForm();
    useEffect(()=>{
        if(profile){
            const IProfile = {
                fullName : profile?.fullName,
                email : profile?.email,
                gender : profile?.gender,
                phoneNumber : profile?.phoneNumber,
                dob : moment(profile?.dob) || null,
                address : profile?.address,
            }
            form.setFieldsValue(IProfile)
        }
    },[profile])

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

    const navigate = useNavigate();
    const onFinish = (values: any) => {
        let bodyRequest : IStaffChange ={
            fullName : form.getFieldValue("fullName"),
            phoneNumber : form.getFieldValue("phoneNumber"),
            address : form.getFieldValue("address"),
            dob : new Date(form.getFieldValue("dob")),
            gender : form.getFieldValue("gender"),
        }
        dispatch(editProfileRequest(bodyRequest))

    };


    const IProfile = {
        fullName : profile?.fullName,
        email : profile?.email,
        gender : profile?.gender,
        phoneNumber : profile?.phoneNumber,
        dob : moment(profile?.dob) || null,
        address : profile?.address,
    }


    const dispatch = useDispatchRoot();

    return (
        <div className='profile-content'>
            <div className='profile-content-right' >
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={onFinish}
                    initialValues={IProfile}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                        <Input  onChange={handleInputNameReqChange} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                validator: phoneValidator,
                                message: "Số điện thoại không hợp lệ",
                            },
                        ]}
                    >
                        <Input onChange={handleInputPhoneNumberReqChange} />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input defaultValue={profile?.address} onChange={handleInputAddressReqChange} />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
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
                        name="dob"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày tháng năm sinh' }]}
                        >
                        <DatePicker placeholder='Chọn năm sinh' style={{textAlign: "left",display : "flex", width : "200px"}}
                        onChange={(event) => handleInputDobReqChange(event)}
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
                                    className="login-form-button active"
                                >
                                    Cập nhật
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    disabled
                                >
                                    Cập nhật
                                </Button>
                            )}
                        </motion.div>
                    </Form.Item>  
                </Form>
            </div>
        </div>
    )
}

export default Profile