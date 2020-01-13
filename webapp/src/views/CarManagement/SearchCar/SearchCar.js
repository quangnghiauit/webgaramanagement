import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Badge,
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
import {getAllCar} from "../../../api/CarManagement/carmanagement";

class SearchCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCar: null,

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 5,
            definePa: [],
            filterPa: []
        }
        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {
        getAllCar().then(res => {
            this.setState({
                listCar: res.data
            }, () => this.handlePagination())

        })
    }

    handlePagination() {
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

    render() {
        const {listCar} = this.state;
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
            <div className="animated search-car">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Danh sách xe
                    </CardHeader>
                    <CardBody>
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
                                <th>Biển số</th>
                                <th>Tên khách hàng</th>
                                <th>Mã khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Trạng thái xe</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                listCar ? listCar.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.licensePlate}</td>
                                            <td>{item.displayname}</td>
                                            <td>{item.userID}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>
                                                {item.status == "0"
                                                    ?
                                                    <Badge color="primary">Chưa tiếp nhận</Badge>
                                                    :
                                                    item.status == "1"
                                                        ?
                                                        <Badge color="warning"> Đang xử lý</Badge>
                                                        :
                                                        <Badge color="success">Đã xử lý</Badge>


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
                </Card>
            </div>
        );
    }
}

export default SearchCar;
