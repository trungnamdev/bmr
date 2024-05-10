import * as React from 'react';
import logo from '../../assets/LY.png'
import { Avatar, Col, Dropdown, Image, Menu, Row, Select, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { removeStorage } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import vi from "../../assets/vi.jpg"
import en from "../../assets/en.jpg"
import tw from "../../assets/tw.jpg"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
const Header = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { multiLang, language } = useSelector((state) => state.langReducer)

    const onChangeLang = (value) => {
        dispatch({ type: "CHANGE_LANGUAGE", payload: value })
    }
    const handleLogout = () => {
        removeStorage('Login')
        removeStorage('accessToken')
        removeStorage('user')
        navigate(0); 
    }
    return (
        <div style={{ width: '100%', height: '100%', borderBottom: '2px solid #eeeeee', display: 'flex', alignItems: 'center' }}>
            <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={logo} width={80} height='100%' preview={false} style={{ cursor: 'pointer' }} />
                </Col>
                <Col span={18}></Col>
                <Col span={3} >
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Select
                            style={{ width: 180, height: 37, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            onChange={onChangeLang}
                            placeholder={`${multiLang?.[language]?.thayDoiNgonNgu}`}
                            value={language}
                        >
                            {
                                opLang?.map((item, index) => {
                                    return (
                                        <Select.Option key={index} value={item?.value}>
                                            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', width: '100%', }}>
                                                <div style={{ width: '17%' }}>
                                                    <Image src={item.image} width={'100%'} />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.label}
                                                </div>
                                            </div>
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </Col>
                <Col span={1} style={{ display: 'flex', justifyContent: 'flex-start', height: '100%' }}>
                    <Dropdown
                        overlay={
                            <Menu onClick={(e) => {
                                if (e.key === '0') {
                                    handleLogout();
                                }
                            }}>
                                <Menu.Item key="0">Đăng xuất</Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Space >
                            <Avatar style={{ backgroundColor: '#fde3cf', }} size={40} icon={<UserOutlined style={{ color: '#f56a00' }} />}></Avatar>
                        </Space>
                    </Dropdown>
                </Col>
            </Row>
        </div >

    );
}
export default Header;



// <AppBar style={{ backgroundColor: '#FFFFFF', boxShadow: 'none', borderBottom: '1px solid #eeeeee' }}>
//     <Container maxWidth="xl" >
//         <Toolbar disableGutters>
//             <Typography
//                 variant="h6"
//                 noWrap
//                 component="a"
//                 href="/"
//                 sx={{
//                     mr: 2,
//                     display: { xs: 'none', md: 'flex' },
//                     fontFamily: 'monospace',
//                     fontWeight: 700,
//                     letterSpacing: '.3rem',
//                     color: 'inherit',
//                     textDecoration: 'none',
//                 }}
//             >
//                 <Box
//                     component="img"
//                     sx={{
//                         height: 120,
//                         width: 120,
//                         maxHeight: { xs: 120, md: 50 },
//                         maxWidth: { xs: 60, md: 80 },
//                     }}
//                     alt="Logo LYV"
//                     src={logo}
//                 />
//             </Typography>
//             <Box sx={{ flexGrow: 1 }} />
//             <Box sx={{ flexGrow: 0, width: '10%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly' }}>
//                 <Tooltip title='Username'>
//                     Test
//                 </Tooltip>
//                 <Tooltip title="">
//                     <IconButton sx={{ p: 0 }}>
//                         <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//         </Toolbar>
//     </Container>
// </AppBar>