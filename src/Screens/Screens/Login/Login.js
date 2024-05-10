// import { Button, Checkbox, Form, Input, Select } from 'antd'
// import React, { useState } from 'react'
// import { json, useNavigate } from 'react-router-dom'
// import Notification from '../../components/Notification'
// import { axiosInstance, getStorage, setStorage } from '../../config/config'
// const optionFac = [
//     {
//         label: 'LYV',
//         value: 'LYV'
//     },
//     {
//         label: 'LHG',
//         value: 'LHG'
//     },
//     {
//         label: 'JAZ',
//         value: 'JAZ'
//     },
//     {
//         label: 'LTB',
//         value: 'LTB'
//     },
//     {
//         label: 'JZS',
//         value: 'JZS'
//     },
//     {
//         label: 'LVL',
//         value: 'LVL'
//     },
//     {
//         label: 'LYM/POL',
//         value: 'LYM/POL'
//     },
//     {
//         label: 'LYN',
//         value: 'LYN'
//     },
//     {
//         label: 'LDT',
//         value: 'LDT'
//     },
// ]
// const Login = () => {
//     const navigate = useNavigate()
//     const [form] = Form.useForm();

//     const onFinish = async (values) => {
//         const formInput = {
//             userId: values.userId,
//             password: values.password,
//             factory: values.factory,
//             exponentPushToken: 'NO_ACCESS_TO_NOTIFY', DeviceInfo: 'web_meeting_room'
//         }
//         try {
//             let result = await axiosInstance.post("auth/login", formInput);
//             if (result.status == 200) {
//                 if (result.data.authenticated == true) {
//                     await setStorage('accessToken', result.data.accessToken)
//                     await setStorage("user", JSON.stringify(result.data.user));
//                     navigate('/home-screen')
//                 } else {
//                     Notification('error', "Error", result.data.message, 1)
//                 }
//             }
//         } catch (error) {

//         }

//     };

//     return (
//         <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
//             <div style={{ width: '400px', height: '450px' }}>
//                 <div style={{ width: '100%', height: '100%', border: '2px solid #eeeeee', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
//                     <div style={{ fontSize: 32, fontWeight: 'bold', height: '30%' }}>Login</div>
//                     <Form
//                         form={form}
//                         name="basic"
//                         labelCol={{
//                             span: 8,
//                         }}
//                         wrapperCol={{
//                             span: 16,
//                         }}
//                         style={{
//                             maxWidth: 800,
//                         }}
//                         initialValues={{
//                             remember: true,
//                         }}
//                         onFinish={onFinish}
//                         // onFinishFailed={onFinishFailed}
//                         autoComplete="off"
//                     >
//                         <Form.Item
//                             label="UserId"
//                             name="userId"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your UserId!',
//                                 },
//                             ]}
//                         >
//                             <Input />
//                         </Form.Item>

//                         <Form.Item
//                             label="Password"
//                             name="password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your password!',
//                                 },
//                             ]}
//                         >
//                             <Input.Password />
//                         </Form.Item>
//                         <Form.Item
//                             label="Factory"
//                             name="factory"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please select your fatory!',
//                                 },
//                             ]}
//                         >
//                             <Select options={optionFac} dropdownStyle={{ maxHeight: 200 }} />
//                         </Form.Item>

//                         <Form.Item
//                             wrapperCol={{
//                                 offset: 8,
//                                 span: 16,
//                             }}
//                         >
//                             <Button type="primary" htmlType="submit">
//                                 Login
//                             </Button>
//                         </Form.Item>
//                     </Form>

//                 </div>
//             </div >
//         </div >
//     )
// }
// export default Login
import { Button, Checkbox, Form, Image, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Notification from '../../components/Notification'
import { axiosInstance, getStorage, setStorage } from '../../config/config'
import logo from "../../assets/meetingRoom.jpg"
import vi from "../../assets/vi.jpg"
import en from "../../assets/en.jpg"
import tw from "../../assets/tw.jpg"
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
const optionFac = [
    {
        label: 'LYV',
        value: 'LYV'
    },
    {
        label: 'LHG',
        value: 'LHG'
    },
    {
        label: 'JAZ',
        value: 'JAZ'
    },
    {
        label: 'LTB',
        value: 'LTB'
    },
    {
        label: 'JZS',
        value: 'JZS'
    },
    {
        label: 'LVL',
        value: 'LVL'
    },
    {
        label: 'LYM/POL',
        value: 'LYM/POL'
    },
    {
        label: 'LYN',
        value: 'LYN'
    },
    {
        label: 'LDT',
        value: 'LDT'
    },
]
const opLang = [
    {
        value: 'vi',
        label: 'Việt Nam',
        image: vi
    },
    {
        value: 'en',
        label: 'English',
        image: en
    },
    {
        value: 'tw',
        label: 'Taiwan',
        image: tw
    },
]
const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const { multiLang, language } = useSelector((state) => state.langReducer)

    const onChangeLang = (value) => {
        dispatch({ type: "CHANGE_LANGUAGE", payload: value })
    }
    const onFinish = async (values) => {
        const formInput = {
            userId: values.userId,
            password: values.password,
            factory: values.factory,
            exponentPushToken: 'NO_ACCESS_TO_NOTIFY', DeviceInfo: 'web_meeting_room'
        }
        try {
            let result = await axiosInstance.post("auth/login", formInput);
            if (result.status == 200) {
                if (result.data.authenticated == true) {
                    await setStorage('accessToken', result.data.accessToken)
                    await setStorage("user", JSON.stringify(result.data.user));
                    navigate('/home-screen')
                } else {
                    Notification('error', "Error", multiLang[language][result.data.message], 1)
                }
            }
        } catch (error) {

        }

    };
    const check = async () => {
        const rememberUser = await getStorage('Login');
        if (rememberUser) {
            navigate('/home-screen')
        }
        else {
            navigate('/')
        }
    }
    useEffect(() => {
        check()
    }, [navigate])

    return (
        <div style={{ backgroundColor: '#eeeeee', width: '100vw', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', }}>
            <div className='left-section-login'>
                <Image src={logo} width={400} preview={false} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }}>
                    <div className='right-section-background' style={{ height: '68%', backgroundColor: '#FFFFFF', width: '60%', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 35, }}>
                            <div style={{ width: '100%', display: 'flex', fontWeight: '600', fontSize: 36, marginBottom: 20 }}>{multiLang?.[language]?.dangNhap}</div>
                            <Form
                                layout='vertical'
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item

                                    label={`${multiLang?.[language]?.soThe}`}
                                    name="userId"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${multiLang?.[language]?.vuiLongNhapDayDuThongTin}`,
                                        },
                                    ]}
                                >
                                    <Input style={{ height: 40, }} />
                                </Form.Item>

                                <Form.Item
                                    label={`${multiLang?.[language]?.matKhau}`}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${multiLang?.[language]?.vuiLongNhapDayDuThongTin}`,
                                        },
                                    ]}
                                >
                                    <Input.Password style={{ height: 40, }} />
                                </Form.Item>
                                <Form.Item
                                    label={`${multiLang?.[language]?.nhaMay}`}
                                    name="factory"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${multiLang?.[language]?.vuiLongNhapDayDuThongTin}`,
                                        },
                                    ]}
                                >
                                    <Select options={optionFac} dropdownStyle={{ maxHeight: 200 }} style={{ height: 40, }} />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    style={{ marginTop: 20 }}
                                >
                                    <Button type="primary" htmlType="submit" style={{ height: 40, width: '100%', fontSize: 18, fontWeight: 500, }}>
                                        {multiLang?.[language]?.dangNhap}
                                    </Button>
                                </Form.Item>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>

                                    <div style={{ flex: 1 }}>
                                        <Select
                                            style={{ width: 180, height: 40 }}
                                            onChange={onChangeLang}
                                            placeholder={`${multiLang?.[language]?.thayDoiNgonNgu}`}
                                            value={language}
                                        >
                                            {
                                                opLang?.map((item, index) => {
                                                    return (
                                                        <Select.Option key={index} value={item?.value}>
                                                            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', width: '100%', }}>
                                                                <div style={{ width: '20%' }}>
                                                                    <Image preview={false} src={item?.image} style={{ width: '100%' }} />
                                                                </div>
                                                                <div style={{ flex: 1, textAlign: 'center' }}>
                                                                    {item?.label}
                                                                </div>
                                                            </div>
                                                        </Select.Option>
                                                    )
                                                })}
                                        </Select>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Login