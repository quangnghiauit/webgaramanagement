import React, {Component} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Row, Table} from 'reactstrap';
import {exportBill, getDetailBill} from '../../../api/BillManagement/billmanagement'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import * as commonFunction from "../../../api/commonFunction";


class BillInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            repairBillID: null,
            createdDate: null,
            userID: null,
            displayname: null,
            sumTotalMoney: 0,
            exportfile: null,
            status: null

        }
        this.load = this.load.bind(this);
        this.exportBill = this.exportBill.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.setState({
            repairBillID: this.props.match.params.id
        }, () => {
            getDetailBill(this.state.repairBillID).then(res => {
                this.setState({
                    list: res.data.detailBillDTOS,
                    createdDate: res.data.createdDate,
                    userID: res.data.userID,
                    displayname: res.data.fullName,
                    status: res.data.status
                }, () => this.handleSumTotalMoney())
            })
        })
    }

    handleSumTotalMoney() {
        const arrayTotalMoney = this.state.list;
        if (arrayTotalMoney) {
            let sum = 0;
            arrayTotalMoney.forEach(function (object) {
                sum += object.totalMoney
            })
            this.setState({
                sumTotalMoney: sum
            })

        }
    }

    handleExportBill() {
        const params = {
            repairBillID: this.props.match.params.id,
            totalMoney: this.state.sumTotalMoney,
        };
        if (this.props.match.params.id) {
            exportBill(params).then(res => {
                this.setState({
                        exportfile: res.data.returnCode
                    }, () => this.exportBill()
                )

            })
        } else {
            alert("Xuất file không thành công.")
        }
    }

    exportBill() {
        if (this.state.exportfile === "1") {
            const input = document.getElementById('bill-info');
            input.style.width = '210mm';
            input.style.minHeight = '297mm';
            input.style.marginLeft = 'auto';
            input.style.marginRight = 'auto';
            document.getElementById('footer').style.display = "none";
            // input.style.backgroundColor='#f5f5f5';
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    pdf.save('bill_' + this.state.repairBillID + '.pdf');
                })
                .then(() => {
                    window.location.reload();
                })
        } else {
            alert("Xuất file không thành công.")
        }


    }

    render() {
        const {list, repairBillID, createdDate, userID, displayname} = this.state;
        return (
            <div className="animated bill-info" id="bill-info">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Hóa đơn
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label htmlFor="id">Mã hóa đơn</Label>
                                    <Input type="text" placeholder={repairBillID} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="customer-id">Mã khách hàng</Label>
                                    <Input type="text" id="customer-id" placeholder={userID} disabled/>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label htmlFor="date">Ngày lập hóa đơn</Label>
                                    <Input type="text" placeholder={createdDate} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="customer-name">Tên khách hàng</Label>
                                    <Input type="text" id="customer-name" placeholder={displayname} disabled/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label htmlFor="table-bill">Chi tiết hóa đơn</Label>
                            <Table id="table-bill" responsive>
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã phụ tùng</th>
                                    <th>Tên phụ tùng</th>
                                    <th>Số lượng</th>
                                    <th>Giá bán</th>
                                    <th>Thành tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    list ? list.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.materialID}</td>
                                                <td>{item.materialName}</td>
                                                <td>{item.reqNum}</td>
                                                <td>{item.price}</td>
                                                <td>{item.totalMoney}</td>
                                            </tr>
                                        )
                                    }) : null
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Tổng giá trị hóa đơn</th>
                                    <td scope="row"></td>
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
                        </FormGroup>
                    </CardBody>
                    <CardFooter id='footer'>
                        {
                            this.state.status == 1 ? (
                                <Button id="btn-export-bill" color="success"
                                        onClick={() => this.handleExportBill()}>Xuất hóa đơn</Button>
                            ) : null

                        }
                    </CardFooter>
                </Card>

            </div>
        );
    }
}

export default BillInfo;
