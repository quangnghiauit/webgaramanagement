import React, {Component} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    InputGroup,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table
} from 'reactstrap';
import {updateClient} from "../../../api/UserManagement/userManagement";
import {addCar, getListCarHandlingByUserID, processStatusHandleCar} from "../../../api/CarManagement/carmanagement";
import {getUserID} from '../../../api/Client/client'

class CarHandling extends Component {
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
            maxPaItems: 3,
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
        getUserID().then(res=>{
            this.setState({
                userID:res.data.userID
            },()=>this.handleGetInfoUser(this.state.userID));
        });
    }

    handleGetInfoUser(userID) {
        getListCarHandlingByUserID(userID).then(res => {
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
        window.location.replace("http://localhost:8080/#/client/car-handling-info/"+id);
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
                                                        <Badge color="primary">Đã xử lý</Badge>
                                                )

                                            }</td>
                                            <td>
                                                {
                                                    (item.status == 1)
                                                        ?
                                                        (
                                                            <Button color="primary" size="sm"
                                                                    onClick={() => this.handleReviewTrans(item.licensePlate)}>Xem</Button>
                                                        )
                                                        :
                                                        null
                                                }
                                            </td>
                                        </tr>
                                    )

                                }) : null

                                }
                                </tbody>
                            </Table>
                            {
                                this.state.listCar?
                                <Pagination id="pagination">
                                <PaginationItem>
                                    <PaginationLink previous onClick={this.togglePre}/>
                                </PaginationItem>
                                    {listPaItems}
                                <PaginationItem>
                                    <PaginationLink next onClick={this.toggleNext}/>
                                </PaginationItem>
                                </Pagination>
                                :null
                            }
                    </CardBody>
                </Card>
            </div>

        )
    }
}

export default CarHandling;
