import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    InputGroup, Pagination,
    PaginationItem,
    PaginationLink,
    Table
} from 'reactstrap';

import {getHistoryBill} from '../../../api/BillManagement/billmanagement'
import {getRole} from "../../../api/Role/role";


class HistoryTransBill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            roles: [],

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 3,
            definePa: [],
            filterPa: []
        }
        this.load = this.load.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {
        getRole()
            .then(response => {
                this.setState({roles: response.data});
            })
            .catch(error => {
            });
        this.load();
    }

    load() {
        getHistoryBill().then(res => {
            this.setState({
                list: res.data
            }, () => this.handlePagination())
        })
    }

    handlePagination() {
        const table = document.getElementById('table-bill');
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
    }

    filterTable() {
        let td, txtValue, display;
        const filter = document.getElementById("search").value.toUpperCase();
        const table = document.getElementById("table-bill");
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
        const table = document.getElementById('table-bill');
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

    toggleBill(id) {
        window.location.replace("http://localhost:8080/#/bill-management/bill-info/" + id)
    }

    render() {
        const {list,roles} = this.state;
        const listPaItems = this.state.filterPa.map(function (i, index) {
            return this.state.curPaItem === i ?
                <PaginationItem key={index} active id={'paItem' + i}>
                    <PaginationLink onClick={() => this.togglePa(i)}>{i}</PaginationLink>
                </PaginationItem>
                :
                <PaginationItem key={index} id={'paItem' + i}>
                    <PaginationLink onClick={() => this.togglePa(i)}>{i}</PaginationLink>
                </PaginationItem>;

        }.bind(this));
        return (
            <div className="animated search-bill">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Tra cứu hóa đơn
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="search">
                            <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                   title="Enter a search info"/>
                            <div className="input-group-append">
                                <i className="fa fa-search form-control" aria-hidden="true"></i>
                            </div>
                        </InputGroup>
                        <Table id="table-bill" responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã hóa đơn</th>
                                <th>Biển số xe</th>
                                <th>Mã khách hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày tạo hóa đơn</th>
                                {roles !== '[ROLE_ADMIN]'? (
                                    <th>Trạng thái</th>
                                ):null}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.repairBillID}</td>
                                            <td>{item.licensePlate}</td>
                                            <td>{item.userID}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.createdDate}</td>
                                            {roles !== '[ROLE_ADMIN]'? (
                                                <td>
                                                    {
                                                        item.status == 2 ? (
                                                            <Button color="success"
                                                                    onClick={() => this.toggleBill(item.repairBillID)}>Đã thanh toán</Button>
                                                        ) : (
                                                            item.status == 1 ? (
                                                                <Button color="danger"
                                                                        onClick={() => this.toggleBill(item.repairBillID)}>Chưa thanh toán</Button>
                                                            ) : null
                                                        )

                                                    }
                                                    {

                                                    }
                                                </td>
                                            ):null}

                                        </tr>
                                    );
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
                                : null
                        }
                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default HistoryTransBill;
