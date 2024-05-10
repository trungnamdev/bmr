import React, { useState, useEffect } from 'react'
import './detailroom.css';
import Header from '../Header/Header'
import { Avatar, Button, Checkbox, Col, DatePicker, Form, Image, Input, Modal, Radio, Row, Select, Tag, Typography } from 'antd'
import { ClockCircleTwoTone, DeleteOutlined, DeleteTwoTone, ExclamationCircleFilled, FilterOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import '../HomeScreen/style.css'
import { axiosInstanceToken, getStorage } from '../../config/config';
import moment from 'moment';
import Notification from '../../components/Notification'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';


// const optionArea = [
//     {
//         value: 'TTKTM',
//         label: 'TTKTM'
//     },
//     {
//         value: 'VPCT',
//         label: 'VPCT'
//     },
//     {
//         value: 'VP2',
//         label: 'VP2'
//     },
//     {
//         value: 'PHONGMAU',
//         label: 'PHONGMAU'
//     },
//     {
//         value: 'THUMUA',
//         label: 'THUMUA'
//     },
// ]
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

const { Search } = Input;
const { RangePicker } = DatePicker;

const HomeScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { multiLang, language } = useSelector((state) => state.langReducer)
    // 
    const [modalHuy, setModalHuy] = useState(false);
    const { confirm } = Modal;
    // 
    const [modalShow, setmodalShow] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const optionStatusRoom = [
        {
            value: 0,
            label: `${multiLang?.[language]?.trong}`
        },
        {
            value: 1,
            label: `${multiLang?.[language]?.coLich}`
        }
    ]
    const options = {
        "1": {
            value: 'gold',
        },
        "2": {
            value: 'lime',
        },
        "3": {
            value: 'green',
        },
        "4": {
            value: 'cyan',
        },
        "5": {
            value: 'blue',
        },
        "6": {
            value: 'purple',
        },
    };
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={options[value].value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    margin: 3
                }}
            >
                {label}
            </Tag>
        );
    };
    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 7; i += 1) hours.push(i);
        for (let i = 17; i < 24; i += 1) hours.push(i);
        return hours;
    };

    const [optionArea, setOptionArea] = useState([]);
    const [room, setroom] = useState([]);
    const [myschedule, setmyschedule] = useState([]);
    const [scheduleSearch, setScheduleSearch] = useState([]);
    const [userDetail, setuserDetail] = useState([]);
    const [filterroom, setfilterroom] = useState();
    const [user, setuser] = useState();
    // chi tiet phong hop
    const [modalCT, setmodalCT] = useState(false);
    const [selectDateLich, setSelectDateLich] = useState();
    // 
    //
    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        try {
            let userST = await getStorage('user');
            userST = JSON.parse(userST);
            setuser(userST);
            const getRoom = await axiosInstanceToken(
                "GET",
                `/bookmeeting/${userST.factory}/getallroom`,
                '',
            );
            await setroom(getRoom?.data);

            const getMySchedule = await axiosInstanceToken(
                "GET",
                `/bookmeeting/${userST.factory}/${userST.userId}/getmyschedule`,
                '',
            );
            setmyschedule(getMySchedule?.data);

            const getScheduleRooms = await axiosInstanceToken(
                "POST",
                `/bookmeeting/${userST.factory}/getschedulesearch`,
                '', {
                datestart: moment().set({
                    hour: 7,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                }).format('YYYY-MM-DD HH:mm:ss'), dateend: moment().set({
                    hour: 17,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                }).format('YYYY-MM-DD HH:mm:ss')
            }
            );
            setScheduleSearch(getScheduleRooms?.data);

            let userDetail = await axiosInstanceToken(
                "GET",
                `${userST?.factory}/user/getUserInfo/${userST?.userId}`,
                '');
            setuserDetail(userDetail?.data?.userInfo);
            setOptionArea(
                [...new Set(getRoom?.data?.filter(v => v.isHideArea == null).map(v => v.Area))]
                    .map(value => ({ value: value, label: value }))
            );
        } catch (error) {
            console.log(error);
        }
    }
    // 
    const onChangeAllDay = async (value, dateString) => {
        if (dateString[0] != '') {
            let timesr = {
                datestart: `${moment(dateString[0]).format('YYYY-MM-DD 07:00:00')}`,
                dateend: `${moment(dateString[1]).format('YYYY-MM-DD 17:00:00')}`
            };
            const getScheduleRooms = await axiosInstanceToken(
                "POST",
                `/bookmeeting/${user.factory}/getschedulesearch`,
                '', timesr
            );
            setScheduleSearch(getScheduleRooms?.data);
            setfilterroom({
                ...filterroom, date1: `${moment(dateString[0]).format('YYYY-MM-DD 07:00:00')}`,
                date2: `${moment(dateString[1]).format('YYYY-MM-DD 17:00:00')}`
            });
        }
    };
    const onChangeTime = async (value, dateString) => {
        if (dateString[0] != '') {
            let timesr = {
                datestart: `${moment(dateString[0]).format('YYYY-MM-DD HH:mm:00')}`,
                dateend: `${moment(dateString[1]).format('YYYY-MM-DD HH:mm:00')}`
            };
            const getScheduleRooms = await axiosInstanceToken(
                "POST",
                `/bookmeeting/${user.factory}/getschedulesearch`,
                '', timesr
            );
            setScheduleSearch(getScheduleRooms?.data);
            setfilterroom({
                ...filterroom, date1: `${moment(dateString[0]).format('YYYY-MM-DD HH:mm:00')}`,
                date2: `${moment(dateString[1]).format('YYYY-MM-DD HH:mm:00')}`
            });
        }
    }
    const [radioArea, setRadioArea] = useState();
    const [radioQuantity, setRadioQuantity] = useState();
    const [radioStatusRoom, setRadioStatusRoom] = useState();
    const [radioTime, setRadioTime] = useState()
    const handleChangeRadioTime = (e) => {
        setRadioTime(e.target.value);
        // console.log(radioTime);

    };
    const handleChangeRadioArea = (e) => {
        const selectedValue = e.target.value;
        setRadioArea(selectedValue);
        setfilterroom({ ...filterroom, areachoose: selectedValue?.value })
    };

    const handleChangeRadioQuantity = (e) => {
        setRadioQuantity(e.target.value);
        setfilterroom({ ...filterroom, capacitychoose: e.target.value?.value })
    };
    const handleChangeRadioStatusRoom = (e) => {
        setRadioStatusRoom(e.target.value);
        setfilterroom({ ...filterroom, roomstatus: e.target.value?.value })

    };


    const deselectOnClick = async (e, i) => {
        const { value } = e.target;
        switch (i) {
            case 1:
                if (value == radioTime) {
                    setRadioTime(null);
                    setfilterroom({ ...filterroom, areachoose: undefined })
                    const getScheduleRooms = await axiosInstanceToken(
                        "POST",
                        `/bookmeeting/${user.factory}/getschedulesearch`,
                        '', {
                        datestart: moment().set({
                            hour: 7,
                            minute: 0,
                            second: 0,
                            millisecond: 0
                        }).format('YYYY-MM-DD HH:mm:ss'), dateend: moment().set({
                            hour: 17,
                            minute: 0,
                            second: 0,
                            millisecond: 0
                        }).format('YYYY-MM-DD HH:mm:ss')
                    }
                    );
                    setScheduleSearch(getScheduleRooms?.data);
                }
                break;
            case 2:
                if (value == radioArea) {
                    setRadioArea(undefined);
                    setfilterroom({ ...filterroom, areachoose: undefined })
                }
                break;
            case 3:
                if (value == radioQuantity) {
                    setRadioQuantity(null);
                    setfilterroom({ ...filterroom, capacitychoose: undefined })

                }
                break;
            case 4:
                if (value == radioStatusRoom) {
                    setRadioStatusRoom(null);
                    setfilterroom({ ...filterroom, roomstatus: undefined })

                }
                break;
        }

    };

    const [fromAdd, setfromAdd] = useState();
    const [scheduleRoom, setscheduleRoom] = useState();
    const [roomChoose, setroomChoose] = useState();

    const addRoom = async () => {
        setLoadingModal(true);
        // 
        let checkbpmid = false;
        if (roomChoose?.Bpm_req == 1 && !roomChoose?.bpm_area_exc?.split(',')?.includes(userDetail?.Department_Serial_Key)) {
            let checkBPMSign = await axiosInstanceToken(
                "GET",
                `/bookmeeting/checkbpmsign/${fromAdd?.bpmid}`,
                '');
            // console.log(checkBPMSign);
            if (checkBPMSign?.data[0]?.issign == 0) {
                setfromAdd({ ...fromAdd, bpmid_sign: false });
                checkbpmid = false;
            } else {
                setfromAdd({ ...fromAdd, bpmid_sign: true });
                checkbpmid = true;
            }
        } else {
            checkbpmid = true;
        }
        if (checkbpmid) {
            const add = await axiosInstanceToken(
                "POST",
                `/bookmeeting/addmeeting/`,
                '',
                {
                    meeting: {
                        ID_Room: roomChoose?.ID_Room, ID_User: user?.userId, Topic: fromAdd?.topic, Purpose: fromAdd?.purpose, ID_User2: fromAdd?.nguoithaytheData?.Person_ID,
                        Time_Start: `${moment(fromAdd?.startDate).format('YYYY-MM-DD')} ${moment(fromAdd?.startTime).format('HH:mm:00')}`,
                        Time_End: `${moment(fromAdd?.endDate).format('YYYY-MM-DD')} ${moment(fromAdd?.endTime).format('HH:mm:00')}`, Name_User: userDetail?.Person_Name, DP_User: userDetail?.Department_Name,
                        idbpm: fromAdd?.bpmid,
                        dayOnly: fromAdd?.dayOnly, dayOnlys: fromAdd?.dayOnlys
                    }
                }
            );
            if (add?.data?.status) {
                setmodalShow(false);
                const getSchedule = await axiosInstanceToken(
                    "POST",
                    `/bookmeeting/${roomChoose?.ID_Room}/getschedule`,
                    '', { date: fromAdd?.startDate }
                );
                setscheduleRoom(getSchedule?.data);
                console.log(userDetail)
                const getScheduleRooms = await axiosInstanceToken(
                    "POST",
                    `/bookmeeting/${user.factory}/getschedulesearch`,
                    '', {
                    datestart: moment(fromAdd?.startDate).set({
                        hour: 7,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    }).format('YYYY-MM-DD HH:mm:ss'), dateend: moment(fromAdd?.startDate).set({
                        hour: 17,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    }).format('YYYY-MM-DD HH:mm:ss')
                }
                );
                setRadioTime(null);
                setScheduleSearch(getScheduleRooms?.data);
                Notification('success', "Thành Công", 'Đặt phòng thành công', 5)
                setSelectDateLich(moment(fromAdd?.startDate).format('DD/MM/YYYY'))
            } else {
                // setdialogHuy(true);
                Notification('error', `${multiLang?.[language]?.coLoiXayRa}`, `${multiLang?.[language]?.daCoLichHopTrongKhungGioNay}`, 5)

            }
        }
        // 
        setLoadingModal(false);

    }
    const highlightThem = () => {
        let rs = true;
        if (fromAdd?.topic?.trim() == '' || fromAdd?.topic == undefined || fromAdd?.purpose?.trim() == '' || fromAdd?.purpose == undefined) {
            rs = false;
        }
        if (!moment(fromAdd?.endTime).isAfter(fromAdd?.startTime) || moment(fromAdd?.startTime).format('HH') < 7 || moment(fromAdd?.endTime).format('HH') >= 17) {
            rs = false;
        }
        if (!moment(fromAdd?.endDate).isAfter(fromAdd?.startDate) && !moment(fromAdd?.endDate).isSame(fromAdd?.startDate)) {
            rs = false;
        }
        if (roomChoose?.Bpm_req == 1 && !roomChoose?.bpm_area_exc?.split(',')?.includes(userDetail?.Department_Serial_Key)) {
            if (fromAdd?.bpmid?.trim() == '' || fromAdd?.bpmid == undefined) {
                rs = false;
            }
        }
        return rs;
    }

    return (
        <div>
            <div className='container'>
                <div style={{ width: '100%', height: '8%' }}>
                    <Header />
                </div>
                <div className='main-container'>
                    <div className='left-section'>
                        <div className='meeting-rooms' >
                            {room?.filter(v => filterroom?.areachoose != undefined ? v?.Area == filterroom?.areachoose : true)?.filter(v => filterroom?.capacitychoose != undefined ? v?.Capacity > filterroom?.capacitychoose : true)?.filter(v => filterroom?.roomstatus != undefined ? filterroom?.roomstatus == 0 ? scheduleSearch?.filter(vf => vf.ID_Room == v.ID_Room).length == 0 : scheduleSearch?.filter(vf => vf.ID_Room == v.ID_Room).length != 0 : true).map((v, i) => {
                                return <div className='meeting-room' key={i}>
                                    <div style={{ padding: 10, height: '100%', }}>
                                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div className='meeting-room-image' style={{ position: 'relative' }}>
                                                <Image src={`http://erp.lacty.com.vn:8000/assets/${v?.imageRoom != null ? v?.imageRoom : 'images/meeting-room.png'}?${new Date().getDay()}`} width={'100%'} height={'100%'} style={{ borderRadius: 5, objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#F9FCFFC4', borderRadius: 5 }}>
                                                    <div className='room-attendees'>
                                                        <Avatar style={{ background: 'none', width: '50%' }} size={32} icon={<UserOutlined style={{ color: "rgb(38 38 38 / 76%)" }} />}></Avatar>
                                                        <div className='room-quantity'>{v.Capacity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='meeting-room-details'>
                                                <div className='room-name'>{v.Name}</div>
                                                <div className='room-unit'>{v.Area}</div>
                                            </div>
                                            <div className='meeting-room-schedule'>
                                                {scheduleSearch?.filter(vf => vf.ID_Room == v.ID_Room)?.map((value, index, array) => {
                                                    return <div style={{ marginBottom: 10, marginLeft: 10 }}>
                                                        <div className='schedule-time' style={{ color: moment.utc(value?.Time_Start).format('YYYYMMDD') == moment().format('YYYYMMDD') ? '#ff5b49' : value?.ID_User == user?.userId ? '#79bf59' : '#1f1f1f' }}>{`${moment.utc(value?.Time_Start).format('YYYY.MM.DD HH:mm')} - ${moment.utc(value?.Time_End).format('HH:mm')}  ${value?.Topic?.toUpperCase()}`}</div>
                                                        <div className='schedule-description' style={{ color: moment.utc(value?.Time_Start).format('YYYYMMDD') == moment().format('YYYYMMDD') ? '#ff5b49' : value?.ID_User == user?.userId ? '#79bf59' : '#262626' }}>{value?.DP_User} - {value?.Name_User?.toUpperCase()} - {value?.ID_User}</div>
                                                    </div>
                                                })}
                                            </div>
                                            <div style={{ width: '100%', height: '8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Button type="primary" style={{ width: '48%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#e7f1fd', color: '#2379e7' }} onClick={async () => {
                                                    setmodalShow(true);
                                                    await setroomChoose(v);
                                                    const getSchedule = await axiosInstanceToken(
                                                        "POST",
                                                        `/bookmeeting/${v.ID_Room}/getschedule`,
                                                        '', { date: moment(filterroom?.date1) }
                                                    );
                                                    setscheduleRoom(getSchedule.data);
                                                }} ><span style={{ fontSize: 14, fontWeight: 600,height:15 }}>{multiLang?.[language]?.nhanDeDatPhong}</span></Button>
                                                <Button onClick={async () => {
                                                    await setroomChoose(v);
                                                    const getSchedule = await axiosInstanceToken(
                                                        "POST",
                                                        `/bookmeeting/${v.ID_Room}/getschedule`,
                                                        '', { date: moment(filterroom?.date1) }
                                                    );
                                                    await setscheduleRoom(getSchedule.data);
                                                    setSelectDateLich(filterroom?.date1 != undefined ? moment(filterroom?.date1).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY'))
                                                    setmodalCT(true);
                                                }} style={{ width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', borderColor: '#fec97c' }}><p style={{ fontSize: 14, fontWeight: 600, color: '#fe9f17',height:15 }}>{multiLang?.[language]?.chiTietDatLich}</p></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='right-section'>
                        <div style={{ width: "100%", height: '100%', overflowX: 'auto' }}>
                            <div style={{ padding: 15 }}>
                                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ width: '10%' }}>
                                        <FilterOutlined style={{ fontSize: 20, color: '#1f1f1f' }} />
                                    </div>
                                    <div style={{ color: '#1f1f1f', fontSize: 18, fontWeight: 800, flex: 1 }}>{multiLang?.[language]?.boLocPhongHop}</div>
                                </div>
                                {/* <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f' }}>Tìm kiếm</div>
                                    <Search placeholder='Search Room' width="100%" style={{ marginTop: 10 }} />
                                </div> */}
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>{multiLang?.[language]?.thoiGian}</div>
                                    <Radio.Group style={{ marginTop: 10, display: 'flex', alignItems: 'center' }} onChange={handleChangeRadioTime} value={radioTime}>
                                        <Radio.Button onClick={(e) => deselectOnClick(e, 1)} style={{ width: '50%', textWrap: 'wrap', color: radioTime == 1 ? '#5A5A5A' : '#8c8c8c', fontWeight: radioTime == 1 ? 600 : 400 }} value={1}
                                        >{multiLang?.[language]?.caNgay}
                                        </Radio.Button>
                                        <Radio.Button onClick={(e) => deselectOnClick(e, 1)} style={{ width: '50%', textWrap: 'wrap', color: radioTime == 2 ? '#5A5A5A' : '#8c8c8c', fontWeight: radioTime == 2 ? 600 : 400 }} value={2}>{multiLang?.[language]?.khoangThoiGian}</Radio.Button>
                                    </Radio.Group>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                                        {radioTime == 1 && (
                                            <RangePicker
                                                placeholder={[`${multiLang?.[language]?.batDau}`, `${multiLang?.[language]?.ketThuc}`]}
                                                format="YYYY-MM-DD"
                                                onChange={onChangeAllDay}
                                            />
                                        )}
                                        {radioTime == 2 && (
                                            <RangePicker
                                                placeholder={[`${multiLang?.[language]?.batDau}`, `${multiLang?.[language]?.ketThuc}`]}
                                                showTime={{
                                                    format: 'HH:mm',
                                                }}
                                                format="YYYY-MM-DD HH:mm"
                                                onChange={onChangeTime}
                                                disabledHours={disabledHours}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>{multiLang?.[language]?.khuVuc}</div>
                                    <div style={{ marginTop: 10, boxSizing: 'content-box' }}>
                                        {optionArea.map(option => (
                                            <Radio.Button
                                                onClick={(e) => deselectOnClick(e, 2)}
                                                // key={option}
                                                value={option}
                                                checked={radioArea === option}
                                                onChange={handleChangeRadioArea}
                                                style={{ width: '50%', textWrap: 'wrap', marginBottom: 10, marginRight: 0, color: radioArea === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioArea === option ? 600 : 400 }}>
                                                {option.label}
                                            </Radio.Button>
                                        ))}
                                        {/* <CheckboxGroup style={{ display: 'flex', flexDirection: 'column', gap: 10, flexWrap: 'wrap', width: '100%' }} options={optionArea} ></CheckboxGroup> */}
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: 600, color: '#1f1f1f', fontSize: 15 }}>{multiLang?.[language]?.sucChua}</div>
                                    <div style={{ marginTop: 10, boxSizing: 'content-box' }}>
                                        {
                                            optionQuantity.map(option => (
                                                <Radio.Button
                                                    onClick={(e) => deselectOnClick(e, 3)}
                                                    // key={option}
                                                    value={option}
                                                    checked={radioQuantity === option}
                                                    onChange={handleChangeRadioQuantity}
                                                    style={{ width: '50%', textWrap: 'wrap', marginBottom: 10, marginRight: 0, color: radioQuantity === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioQuantity === option ? 600 : 400 }}>
                                                    {option.label}
                                                </Radio.Button>))
                                        }
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10, marginTop: 15 }}>
                                    <div style={{ fontWeight: '600', color: '#1f1f1f', fontSize: 15 }}>{multiLang?.[language]?.trangThaiPhongHop}</div>
                                    <div style={{ marginTop: 10, boxSizing: 'content-box' }}>
                                        {
                                            optionStatusRoom.map(option => (
                                                <Radio.Button
                                                    onClick={(e) => deselectOnClick(e, 4)}
                                                    // key={option}
                                                    value={option}
                                                    checked={option.value == radioStatusRoom?.value}
                                                    onChange={handleChangeRadioStatusRoom}
                                                    style={{ width: '50%', textWrap: 'wrap', marginRight: 0, color: radioStatusRoom === option ? '#5A5A5A' : '#8c8c8c', fontWeight: radioStatusRoom === option ? 600 : 400 }}>
                                                    {option.label}
                                                </Radio.Button>))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <Modal zIndex={2000} title={`${multiLang?.[language]?.datLich} ${roomChoose?.Name} | ${roomChoose?.Area}`} open={modalShow} onCancel={() => setmodalShow(false)} confirmLoading={loadingModal} cancelButtonProps={{ style: { display: 'none' } }} okText={`${multiLang?.[language]?.them}`} onOk={() => { addRoom() }} okButtonProps={{ disabled: !highlightThem() }}>
                <div><Input value={userDetail?.Person_ID} readOnly /></div>
                <div style={{ marginTop: 10 }}><Input value={`${userDetail?.Person_Name} - ${userDetail?.Department_Name}`} readOnly /></div>
                <div style={{ marginTop: 10 }}><Input placeholder={`${multiLang?.[language]?.chuDeCuocHop}`} onChange={(e) => { setfromAdd({ ...fromAdd, topic: e.currentTarget.value }); }} /></div>
                <div style={{ marginTop: 10 }}><Input placeholder={`${multiLang?.[language]?.mucDichCuocHop}`} onChange={(e) => { setfromAdd({ ...fromAdd, purpose: e.currentTarget.value }); }} /></div>
                {(roomChoose?.Bpm_req == 1 && !roomChoose?.bpm_area_exc?.split(',')?.includes(userDetail?.Department_Serial_Key)) && <div style={{ marginTop: 10 }}>
                    <Input placeholder='Số phiếu BPM' status={fromAdd?.bpmid_sign != null && !fromAdd?.bpmid_sign && "error"} onChange={(e) => { setfromAdd({ ...fromAdd, bpmid: e.currentTarget.value, bpmid_sign: null }); }} />
                    {fromAdd?.bpmid_sign != null && !fromAdd?.bpmid_sign && <div style={{ color: '#ff8081' }}>{multiLang?.[language]?.soPhieuBPM}</div>}
                </div>}
                <div style={{ marginTop: 10 }}><RangePicker

                    disabledDate={(current) => {
                        const startValue = moment().startOf('day');
                        const endValue = moment().endOf('day');

                        // Chặn ngày trước ngày hiện tại
                        if (current && current < startValue) {
                            return true;
                        }

                        // Chặn ngày giờ kết thúc nhỏ hơn ngày giờ bắt đầu
                        const endDateTime = current && current.endOf('day');
                        const startDateTime = startValue && startValue.endOf('day');
                        if (endDateTime && startDateTime && endDateTime < startDateTime) {
                            return true;
                        }

                        return false;
                    }}
                    format="YYYY-MM-DD HH:mm:00" onChange={(date, dateformat) => {
                        setfromAdd({
                            ...fromAdd,
                            startTime: moment(dateformat[0]).set('date', moment().date()),
                            endTime: moment(dateformat[1]).set('date', moment().date()),
                            startDate: moment(dateformat[0]).set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                                millisecond: 0
                            }),
                            endDate: moment(dateformat[1]).set({
                                hour: 0,
                                minute: 0,
                                second: 0,
                                millisecond: 0
                            })
                        });
                    }} minuteStep={5} showTime disabledHours={disabledHours} style={{ width: '100%' }} placeholder={[`${multiLang?.[language]?.batDau}`, `${multiLang?.[language]?.ketThuc}`]} /></div>
                <div style={{ marginTop: 10 }}>
                    <Typography.Title level={5}>{multiLang?.[language]?.chiApDungCacThuDuocChon}</Typography.Title>
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder={`${multiLang?.[language]?.chiApDungCacThuDuocChon}`}
                        onChange={(e) => {
                            setfromAdd({ ...fromAdd, dayOnlys: e, dayOnly: e.length != 0 ? true : false });
                        }}
                        options={[
                            { value: 1, label: moment().isoWeekday(1).format('dddd') },
                            { value: 2, label: moment().isoWeekday(2).format('dddd') },
                            { value: 3, label: moment().isoWeekday(3).format('dddd') },
                            { value: 4, label: moment().isoWeekday(4).format('dddd') },
                            { value: 5, label: moment().isoWeekday(5).format('dddd') },
                            { value: 6, label: moment().isoWeekday(6).format('dddd') }]}
                    />
                </div>


            </Modal>
            <Modal title={`${roomChoose?.Name} | ${roomChoose?.Area}`} open={modalCT} width={'100%'} onCancel={() => setmodalCT(false)} footer={false} >
                <div style={{ height: 500 }}>
                    <div className='rowchart'>
                        <div className='rowchart1'>
                            <div style={{ fontSize: 18, fontWeight: 500, height: 30, color: '#061243' }}>
                                <DatePicker inputReadOnly={true} value={dayjs(selectDateLich, 'DD/MM/YYYY')} onChange={async (date, dateString) => {
                                    //    setSelectDateLich(dateString)
                                    if (dateString != '') {
                                        setSelectDateLich(moment(dateString).format('DD/MM/YYYY'));
                                        const getSchedule = await axiosInstanceToken(
                                            "POST",
                                            `/bookmeeting/${roomChoose?.ID_Room}/getschedule`,
                                            '', { date: moment.utc(dateString) }
                                        );
                                        await setscheduleRoom(getSchedule.data);
                                    }
                                }} />
                                <Button onClick={async () => {
                                    setmodalShow(true);
                                }} style={{ marginLeft: 10, backgroundColor: '#35718f', color: 'white' }}>{multiLang?.[language]?.nhanDeDatPhong}</Button></div>
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
                                {scheduleRoom?.reverse().filter(v => moment.utc(v.Time_Start).format("DD/MM/YYYY") == selectDateLich && v.Cancel != '1').map((value, index, array) => {
                                    let positionTop = ((moment.utc(value.Time_Start).hours() - 7) * 60 + moment.utc(value.Time_Start).minutes()) * 0.15;
                                    let height = moment.utc(value.Time_End).diff(moment.utc(value.Time_Start), 'minutes') * 0.15;
                                    return <div style={{ width: '95%', borderRadius: 3, overflow: 'hidden', backgroundColor: value?.ID_User == user?.userId ? 'rgb(121, 191, 89,0.3)' : 'rgba(234, 244, 255,0.5)', height: `${height}%`, position: 'absolute', top: `${positionTop}%`, right: 0, flexDirection: 'row', display: 'flex' }}>
                                        <div style={{ width: 5, height: '100%', backgroundColor: value?.ID_User == user?.userId ? '#79bf59' : '#35718f' }}></div>
                                        <div style={{ flex: 1, background: 'rgba(118, 177, 255,0.1)', height: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5, justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }}>
                                            <p style={{ color: value?.ID_User == user?.userId ? '#609846' : '#35718f', fontSize: height < 5.5 ? 12 : 14, fontWeight: 'bold' }}>{value?.Topic} - {value?.Name_User} - {value?.ID_User} - {value?.DP_User}</p>
                                            <p style={{ color: value?.ID_User == user?.userId ? '#609846' : '#35718f', fontSize: height < 5.5 ? 12 : 14, fontWeight: 500 }}>{moment.utc(value.Time_Start).format('HH:mm')} - {moment.utc(value.Time_End).format('HH:mm')}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='rowchart2'>
                            <p style={{ fontSize: 18, fontWeight: 500, height: 30, color: '#061243' }}>{multiLang?.[language]?.chiTietDatLich}</p>
                            <div className='box-ctdl'>
                                {scheduleRoom?.filter(v => moment.utc(v.Time_Start).format("DD/MM/YYYY") == selectDateLich && v.Cancel != '1').map((value, index, array) => {
                                    return <div className='ctdl' style={{ backgroundColor: value?.ID_User == user?.userId ? 'rgb(121, 191, 89,0.3)' : 'rgba(220, 236, 255,0.6)' }}>
                                        <div style={{ width: 8, height: '100%', backgroundColor: value?.ID_User == user?.userId ? 'rgb(121, 191, 89)' : '#76b1ff' }}></div>
                                        <div style={{ flex: 1, width: '100%', height: '100%', paddingLeft: 15, paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ textTransform: 'capitalize', fontSize: 17, fontWeight: 'bold', color: '#061243', display: 'flex', justifyContent: 'space-between' }}>{value?.Topic}</p>
                                            <p style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: '500', color: '#061243' }}><ClockCircleTwoTone twoToneColor='#ffaa22' style={{ marginRight: 8 }} />{moment.utc(value?.Time_Start).format('HH:mm')} - {moment.utc(value?.Time_End).format('HH:mm')}</p>
                                            <p style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: '500', color: '#061243' }}><UserOutlined style={{ color: '#ff8080', marginRight: 8 }} />{value?.Name_User} - {value?.ID_User} - {value?.DP_User}</p>
                                        </div>
                                        {value?.ID_User == user?.userId && value?.detail?.Cancel != '1' && moment(moment.utc(value?.Time_Start).format('DD/MM/YYYY HH:mm'), 'DD/MM/YYYY HH:mm').isAfter(moment()) && <div onClick={() => {
                                            confirm({
                                                content: `${multiLang?.[language]?.xacNhanHuyLichHop} "${value?.Topic}" - ${moment.utc(value?.Time_Start).format('HH:mm')} - ${moment.utc(value?.Time_End).format('HH:mm')} ?`,
                                                icon: <ExclamationCircleFilled />,
                                                title: `${roomChoose?.Name} | ${roomChoose?.Area}`,
                                                okText: `${multiLang?.[language]?.dongY}`,
                                                okType: 'danger',
                                                cancelText: `${multiLang?.[language]?.huyBo}`,
                                                width: '40%',
                                                onOk() {
                                                    new Promise(async (resolve, reject) => {
                                                        try {
                                                            const cancelSch = await axiosInstanceToken(
                                                                "PUT",
                                                                `/bookmeeting/cancelmeeting/${value?.ID_Schedule}`,
                                                                ''
                                                            );
                                                            if (cancelSch?.data?.status) {
                                                                const getSchedule = await axiosInstanceToken(
                                                                    "POST",
                                                                    `/bookmeeting/${roomChoose?.ID_Room}/getschedule`,
                                                                    '', { date: fromAdd?.startDate }
                                                                );
                                                                const getScheduleRooms = await axiosInstanceToken(
                                                                    "POST",
                                                                    `/bookmeeting/${user.factory}/getschedulesearch`,
                                                                    '', {
                                                                    datestart: moment(fromAdd?.startDate).set({
                                                                        hour: 7,
                                                                        minute: 0,
                                                                        second: 0,
                                                                        millisecond: 0
                                                                    }).format('YYYY-MM-DD HH:mm:ss'), dateend: moment(fromAdd?.startDate).set({
                                                                        hour: 17,
                                                                        minute: 0,
                                                                        second: 0,
                                                                        millisecond: 0
                                                                    }).format('YYYY-MM-DD HH:mm:ss')
                                                                }
                                                                );
                                                                setscheduleRoom(getSchedule?.data);
                                                                setScheduleSearch(getScheduleRooms?.data);
                                                                Notification('success', multiLang[language].thanhCong, multiLang[language].huyPhongThanhCong, 5)
                                                            } else {
                                                                Notification('error', `${multiLang?.[language]?.coLoiXayRa}`, `${multiLang?.[language]?.coLoiKhiHuy}`, 5)
                                                            }

                                                            resolve();
                                                        } catch (error) {
                                                            console.log('Oops errors!');
                                                            reject(error);
                                                        }
                                                    });
                                                },
                                                onCancel() {
                                                    console.log('Cancel');
                                                },
                                            });
                                        }} style={{ width: '8%', height: '100%', backgroundColor: '#ca4636', display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 5, borderLeftColor: 'white', borderLeftStyle: 'solid' }}><DeleteOutlined style={{ color: 'white', fontSize: 18 }} /></div>}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* <Modal title={`${roomChoose?.Name} | ${roomChoose?.Area}`} open={modalHuy} width={'40%'} onCancel={() => setModalHuy(false)} footer={false} >
            </Modal> */}
        </div >
    )
}

export default HomeScreen
