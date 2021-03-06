import React, {Suspense} from 'react';
import {Layout} from "antd";
import {SideNav} from "../sidenav";
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
                        <Dashboard/>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};