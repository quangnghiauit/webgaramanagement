import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Badge, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Row, Table} from 'reactstrap';
import {getInfoMaterialUser, getInfoRepairBillID} from "../../../api/TransManagement/transmanagement";


class CarHandlingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licensePlate: '',
            status: '',
            repairBillID: '',
            createdDate: '',
            list: [],
        }

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
            onRowClick: function (row) {
                alert(`You click row id: ${row.id}`);
            }
        }
    }

    componentDidMount() {
        this.setState({
            licensePlate: this.props.match.params.id
        }, () => this.handleGetInfoMaterialUser(this.state.licensePlate));
    }

    handleGetInfoMaterialUser(licensePlate) {
        getInfoMaterialUser(licensePlate).then(response => {
            this.setState({
                listTable: response.data,
                list: response.data.carHandleDTOList,
                repairBillID: response.data.repairBillID,
                createdDate: response.data.createdDate,
                status: response.data.status
            })

        })
    }

    render() {
        const {list} = this.state;
        return (
            <div className="animated handle-car">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Xử lý xe
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" lg="6">
                                <FormGroup row>
                                    <Label htmlFor="licensePlate" sm={2}>Biển Số</Label>
                                    <Col sm={6}>
                                        <Input type="text" id="id"
                                               onChange={(e) => this.setState({licensePlate: e.target.value})}
                                               value={this.state.licensePlate}
                                               disabled/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="createdDate" sm={2}>Ngày lập hóa đơn</Label>
                                    <Col sm={6}>
                                        <Input type="text" id="id"
                                               onChange={(e) => this.setState({createdDate: e.target.value})}
                                               value={this.state.createdDate}
                                               disabled/>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup row>
                                    <Label htmlFor="repairBillID" sm={2}>Hóa đơn giao dịch</Label>
                                    <Col sm={7}>
                                        <Input type="text" id="id"
                                               onChange={(e) => this.setState({repairBillID: e.target.value})}
                                               value={this.state.repairBillID}
                                               disabled/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Table responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên phụ tùng</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.materialName}</td>
                                            <td>{item.reqNum}</td>
                                            <td>{item.price}</td>
                                            <td>{item.totalMoney}</td>
                                            <td>
                                                {item.isactive == 0
                                                    ?
                                                    <Badge color="success">Không
                                                        có</Badge>
                                                    :
                                                    <Badge color="warning">Đang xử
                                                        lý</Badge>
                                                }
                                            </td>
                                        </tr>
                                    )

                                }) : null

                            }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        Trạng thái :
                        {
                            (this.state.status == 0)
                                ?
                                <Badge color="primary" pill>Chẳng có gì hihi</Badge>
                                :
                                (
                                    (this.state.status == 1)
                                        ? (
                                            <Badge color="warning" pill>Đang xử lý</Badge>
                                        )

                                        :
                                        <Badge color="success" pill></Badge>
                                )

                        }

                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default CarHandlingInfo;
