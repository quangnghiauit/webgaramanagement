import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Col
} from 'reactstrap';
import {getInfoClient, updateClient} from "../../../api/UserManagement/userManagement";
import {getUserID} from '../../../api/Client/client'

class ClientInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            userID: '',
            displayname: '',
            userName:'',
            address: '',
            email: '',
            phoneNumber: '',
            user: [],
            resultUpdateUser: null,
            nestedModalUpdateUser: false,
            closeAllUpdateUser: false,
            modalUpdate: false,
            listCar: [],
            licensePlate: '',
            modalAdd: false,
            nestedModalAdd: false,
            closeAllAdd: false,
            resultAdd: null,
            modalAddCar: false,

            resultProcessStatusHandleCar: null,
            modalProcessStatusHandleCar: false,
            nestedModalProcessStatusHandleCar: false,
            closeAllProcessStatusHandleCar: false,
            collapseBill: false,

        };
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleBill = this.toggleBill.bind(this);
        this.toggleNestedUpdateUser = this.toggleNestedUpdateUser.bind(this);

    }

    componentDidMount() {
        getUserID().then(res => {
            this.setState({
                userID: res.data.userID
            }, () => this.handleGetInfoUser(this.state.userID));
        });
    }

    handleGetInfoUser(userID) {
        getInfoClient(userID).then(res => {
            this.setState({
                userID: res.data.userID,
                displayname: res.data.displayname,
                address: res.data.address,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber,
                user: res.data,
                userName:res.data.userName
            })
        })

    }

    handleUpdateUser(userID) {
        const requestParams = {
            displayname: this.state.displayname,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            userName:this.state.userName
        }
        if (this.state.displayname && this.state.phoneNumber) {
            updateClient(userID, requestParams).then(res => {
                this.setState({
                    resultUpdateUser: res.data
                }, () => this.toggleNestedUpdateUser())

            })
        } else {
            alert("Vui lòng điền đầy đủ tên và số điện thoại.")
        }

    }


    toggleNestedUpdateUser() {
        this.setState({
            nestedModalUpdateUser: !this.state.nestedModalUpdateUser,
        });
    }

    toggleAllUpdateUser() {
        this.setState({
            nestedModalUpdateUser: !this.state.nestedModalUpdateUser,
        });
        window.location.reload();
    }


    handleProcessStatusHandleCar() {
        processStatusHandleCar(this.state.id).then(res => {
            this.setState({
                resultProcessStatusHandleCar: res.data

            }, () => this.toggleNestedProcessStatusHandleCar())
        })
    }

    toggleNestedProcessStatusHandleCar() {
        this.setState({
            nestedModalProcessStatusHandleCar: !this.state.nestedModalProcessStatusHandleCar,
            closeAllProcessStatusHandleCar: false
        });
    }

    toggleAllProcessStatusHandleCar() {
        this.setState({
            nestedModalProcessStatusHandleCar: !this.state.nestedModalProcessStatusHandleCar,
            closeAllProcessStatusHandleCar: true
        });
        window.location.reload();
    }

    toggleProcessStatusHandleCar() {
        this.setState(prevState => ({
            modalProcessStatusHandleCar: !prevState.modalProcessStatusHandleCar
        }));
    }

    toggleProcess(logid) {
        this.setState(prevState => ({
            id: logid,
            modalProcessStatusHandleCar: !prevState.modalProcessStatusHandleCar
        }));
    }

    toggleUpdate() {
        this.setState({modalUpdate: !this.state.modalUpdate});
    }

    toggleBill() {
        this.setState({collapseBill: !this.state.collapseBill});
    }


    render() {
        const {resultAdd, resultUpdateUser, listCar, resultProcessStatusHandleCar} = this.state;

        return (
            <div className="animated fadeIn history-trans-user">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Thông tin khách hàng
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label htmlFor="id">Mã khách hàng</Label>
                                    <Input type="text" id="id" placeholder="Enter your id"
                                           onChange={(e) => this.setState({userID: e.target.value})}
                                           value={this.state.userID}
                                           disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Tên khách hàng</Label>
                                    <Input type="text" id="name" placeholder="Enter your name"
                                           onChange={(e) => this.setState({displayname: e.target.value})}
                                           value={this.state.displayname}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input type="text" id="address" placeholder="Enter your address"
                                           onChange={(e) => this.setState({address: e.target.value})}
                                           value={this.state.address}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label htmlFor="username">UserName</Label>
                                    <Input type='text' id="username" placeholder={"Enter your userName"}
                                           value={this.state.userName}
                                            disabled
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email" placeholder="Enter Email.."
                                           onChange={(e) => this.setState({email: e.target.value})}
                                           value={this.state.email}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input type="text" id="phone" placeholder="Enter your phone"
                                           onChange={(e) => this.setState({phoneNumber: e.target.value})}
                                           value={this.state.phoneNumber}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button className="float-right" color="success"
                                onClick={() => this.handleUpdateUser(this.state.userID)}>Cập nhật</Button>
                    </CardFooter>
                </Card>
                <Modal isOpen={this.state.nestedModalUpdateUser}
                       toggle={() => this.toggleNestedUpdateUser()}
                       onClosed={() => this.toggleAllUpdateUser()}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleNestedUpdateUser()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultUpdateUser ?
                            resultUpdateUser.returnMessage : null
                        }
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

export default ClientInfo;
