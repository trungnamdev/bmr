import { Button, Checkbox, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Notification from '../../components/Notification'
import { getStorage, setStorage } from '../../config/config'
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
const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const formInput = {
            userId: values.userId,
            password: values.password,
            factory: values.factory
        }
        try {
            const parseString = JSON.stringify(formInput)
            // getStorage(formInput)
            const getItem = await getStorage('Login');
            if (getItem) {
                Notification('info', "Info", "You are already logged in.", 1);
                return;
            }
            await setStorage('Login', parseString)
            // console.log(form.factory);
            if (formInput.userId == 'test' && formInput.password == 'test' && formInput.factory == 'LYV') {
                Notification('success', "Success", "Login Successfully !!", 1)
                navigate('/home-screen')
                form.resetFields()
            }
            else {
                navigate('/')
                form.resetFields()
                Notification('error', "Error", "Please check your UserId and Password again !!", 2)
            }
        } catch (error) {

        }

    };

    return (
        <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
            <div style={{ width: '400px', height: '450px' }}>
                <div style={{ width: '100%', height: '100%', border: '2px solid #eeeeee', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 10 }}>
                    <div style={{ fontSize: 32, fontWeight: 'bold', height: '30%' }}>Login</div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 800,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="UserId"
                            name="userId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your UserId!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Factory"
                            name="factory"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your fatory!',
                                },
                            ]}
                        >
                            <Select options={optionFac} dropdownStyle={{ maxHeight: 200 }} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div >
        </div >
    )
}
export default Login