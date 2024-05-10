import React, { useState } from 'react'
import phonghop from '../../assets/phonghop.jpg'
import Header from '../Header/Header'
import { Avatar, Button, Checkbox, Col, DatePicker, Form, Image, Input, Radio, Row, Select } from 'antd'
import { FilterOutlined, UserOutlined } from '@ant-design/icons';
import '../HomeScreen/style.css'


const optionArea = [
    {
        value: 'TTKTM',
        label: 'TTKTM'
    },
    {
        value: 'VPCT',
        label: 'VPCT'
    },
    {
        value: 'VP2',
        label: 'VP2'
    },
    {
        value: 'PHONGMAU',
        label: 'PHONGMAU'
    },
    {
        value: 'THUMUA',
        label: 'THUMUA'
    },
]
const optionQuantity = [
    {
        value: '5',
        label: '5'
    },
    {
        value: '10',
        label: '10'
    },
    {
        value: '50',
        label: '50'
    },
    {
        value: '100',
        label: '100'
    },
    {
        value: '200',
        label: '200'
    },
]
const optionStatusRoom = [
    {
        value: 'Trống',
        label: 'Trống'
    },
    {
        value: 'Có Lịch',
        label: 'Có Lịch'
    }
]
const { Search } = Input;
const { RangePicker } = DatePicker;

const HomeScreen = () => {

    const onOkAllDay = (value) => {
        console.log('onOk:', value);
    };
    const onOkTime = (value) => {
        console.log('onOk: ', value);
    };
    const onChangeAllDay = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    const [radioArea, setRadioArea] = useState();
    const [radioQuantity, setRadioQuantity] = useState();
    const [radioStatusRoom, setRadioStatusRoom] = useState();
    const [radioTime, setRadioTime] = useState()
    const handleChangeRadioTime = (e) => {
        setRadioTime(e.target.value);

    };
    const handleChangeRadioArea = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue?.value === radioArea?.value) {
            console.log('ok');
            setRadioArea(null);
        } else {
            setRadioArea(selectedValue);
        }
    };
    // console.log(radioArea);

    const handleChangeRadioQuantity = (e) => {
        setRadioQuantity(e.target.value);
    };
    const handleChangeRadioStatusRoom = (e) => {
        setRadioStatusRoom(e.target.value);
    };
    return (
        <div>
            <div className='container'>
                <div style={{ width: '100%', height: '8%' }}>
                    <Header />
                </div>
                <div className='main-container'>
                    <div className='left-section'>
                        <div className='meeting-rooms' >
                            {Array.from(Array(10)).map((_, index) => (
                                <div className='meeting-room'>
                                    <div style={{ padding: 10, height: '100%', }}>
                                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div className='meeting-room-image' style={{ position: 'relative' }}>
                                                <Image src={phonghop} width={'100%'} height={'100%'} style={{ borderRadius: 5 }} />
                                                <div style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#F9FCFFC4', borderRadius: 5 }}>
                                                    <div className='room-attendees'>
                                                        <Avatar style={{ background: 'none', width: '50%' }} size={32} icon={<UserOutlined style={{ color: "rgb(38 38 38 / 76%)" }} />}></Avatar>
                                                        <div className='room-quantity'>6</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='meeting-room-details'>
                                                <div className='room-name'>Meeting Room 1</div>
                                                <div className='room-unit'>Văn Phòng Công Ty</div>
                                            </div>
                                            <div className='meeting-room-schedule'>
                                                {
                                                    Array.from(Array(5)).map((_, index) => (
                                                        <div style={{ marginBottom: 10, marginLeft: 10 }}>
                                                            <div className='schedule-time'>20.03.2024 - 16:00  Training</div>
                                                            <div className='schedule-description'>QIP QIP - PHẠM THỊ DIỄM TRINH - 30134</div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div style={{ width: '100%', height: '8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Button type="primary" style={{ width: '48%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#e7f1fd', color: '#2379e7' }} ><span style={{ fontSize: 12, fontWeight: 600 }}>Đặt phòng ngay</span></Button>
                                                <Button style={{ width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', borderColor: '#fec97c' }}><span style={{ fontSize: 12, fontWeight: 600, color: '#fe9f17' }}>Chi tiết phòng</span></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='right-section'>
                        <div style={{ width: "100%", height: '100%', overflowX: 'auto' }}>
                            <div style={{ padding: 15 }}>
                                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ width: '15%' }}>
                                        <FilterOutlined style={{ fontSize: 20, color: '#1f1f1f' }} />
                                    </div>
                                    <div style={{ color: '#1f1f1f', fontSize: 18, fontWeight: 800, width: '85%' }}> Lọc Phòng</div>
                                </div>
                                {/* <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f' }}>Tìm kiếm</div>
                                    <Search placeholder='Search Room' width="100%" style={{ marginTop: 10 }} />
                                </div> */}
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>Thời gian</div>
                                    <Radio.Group style={{ marginTop: 10, marginLeft: 20, display: 'flex', alignItems: 'center' }} onChange={handleChangeRadioTime} value={radioTime}>
                                        <Radio style={{ width: '50%', textWrap: 'wrap', color: radioTime == 1 ? '#5A5A5A' : '#8c8c8c', fontWeight: radioTime == 1 ? 600 : 400 }} value={1}
                                        >Cả ngày
                                        </Radio>
                                        <Radio style={{ width: '50%', textWrap: 'wrap', color: radioTime == 2 ? '#5A5A5A' : '#8c8c8c', fontWeight: radioTime == 2 ? 600 : 400 }} value={2}>Khoảng thời gian</Radio>
                                    </Radio.Group>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                                        {radioTime == 1 && (
                                            <RangePicker
                                                format="YYYY-MM-DD"
                                                onChange={onChangeAllDay}
                                                onOk={onOkAllDay}
                                            />
                                        )}
                                        {radioTime == 2 && (
                                            <RangePicker
                                                showTime={{
                                                    format: 'HH:mm',
                                                }}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={onChangeTime}
                                                onOk={onOkTime}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>Khu vực</div>
                                    <div style={{ marginTop: 10, marginLeft: 20 }}>
                                        {optionArea.map(option => (
                                            <Radio
                                                key={option}
                                                value={option}
                                                checked={radioArea === option}
                                                onChange={handleChangeRadioArea}
                                                style={{ width: '45%', textWrap: 'wrap', marginBottom: 10, color: radioArea === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioArea === option ? 600 : 400 }}>
                                                {option.label}
                                            </Radio>
                                        ))}
                                        {/* <CheckboxGroup style={{ display: 'flex', flexDirection: 'column', gap: 10, flexWrap: 'wrap', width: '100%' }} options={optionArea} ></CheckboxGroup> */}
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: 600, color: '#1f1f1f', fontSize: 15 }}>Sức chứa</div>
                                    <div style={{ marginTop: 10, marginLeft: 20, display: 'block' }}>
                                        {
                                            optionQuantity.map(option => (
                                                <Radio
                                                    key={option}
                                                    value={option}
                                                    checked={radioQuantity === option}
                                                    onChange={handleChangeRadioQuantity}
                                                    style={{ width: '45%', textWrap: 'wrap', marginBottom: 10, color: radioQuantity === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioQuantity === option ? 600 : 400 }}>
                                                    {option.label}
                                                </Radio>))
                                        }
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>Trạng thái phòng họp</div>
                                    <div style={{ marginTop: 10, marginLeft: 20, display: 'block', color: '#8c8c8c' }}>
                                        {
                                            optionStatusRoom.map(option => (
                                                <Radio
                                                    key={option}
                                                    value={option}
                                                    checked={radioStatusRoom === option}
                                                    onChange={handleChangeRadioStatusRoom}
                                                    style={{ width: '45%', textWrap: 'wrap', color: radioStatusRoom === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioStatusRoom === option ? 600 : 400 }}>
                                                    {option.label}
                                                </Radio>))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HomeScreen
