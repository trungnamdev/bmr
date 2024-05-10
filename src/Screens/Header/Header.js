import * as React from 'react';
import logo from '../../assets/LY.png'
import { Avatar, Col, Dropdown, Image, Menu, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { removeStorage } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log("Ok");
        removeStorage('Login')
        navigate('/', { replace: true })
    }
    return (
        <div style={{ width: '100%', height: '100%', borderBottom: '2px solid #eeeeee', display: 'flex', alignItems: 'center' }}>
            <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={logo} width={80} height='100%' preview={false} onClick={() => console.log("ok")} style={{ cursor: 'pointer' }} />
                </Col>
                <Col span={20}></Col>
                <Col span={2} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
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