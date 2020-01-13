import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Label,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from "react-dates";
import {searchRevenue} from "../../../api/BillManagement/billmanagement";
import moment from "moment";
import * as commonFunction from "../../../api/commonFunction";

class RevenueReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // startDate: moment().subtract(1,'months').format("DD/MM/YYYY"),
            // endDate: moment().format("DD/MM/YYYY"),
            startDate: null,
            endDate: null,
            list: null,
            sumTotalMoney: 0,

            curPaItem: 1,
            maxRows: 20,
            maxPaItems: 5,
            definePa: [],
            filterPa: []
        }

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    onDateChange(from, to) {
        this.setState({
            startDate: from,
            endDate: to
        });
    };

    handleSumTotalMoney() {
        const arrayTotalMoney = this.state.list;
        if (arrayTotalMoney) {
            let sum = 0;
            arrayTotalMoney.forEach(function (object) {
                sum += object.totalMoney
            })
            this.setState({
                sumTotalMoney: sum
            }, () => this.handlePagination())

        }
    }

    handleSearch() {
        const transdatefrom = this.state.startDate;
        const transdateto = this.state.endDate;
        const params = {
            startDate: transdatefrom ? moment(transdatefrom).format("DD/MM/YYYY") : null,
            endDate: transdateto ? moment(transdateto).format("DD/MM/YYYY") : null,
        };
        if (this.state.startDate && this.state.endDate) {
            searchRevenue(params).then(res => {
                this.setState({
                    list: res.data
                }, () => this.handleSumTotalMoney())

            }).catch(error => {
            });
        } else {
            alert("Vui lòng chọn mốc thời gian.")
        }
    }

    handlePagination() {
        const table = document.getElementById('table-report-revenue');
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

    filterPa() {
        const table = document.getElementById('table-report-revenue');
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
            <div className="animated report-revenue">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Báo cáo doanh thu
                    </CardHeader>
                    <CardBody>
                        <Label htmlFor="name">Thời gian báo cáo</Label>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <DateRangePicker
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}

                                        startDateId="startDate"
                                        endDateId="endDate"

                                        startDatePlaceholderText="Từ ngày"
                                        endDatePlaceholderText="Đến ngày"

                                        displayFormat="DD/MM/YYYY"
                                        onDatesChange={
                                            ({startDate, endDate}) => this.onDateChange(
                                                startDate, endDate)
                                        }

                                        focusedInput={this.state.focusedInput}

                                        onFocusChange={
                                            focusedInput => this.setState({focusedInput})
                                        }
                                        orientation={this.state.orientation}
                                        openDirection={this.state.openDirection}
                                        isOutsideRange={() => false}
                                        minimumNights={0}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Button type="button" color="primary"
                                            style={{width: "100px",height:"50px"}}
                                            onClick={() => this.handleSearch()}

                                    >
                                        <i className="fa fa-search"></i>{'\u00A0'} Search
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Table id="table-report-revenue" responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã giao dịch</th>
                                <th>Ngày xuất hóa đơn</th>
                                <th>Người xuất hóa đơn</th>
                                <th>Giá trị hóa đơn</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.repairBillID}</td>
                                            <td>{item.exportDate}</td>
                                            <td>{item.exportBy}</td>
                                            <td>{item.totalMoney}</td>
                                        </tr>
                                    )

                                }) : null

                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Tổng doanh thu</th>
                                <td scope="row"></td>
                                <td scope="row"></td>
                                <td scope="row"></td>
                                <th>
                                    {this.state.sumTotalMoney ? (commonFunction.formatNumber(this.state.sumTotalMoney, 0,
                                        '.', ',')) : 0}
                                </th>
                            </tr>
                            </tfoot>
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
                </Card>
            </div>
        );
    }
}

export default RevenueReport;