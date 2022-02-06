import React, {Suspense} from 'react';
import {Layout} from "antd";
import {SideNav} from "../sidenav";
import {UsersTable} from "../../components/users-table";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import {AddUsers} from "../../components/add-users";
import {Dashboard} from "../../components/dashboard";


const { Content } = Layout;

export const AppLayout = () => {

    return(
        <Layout className="site-layout">
            <SideNav />
            <Layout>
                <div className='header'>
                  Dashboard
                </div>

                <Content className='content'>
                    <Suspense fallback={null}>
                        {/*<Routes>*/}
                        {/*    <Route path='/dashboard' element={<UsersTable/>}/>*/}
                        {/*    <Route path='/' element={<UsersTable/>}/>*/}
                        {/*    <Route path='/add-new-user' element={<AddUsers/>}/>*/}
                        {/*</Routes>*/}
                        <Dashboard/>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};