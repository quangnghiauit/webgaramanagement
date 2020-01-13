import React, {Component} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';
import {getInfoClient, updateClient} from "../../../api/UserManagement/userManagement";
import {addCar, getListCarByUserID, processStatusHandleCar} from "../../../api/CarManagement/carmanagement";

class HistoryTransUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            userID: '',
            displayname: '',
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

            curPaItem: 1,
            maxRows: 5,
            maxPaItems: 5,
            definePa: [],
            filterPa: []
        };
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleBill = this.toggleBill.bind(this);
        this.toggleNestedUpdateUser = this.toggleNestedUpdateUser.bind(this);

        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleNestedAdd = this.toggleNestedAdd.bind(this);
        this.toggleAllAdd = this.toggleAllAdd.bind(this);
        this.handleAddCar = this.handleAddCar.bind(this);

        this.toggleNestedProcessStatusHandleCar = this.toggleNestedProcessStatusHandleCar.bind(this);
        this.toggleAllProcessStatusHandleCar = this.toggleAllProcessStatusHandleCar.bind(this);
        this.toggleProcessStatusHandleCar = this.toggleProcessStatusHandleCar.bind(this);
        this.toggleProcess = this.toggleProcess.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);

    }

    componentDidMount() {
        this.setState({
            userID: this.props.match.params.id
        }, () => this.handleGetInfoUser(this.state.userID));
    }

    handleGetInfoUser(userID) {
        getInfoClient(userID).then(res => {
            this.setState({
                userID: res.data.userID,
                displayname: res.data.displayname,
                address: res.data.address,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber,
                user: res.data
            })
        })

        getListCarByUserID(userID).then(res => {
            this.setState({
                listCar: res.data
            }, () => {
                const table = document.getElementById('table-cars');
                const tr = table.getElementsByTagName('tr');
                if (tr.length - 1 > this.state.maxRows) {
                    let temp = [];
                    for (let i = 1; i <= Math.ceil((tr.length - 1) / this.state.maxRows); i++)
                        temp.push(i);
                    this.setState({definePa: temp},
                        () => {
                            if (this.state.definePa.length - this.state.curPaItem + 1 >= this.state.maxPaItems) {
                                let temp = [];
                                for (let i = this.state.curPaItem - 1; i < this.state.curPaItem + this.state.maxPaItems - 1; i++) {
                                    temp.push(this.state.definePa[i]);
                                }
                                this.setState({filterPa: temp});
                            } else {
                                let temp = [];
                                if (this.state.definePa.length - this.state.maxPaItems >= 0)
                                    for (let i = this.state.definePa.length - this.state.maxPaItems; i < this.state.definePa.length; i++)
                                        temp.push(this.state.definePa[i]);
                                else {
                                    temp = [...this.state.definePa];
                                }
                                this.setState({filterPa: temp});
                            }
                        });
                } else
                    this.setState({definePa: [1]},
                        () => {
                            this.setState({filterPa: this.state.definePa});
                        });
                this.filterPa();
            })
        })

    }

    filterTable() {
        let td, txtValue, display;
        const filter = document.getElementById("search").value.toUpperCase();
        const table = document.getElementById("table-cars");
        const tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            display = false;
            for (let j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    display = true;
                    break;
                }
            }
            if (display) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }

        }
    }

    filterPa() {
        const table = document.getElementById('table-cars');
        const tr = table.getElementsByTagName('tr');
        for (let i = 1; i < tr.length; i++) {
            if ((i >= (this.state.curPaItem - 1) * this.state.maxRows + 1) && (i <= this.state.curPaItem * this.state.maxRows))
                tr[i].style.display = '';
            else
                tr[i].style.display = 'none';
        }
    }

    togglePre() {
        if (this.state.curPaItem > 1) {
            this.setState({
                curPaItem: this.state.curPaItem - 1
            }, () => {
                this.filterPa();
                if (this.state.definePa.length - this.state.curPaItem + 1 >= this.state.maxPaItems) {
                    let temp = [];
                    for (let i = this.state.curPaItem - 1; i < this.state.curPaItem + this.state.maxPaItems - 1; i++) {
                        temp.push(this.state.definePa[i]);
                    }
                    this.setState({filterPa: temp});
                } else {
                    let temp = [];
                    if (this.state.definePa.length - this.state.maxPaItems >= 0)
                        for (let i = this.state.definePa.length - this.state.maxPaItems; i < this.state.definePa.length; i++)
                            temp.push(this.state.definePa[i]);
                    else {
                        temp = [...this.state.definePa];
                    }
                    this.setState({filterPa: temp});
                }
            });
        }
    }

    toggleNext() {
        if (this.state.curPaItem * this.state.maxRows < this.state.listCar.length) {
            this.setState({
                curPaItem: this.state.curPaItem + 1
            }, () => {
                this.filterPa();
                if (this.state.definePa.length - this.state.curPaItem + 1 >= this.state.maxPaItems) {
                    let temp = [];
                    for (let i = this.state.curPaItem - 1; i < this.state.curPaItem + this.state.maxPaItems - 1; i++) {
                        temp.push(this.state.definePa[i]);
                    }
                    this.setState({filterPa: temp});
                } else {
                    let temp = [];
                    if (this.state.definePa.length - this.state.maxPaItems >= 0)
                        for (let i = this.state.definePa.length - this.state.maxPaItems; i < this.state.definePa.length; i++)
                            temp.push(this.state.definePa[i]);
                    else {
                        temp = [...this.state.definePa];
                    }
                    this.setState({filterPa: temp});
                }
            });
        }
    }

    togglePa(i) {
        this.setState({
                curPaItem: i
            }, () => {
                this.filterPa()
            }
        );
    }

    handleUpdateUser(userID) {
        const requestParams = {
            displayname: this.state.displayname,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber

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


    handleAddCar() {
        const params = {
            userID: this.state.userID,
            licensePlate: this.state.licensePlate,
        };
        if (this.state.licensePlate) {
            addCar(this.state.userID, params).then(res => {
                this.setState({
                    resultAdd: res.data
                }, () => this.toggleNestedAdd())

            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
    }

    toggleAdd() {
        this.setState(prevState => ({
            modalAdd: !prevState.modalAdd
        }));
    }

    toggleNestedAdd() {
        this.setState({
            nestedModalAdd: !this.state.nestedModalAdd,
            closeAllAdd: false
        });
    }

    toggleAllAdd() {
        this.setState({
            nestedModalAdd: !this.state.nestedModalAdd,
            closeAllAdd: true
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


    handleReviewTrans(id) {
        window.location.replace("http://localhost:8080/#/car-management/car-handle-info/" + id);
    }

    render() {
        const {resultAdd, resultUpdateUser, listCar, resultProcessStatusHandleCar} = this.state;
        const listPaItems = this.state.filterPa.map((i, index) =>
            this.state.curPaItem === i ?
                <PaginationItem key={index} active id={'paItem' + i}>
                    <PaginationLink onClick={() => this.togglePa(i)}>{i}</PaginationLink>
                </PaginationItem>
                :
                <PaginationItem key={index} id={'paItem' + i}>
                    <PaginationLink onClick={() => this.togglePa(i)}>{i}</PaginationLink>
                </PaginationItem>
        );
        return (
            <div className="animated fadeIn history-trans-user">
                <Row>
                    <Col xs="12" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Thông tin khách hàng
                            </CardHeader>
                            <CardBody>
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
                            </CardBody>
                            <CardFooter>
                                <Button className="float-right" color="success"
                                        onClick={() => this.handleUpdateUser(this.state.userID)}>Cập nhật</Button>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Danh sách xe
                            </CardHeader>
                            <CardBody id="list-cars">
                                <InputGroup className="search">
                                    <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                           title="Enter a search info"/>
                                    <div className="input-group-append">
                                        <i className="fa fa-search form-control" aria-hidden="true"></i>
                                    </div>
                                </InputGroup>
                                <Table id="table-cars" responsive striped>
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Biển số xe</th>
                                        <th>Trạng thái</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        listCar ? listCar.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item.licensePlate}</td>
                                                    <td>{(item.status == 0)
                                                        ?
                                                        <Badge color="secondary">Chưa xử lý</Badge>
                                                        :
                                                        (
                                                            (item.status == 1)
                                                                ?
                                                                <Badge color="danger">Đang xử lý</Badge>
                                                                :
                                                                <Badge color="success">Đã xử lý</Badge>
                                                        )

                                                    }</td>
                                                    <td>
                                                        {
                                                            (item.status == 0)
                                                                ?
                                                                <Button color="primary" size="sm"
                                                                        onClick={() => this.toggleProcess(item.id)}>Tiếp
                                                                    nhận xe</Button>
                                                                :
                                                                (
                                                                    (item.status == 1)
                                                                        ? (
                                                                            <Button color="primary" size="sm"
                                                                                    onClick={() => this.handleReviewTrans(item.licensePlate)}>Xem</Button>
                                                                        )

                                                                        :
                                                                        <Button color="primary" size="sm"
                                                                                onClick={() => this.toggleProcess(item.id)}>Tiếp nhận
                                                                            lại</Button>
                                                                )

                                                        }
                                                    </td>
                                                </tr>
                                            )

                                        }) : null

                                    }
                                    </tbody>
                                </Table>
                                {
                                    this.state.listCar ?
                                        <Pagination id="pagination">
                                            <PaginationItem>
                                                <PaginationLink previous onClick={this.togglePre}/>
                                            </PaginationItem>
                                            {listPaItems}
                                            <PaginationItem>
                                                <PaginationLink next onClick={this.toggleNext}/>
                                            </PaginationItem>
                                        </Pagination>
                                        : null
                                }
                            </CardBody>
                            <CardFooter>
                                <Button className="float-right" color="success" onClick={this.toggleAdd}>Thêm
                                    xe</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

                {/*<Card>*/}
                    {/*<CardHeader>*/}
                        {/*<i className="fa fa-align-justify"></i> Lịch sử giao dịch*/}
                    {/*</CardHeader>*/}
                    {/*<CardBody>*/}
                        {/*<Button color="link" onClick={this.toggleBill}>[ngày hóa đơn]</Button>*/}
                        {/*<Collapse isOpen={this.state.collapseBill}>*/}
                            {/*<Card>*/}
                                {/*<CardBody>*/}
                                    {/*<Table>*/}
                                        {/*<thead>*/}
                                        {/*<tr>*/}
                                            {/*<th>Biển số xe</th>*/}
                                            {/*<th>Phụ tùng</th>*/}
                                            {/*<th>Số lượng</th>*/}
                                            {/*<th>Đơn giá</th>*/}
                                            {/*<th>Thành tiền</th>*/}
                                        {/*</tr>*/}
                                        {/*</thead>*/}
                                        {/*<tbody>*/}
                                        {/*<tr>*/}
                                            {/*<td>HE234</td>*/}
                                            {/*<td>Bánh xe</td>*/}
                                            {/*<td>5</td>*/}
                                            {/*<td>20</td>*/}
                                            {/*<td>100</td>*/}
                                        {/*</tr>*/}
                                        {/*</tbody>*/}
                                        {/*<tfoot>*/}
                                        {/*<tr>*/}
                                            {/*<th>Tổng hóa đơn</th>*/}
                                            {/*<td scope="row"></td>*/}
                                            {/*<td scope="row"></td>*/}
                                            {/*<td scope="row"></td>*/}
                                            {/*<th>0000</th>*/}
                                        {/*</tr>*/}
                                        {/*</tfoot>*/}
                                    {/*</Table>*/}
                                {/*</CardBody>*/}
                            {/*</Card>*/}
                        {/*</Collapse>*/}
                    {/*</CardBody>*/}
                {/*</Card>*/}
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


                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}
                       className='modal-info'>
                    <ModalHeader toggle={this.toggleAdd}>Tiếp nhận xe</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="customer-id">Mã khách hàng</Label>
                            <Input type="text" id="customer-id" placeholder="Enter your customer-id"
                                   value={this.state.userID}
                                   disabled/>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="car-id">Biển số xe</Label>
                            <Input type="text" id="car-id" placeholder="Enter your car-id"
                                   value={this.state.licensePlate}
                                   onChange={(e) => this.setState({licensePlate: e.target.value})}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={this.handleAddCar}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalAdd}
                       toggle={() => this.toggleNestedAdd()}
                       onClosed={this.state.closeAllAdd ? () => this.toggleAdd()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAdd()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultAdd ?
                            resultAdd.returnMessage : null
                        }
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.modalProcessStatusHandleCar} toggle={this.toggleProcessStatusHandleCar}
                       className={'modal-info '
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleAdd}>Xác nhận xử lý </ModalHeader>
                    <ModalBody>
                        Bạn muốn tiếp nhận xử lý xe này ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleProcessStatusHandleCar()}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleProcessStatusHandleCar}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalProcessStatusHandleCar}
                       toggle={() => this.toggleNestedProcessStatusHandleCar()}
                       onClosed={this.state.closeAllProcessStatusHandleCar ? () => this.toggleProcessStatusHandleCar()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllProcessStatusHandleCar()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultProcessStatusHandleCar ?
                            resultProcessStatusHandleCar.returnMessage : null
                        }
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

export default HistoryTransUser;
