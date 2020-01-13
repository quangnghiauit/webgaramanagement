import React, {Component} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
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
    Table
} from 'reactstrap';
import {getListCarHandling} from "../../../api/CarManagement/carmanagement";


class ListCarHandling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            collapseCar: false,
            modalAddMaterials: false,

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 5,
            definePa: [],
            filterPa: []
        }

        this.toggleCar = this.toggleCar.bind(this);
        this.toggleMaterials = this.toggleMaterials.bind(this);

        this.handleGetListCarHandling = this.handleGetListCarHandling.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {
        this.handleGetListCarHandling()
    }

    handleGetListCarHandling() {
        getListCarHandling().then(response => {
            this.setState({
                listTable: response.data,
                list: response.data,
            }, () => {
                const table = document.getElementById('table-cars-handling');
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
        const table = document.getElementById("table-cars-handling");
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
        const table = document.getElementById('table-cars-handling');
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
        if (this.state.curPaItem * this.state.maxRows < this.state.list.length) {
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

    handleCar(id) {
        window.location.replace("http://localhost:8080/#/car-management/car-handle-list/" + id);
    }

    toggleCar() {
        this.setState({collapseCar: !this.state.collapseCar});
    }

    toggleMaterials() {
        this.setState({modalAddMaterials: !this.state.modalAddMaterials});
    }

    render() {
        const {list} = this.state;
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
            <div className="animated search-car-handling">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Danh sách xe đang xử lý
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="search">
                            <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                   title="Enter a search info"/>
                            <div className="input-group-append">
                                <i className="fa fa-search form-control" aria-hidden="true"></i>
                            </div>
                        </InputGroup>
                        <Table id="table-cars-handling" responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Biển số xe</th>
                                <th>Tên khách hàng</th>
                                <th>Trạng thái</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.licensePlate}</td>
                                            <td>{item.displayName}</td>
                                            <td>
                                                {item.status == 1
                                                    ?
                                                    <Badge color="warning">Đang chờ xử lý</Badge>
                                                    :
                                                    <Badge color="success">Xử lý</Badge>

                                                }
                                            </td>
                                            <td>
                                                {item.status == 1
                                                    ?
                                                    <Button color="danger"
                                                            onClick={() => this.handleCar(item.licensePlate)}>Xử
                                                        lý</Button>
                                                    :
                                                    <Button color="success" onClick={this.toggleCar}>Xử lý</Button>

                                                }
                                            </td>
                                        </tr>
                                    )

                                }) : null

                            }
                            </tbody>
                        </Table>
                        {
                            this.state.list ?
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
                <Collapse isOpen={this.state.collapseCar}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Xử lý xe
                            <Button onClick={this.toggleMaterials} color="link" size="sm">Thêm</Button>
                            <Modal isOpen={this.state.modalAddMaterials} toggle={this.toggleMaterials}
                                   className={'modal-info ' + this.props.className}>
                                <ModalHeader toggle={this.toggleMaterials}>Thêm phụ tùng</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Phụ tùng</Label>
                                        <Input type="select" id="select-materials">
                                            <option value="0">Please select</option>
                                            <option value="1">Kính</option>
                                            <option value="2">Lốp</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Số lượng</Label>
                                        <Input type="number" placeholder="0"/>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleMaterials}>Thêm</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleMaterials}>Thoát</Button>
                                </ModalFooter>
                            </Modal>
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Phụ tùng</th>
                                    <th>Số lượng</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Kính</td>
                                    <td>15</td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={this.toggleCar} color="success">Lưu</Button>{' '}
                            <Button onClick={this.toggleCar} color="secondary">Thoát</Button>
                        </CardFooter>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default ListCarHandling;
