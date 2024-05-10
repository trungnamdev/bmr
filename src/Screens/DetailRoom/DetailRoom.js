import React, { useState } from 'react'
import './detailroom.css';
import 'react-calendar/dist/Calendar.css';
import { Button, DatePicker, Input, Modal, Select, Tag, Typography } from 'antd';
import { StepBackwardOutlined } from '@ant-design/icons';
import { ClockCircleOutlined, ClockCircleTwoTone, UserOutlined } from '@ant-design/icons/lib/icons';
import moment from 'moment/moment';
export default function DetailRoom() {
    const [modalShow, setmodalShow] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);

    const { RangePicker } = DatePicker;
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 7; i += 1) hours.push(i);
        for (let i = 17; i < 24; i += 1) hours.push(i);
        return hours;
    };
    const options = {
        "1":{
            value: 'gold',
        },
        "2":{
            value: 'lime',
        },
        "3":{
            value: 'green',
        },
        "4":{
            value: 'cyan',
        },
        "5":{
            value: 'blue',
        },
        "6":{
            value: 'purple',
        },
    };
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        console.log(options['1']);
        return (
            <Tag
                color={options[value].value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                    paddingLeft:5,
                    paddingRight:5,
                    paddingTop:5,
                    paddingBottom:5,
                    margin:3
                }}
            >
                {label}
            </Tag>
        );
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '98%', marginTop: 15 }}>
                <div style={{ height: 100, borderStyle: 'solid', borderWidth: 1, borderColor: '#ebebeb', borderRadius: 8, paddingLeft: 20, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div><p style={{ color: '#000000E0', fontSize: 22, fontWeight: 'bold', padding: 0, marginBottom: 5 }}>Meeting Room 1</p></div>
                    <div><p style={{ color: '#00000073', fontSize: 15 }}>Văn phòng công ty</p></div>
                </div>
                <div className='rowchart'>
                    <div className='rowchart1'>
                        <p style={{ fontSize: 18, fontWeight: 500, height: 30, color: '#061243' }}><DatePicker onChange={onChange} inputReadOnly={true} /><Button onClick={()=>{setmodalShow(true)}} style={{ marginLeft: 10, backgroundColor: '#35718f', color: 'white' }}>Đặt phòng ngay</Button></p>
                        <div className='chart-detail'>
                            {[...Array(11)].map((v, i) => {
                                let starttime = 7;
                                return <div className='row-chart'>
                                    <div className='col-time'>
                                        <p className='time'>{(i + starttime).toString().padStart(2, '0')}:00</p>
                                    </div>
                                    <div className='col-show-detail'></div>
                                </div>
                            })}
                            <div style={{ width: '95%',borderRadius:3,overflow:'hidden', backgroundColor: 'rgba(234, 244, 255,0.5)', height: '9%', position: 'absolute', top: 20, right: 0, flexDirection: 'row', display: 'flex' }}>
                                <div style={{ width: 5, height: '100%', backgroundColor: '#35718f' }}></div>
                                <div style={{ flex: 1, background: 'rgba(118, 177, 255,0.1)', height: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5, justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }}>
                                    <p style={{ color: '#35718f', fontSize: 14, fontWeight: 'bold' }}>Tooling Meeting - Phạm Tuyết Anh - 307687 - TRUNG TAM KHAI THAC MAU</p>
                                    <p style={{ color: '#35718f', fontSize: 14, fontWeight: 500 }}>11:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rowchart2'>
                        <p style={{ fontSize: 18, fontWeight: 500, height: 30, color: '#061243' }}>Chi tiết đặt lịch</p>
                        <div className='box-ctdl'>
                            {[...Array(11)].map((v, i) => {
                                return <div className='ctdl'>
                                    <div style={{ width: 8, height: '100%', backgroundColor: '#76b1ff' }}></div>
                                    <div style={{ flex: 1, width: '100%', height: '100%', paddingLeft: 15, paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ textTransform: 'capitalize', fontSize: 17, fontWeight: 'bold', color: '#061243' }}>Tooling Meeting</p>
                                        <p style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: '500', color: '#061243' }}><ClockCircleTwoTone twoToneColor='#ffaa22' style={{ marginRight: 8 }} />11:00 - 12:00</p>
                                        <p style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: '500', color: '#061243' }}><UserOutlined style={{ color: '#ff8080', marginRight: 8 }} />phạm tuyết anh - 30787 - Trung Tam Khai Thac Mau</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Đặt lịch" open={modalShow}  onCancel={()=>setmodalShow(false)} confirmLoading={loadingModal} cancelButtonProps={{ style: { display: 'none' } }} okText='Thêm' onOk={()=>{setLoadingModal(true)}}>
                <div><Input value='30730' readOnly /></div>
                <div style={{ marginTop: 10 }}><Input value='Nguyễn Trần Trung Nam - VPCT' readOnly /></div>
                <div style={{ marginTop: 10 }}><Input placeholder='Chủ đề cuộc họp' /></div>
                <div style={{ marginTop: 10 }}><Input placeholder='Mục đích cuộc họp' /></div>
                <div style={{ marginTop: 10 }}><RangePicker minuteStep={5} showTime disabledHours={disabledHours} style={{ width: '100%' }} placeholder={["Bắt đầu", "Kết thúc"]} /></div>
                <div style={{ marginTop: 10 }}>
                <Typography.Title level={5}>Chỉ áp dụng các thứ trong tuần (tùy chọn)</Typography.Title>
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Chỉ áp dụng các thứ trong tuần"
                        onChange={(e) => { console.log(e) }}
                        options={[
                            { value: '1', label: moment().isoWeekday(1).format('dddd') },
                            { value: '2', label: moment().isoWeekday(2).format('dddd') },
                            { value: '3', label: moment().isoWeekday(2).format('dddd') },
                            { value: '4', label: moment().isoWeekday(4).format('dddd') },
                            { value: '5', label: moment().isoWeekday(5).format('dddd') },
                            { value: '6', label: moment().isoWeekday(6).format('dddd') }]}
                    />
                </div>


            </Modal>
        </div>
    )
}
