import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
// UserManagement
import SearchUser from '../../views/UserManagement/SearchUser/SearchUser';
import UserInfo from '../../views/UserManagement/UserInfo/UserInfo';
import HistoryTransUser from '../../views/UserManagement/HistoryTransUser/HistoryTransUser';
// CarManagement
import SearchCar from '../../views/CarManagement/SearchCar/SearchCar';
import CarHandleInfo from '../../views/CarManagement/CarHandleInfo/CarHandleInfo';
import HandlingCar from '../../views/CarManagement/HandlingCar/HandlingCar';
import ListCarHandling from '../../views/CarManagement/ListCarHandling/ListCarHandling';
// MaterialManagement
import SearchMaterial from '../../views/MaterialManagement/SearchMaterial/SearchMaterial';
import HistoryMaterial from '../../views/MaterialManagement/HistoryMaterial/HistoryMaterial';
// BillManagement
import CreateBill from '../../views/BillManagement/CreateBill/CreateBill';
import HistoryTransBill from '../../views/BillManagement/HistoryTransBill/HistoryTransBill';
import BillInfo from '../../views/BillManagement/BillInfo/BillInfo'
// ReportManagement
import InventoryReport from '../../views/ReportManagement/InventoryReport/InventoryReport';
import RevenueReport from '../../views/ReportManagement/RevenueReport/RevenueReport';
// AdminManagement
import UserManagement from '../../views/AdminManagement/UserManagement/UserManagement';
import RoleManagement from '../../views/AdminManagement/RoleManagement/RoleManagement';
//Client
import ClientInfo from '../../views/Client/ClientInfo/ClientInfo'
import HistoryBill from '../../views/Client/HistoryBill//HistoryBill'
import ClientBillInfo from '../../views/Client/ClientBillInfo/ClientBillInfo'
import CarHandling from '../../views/Client/CarHandling/CarHandling'
import CarHandlingInfo from '../../views/Client/CarHandlingInfo/CarHandlingInfo'

import {getRole} from "../../api/Role/role";


class Full extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: []
        }
    }

    componentDidMount() {
        getRole()
            .then(response => {
                // console.log("roleee",response.data)
                this.setState({roles: response.data});
            })
            .catch(error => {
            });
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Switch>
                                {
                                    this.state.roles === '[ROLE_ADMIN]' && [

                                        <Route path="/dashboard" name="Dashboard" component={Dashboard}/>,

                                        <Route path="/user-management/search" name="SearchUser"
                                               component={SearchUser}/>,
                                        <Route path="/user-management/history/:id" name="HistoryTransUser"
                                               component={HistoryTransUser}/>,


                                        <Route path="/car-management/search" name="SearchCar"
                                               component={SearchCar}/>,

                                        <Route path="/material-management/search" name="SearchMaterial"
                                               component={SearchMaterial}/>,

                                        <Route path="/admin-management/user-management" name="UserManagement"
                                               component={UserManagement}/>,
                                        <Route path="/admin-management/role-management" name="RoleManagement"
                                               component={RoleManagement}/>,

                                        <Route path="/bill-management/create-bill" name="CreateBill"
                                               component={CreateBill}/>,
                                        <Route path="/bill-management/history" name="HistoryTransBill"
                                               component={HistoryTransBill}/>,
                                        <Route path="/bill-management/bill-info/:id" name="BillInfo"
                                               component={BillInfo}/>,

                                        <Redirect from="/" to="/dashboard"/>
                                    ]
                                }

                                {
                                    this.state.roles === '[ROLE_ACCOUNTANT]' && [
                                        <Route path="/material-management/search" name="SearchMaterial"
                                               component={SearchMaterial}/>,
                                        <Route path="/material-management/history" name="HistoryMaterial"
                                               component={HistoryMaterial}/>,

                                        <Route path="/bill-management/create-bill" name="CreateBill"
                                               component={CreateBill}/>,
                                        <Route path="/bill-management/history" name="HistoryTransBill"
                                               component={HistoryTransBill}/>,
                                        <Route path="/bill-management/bill-info/:id" name="BillInfo"
                                               component={BillInfo}/>,

                                        <Route path="/report-management/create-report-revenue"
                                               name="CreateReportRevenue"
                                               component={RevenueReport}/>,
                                        <Route path="/report-management/create-report-inventory"
                                               name="CreateReportInventory"
                                               component={InventoryReport}/>,
                                        <Redirect from="/" to="/"/>

                                    ]
                                }

                                {
                                    this.state.roles === '[ROLE_RECEPTIONIST]' && [

                                        <Route path="/user-management/search" name="SearchUser"
                                               component={SearchUser}/>,
                                        <Route path="/user-management/history/:id" name="HistoryTransUser"
                                               component={HistoryTransUser}/>,
                                        <Route path="/user-management/user-info" name="UserInfo" component={UserInfo}/>,


                                        <Route path="/car-management/search" name="SearchCar"
                                               component={SearchCar}/>,
                                        <Route path="/car-management/car-handle-info/:id" name="CarHandleInfo"
                                               component={CarHandleInfo}/>,
                                        <Redirect from="/" to="/"/>

                                    ]
                                }

                                {
                                    this.state.roles === '[ROLE_MECHANIC]' && [

                                        <Route path="/car-management/car-handle-list/:id" name="HandlingCar"
                                               component={HandlingCar}/>,
                                        <Route path="/car-management/list-car-handling" name="ListCarHandling"
                                               component={ListCarHandling}/>,

                                        <Route path="/material-management/search" name="SearchMaterial"
                                               component={SearchMaterial}/>,
                                        <Redirect from="/" to="/"/>
                                    ]
                                }
                                {
                                    this.state.roles === '[ROLE_CLIENT]' && [
                                        <Route path="/client/client-info" name="ClientInfo"
                                               component={ClientInfo}/>,
                                        <Route path="/client/car-handling" name="CarHandling"
                                               component={CarHandling}/>,
                                        <Route path="/client/car-handling-info/:id" name="CarHandlingInfo"
                                               component={CarHandlingInfo}/>,
                                        <Route path="/client/history" name="HistoryBill"
                                               component={HistoryBill}/>,
                                        <Route path="/client/bill-info/:id" name="ClientBillInfo"
                                               component={ClientBillInfo}/>,

                                        <Redirect from="/" to="/client/client-info"/>
                                    ]
                                }
                                {
                                    this.state.roles === '[ROLE_ANONYMOUS]' && [

                                        <Redirect from="/" to="/login"/>
                                    ]
                                }


                            </Switch>
                        </Container>
                    </main>
                    <Aside/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Full;
