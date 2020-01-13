import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import {
    addTransMaterial,
    deleteMaterial,
    getDetailMaterial,
    getInfoMaterialUser,
    updateMaterial
} from "../../../api/TransManagement/transmanagement";
import {getListMaterialName} from "../../../api/materialManagement/materialManagement";

class HandlingCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            licensePlate: '',
            status: '',
            repairBillID: '',
            createdDate: '',
            list: [],

            infoBill: '',
            materialID: '',
            reqNum: '',

            listMaterial: [],
            detailMaterial: null,

            idUpdate: null,
            materialIDUpdate: null,
            infoBillUpdate: null,
            reqNumUpdate: null,

            idDelete: null,

            modalAdd: false,
            nestedModalAdd: false,
            closeAllAdd: false,
            resultAdd: null,

            modalUpdate: false,
            nestedModalUpdate: false,
            closeAllUpdate: false,
            resultUpdate: null,

            modalDelete: false,
            nestedModalDelete: false,
            closeAllDelete: false,
            resultDelete: null,
        }

        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleNestedAdd = this.toggleNestedAdd.bind(this);
        this.toggleAllAdd = this.toggleAllAdd.bind(this);

        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleNestedUpdate = this.toggleNestedUpdate.bind(this);
        this.toggleAllUpdate = this.toggleAllUpdate.bind(this);

        this.toggleDelete = this.toggleDelete.bind(this);
        this.toggleNestedDelete = this.toggleNestedDelete.bind(this);
        this.toggleAllDelete = this.toggleAllDelete.bind(this);
    }

    componentDidMount() {
        getListMaterialName().then(res => {
            this.setState({
                listMaterial: res.data
            })
        })
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

    handleAddMaterial() {
        const params = {
            infoBill: this.state.infoBill,
            materialID: this.state.materialID,
            reqNum: this.state.reqNum,
        };
        if (this.state.materialID && this.state.reqNum) {
            addTransMaterial(this.state.repairBillID, params).then(res => {
                this.setState({
                    resultAdd: res.data
                }, () => this.toggleNestedAdd())

            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
    }

    handleGetDetailMaterial(logid, repairBillID, materialID) {
        getDetailMaterial(repairBillID, materialID).then(res => {
            this.setState({
                id: logid,
                detailMaterial: res.data,
                idUpdate: res.data.id,
                materialIDUpdate: res.data.materialID,
                infoBillUpdate: res.data.infoBill,
                reqNumUpdate: res.data.reqNum,
            }, () => this.toggleProcessUpdate())
        })
    }

    handleUpdateMaterial() {
        const params = {
            infoBill: this.state.infoBillUpdate,
            materialID: this.state.materialIDUpdate,
            reqNum: this.state.reqNumUpdate,
        };
        const num = parseInt(this.state.reqNum);
        if (parseInt(this.state.materialID) !== 0 && num !== 0) {
            updateMaterial(this.state.idUpdate, params).then(res => {
                this.setState({
                    resultUpdate: res.data,

                }, () => this.toggleNestedUpdate())

            })
        } else {
            alert("Vui lòng kiểm tra lại thông tin.")
        }
    }

    handleDeleteMaterial() {
        deleteMaterial(this.state.idDelete).then(res => {
            this.setState({
                resultDelete: res.data
            }, () => this.toggleNestedDelete())
        })
    }

    toggleUpdate() {
        this.setState(prevState => ({
            modalUpdate: !prevState.modalUpdate
        }));
    }

    toggleProcessUpdate() {
        this.setState(prevState => ({
            modalUpdate: !prevState.modalUpdate
        }));
    }

    toggleNestedUpdate() {
        this.setState({
            nestedModalUpdate: !this.state.nestedModalUpdate,
            closeAllUpdate: false
        });
    }

    toggleAllUpdate() {
        this.setState({
            nestedModalUpdate: !this.state.nestedModalUpdate,
            closeAllUpdate: true
        });
        window.location.reload();
    }

    handleDelete(logid) {
        this.setState({
            idDelete: logid,
            modalDelete: !this.state.modalDelete
        })
    }

    toggleDelete() {
        this.setState(prevState => ({
            modalDelete: !prevState.modalDelete
        }));
    }

    toggleNestedDelete() {
        this.setState({
            nestedModalDelete: !this.state.nestedModalDelete,
            closeAllDelete: false
        });
    }

    toggleAllDelete() {
        this.setState({
            nestedModalDelete: !this.state.nestedModalDelete,
            closeAllDelete: true
        });
        window.location.reload();
    }


    render() {
        const {list, resultAdd, resultUpdate, resultDelete, listMaterial} = this.state;
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

                            </Col>
                            <Col xs="12" lg="6">
                                <FormGroup row>
                                    <Label htmlFor="createdDate" sm={2}>Ngày tạo phiếu sửa chữa</Label>
                                    <Col sm={6}>
                                        <Input type="text" id="id"
                                               onChange={(e) => this.setState({createdDate: e.target.value})}
                                               value={this.state.createdDate}
                                               disabled/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="success" onClick={this.toggleAdd}>Thêm mới</Button>
                        <Table responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên phụ tùng</th>
                                <th>Chi tiết sửa chữa</th>
                                <th>Số lượng</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.materialName}</td>
                                            <td>{item.infoBill}</td>
                                            <td>{item.reqNum}</td>
                                            <td>
                                                <Button color="warning"
                                                        onClick={() => this.handleGetDetailMaterial(item.id, item.repairBillID, item.materialID)}>Cập
                                                    nhật</Button> {' '}
                                                <Button color="danger"
                                                        onClick={() => this.handleDelete(item.id)}>Xóa</Button>

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
                                <Badge color="primary" pill></Badge>
                                :
                                (
                                    (this.state.status == 1)
                                        ? (
                                            <Badge color="warning" pill>Đang xử lý</Badge>
                                        )

                                        :
                                        <Badge color="success" pill>Đã hoàn thành</Badge>
                                )

                        }

                    </CardFooter>
                </Card>

                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}
                       className={'modal-info modal-lg modal-lg-custom'
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleAdd}>Thêm phụ tùng</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Tên phụ tùng</Label>
                            <select
                                className="form-control"
                                id={"listHandleMaterial"}
                                onChange={(e) => this.setState({materialID: e.target.value})}>
                                <option value={null}>Chọn loại phụ tùng</option>
                                {listMaterial.map(item => {
                                    return (
                                        <option key={item.id} value={item.materialID}>
                                            {
                                                item.materialName
                                            }
                                        </option>
                                    );
                                })}
                            </select>
                        </FormGroup>


                        <FormGroup>
                            <Label htmlFor="address">Thông tin sửa chữa</Label>
                            <Input type="text" id="infoBill" value={this.state.infoBill}
                                   onChange={(e) => this.setState({infoBill: e.target.value})}
                                   placeholder="Enter your info bill" required/>
                            <FormText className="help-block">Please enter your infoBill</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="reqNum">Số lượng</Label>
                            <Input type="text" id="reqNum" value={this.state.reqNum}
                                   onChange={(e) => this.setState({reqNum: e.target.value})}
                                   placeholder="Enter your reqNum" required/>
                            <FormText className="help-block">Please enter your reqNum</FormText>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleAddMaterial()}>Submit</Button>{' '}
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


                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate}
                       className={'modal-info modal-lg modal-lg-custom'
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleUpdate}>Cập nhật phụ tùng</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Tên phụ tùng</Label>
                            <select
                                className="form-control"
                                id={"listMaterial"}
                                value={this.state.materialIDUpdate}
                                onChange={(e) => this.setState({materialIDUpdate: e.target.value})}>
                                <option value="">Chọn loại phụ tùng</option>
                                {listMaterial.map(item => {
                                    return (
                                        <option key={item.id} value={item.materialID}>
                                            {
                                                item.materialName
                                            }
                                        </option>
                                    );
                                })}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="address">Thông tin sửa chữa</Label>
                            <Input type="text" id="infoBill" value={this.state.infoBillUpdate}
                                   onChange={(e) => this.setState({infoBillUpdate: e.target.value})}
                                   placeholder="Enter your info bill" required/>
                            <FormText className="help-block">Please enter your infoBill</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="reqNum">Số lượng</Label>
                            <Input type="text" id="reqNum" value={this.state.reqNumUpdate}
                                   onChange={(e) => this.setState({reqNumUpdate: e.target.value})}
                                   placeholder="Enter your reqNum" required/>
                            <FormText className="help-block">Please enter your reqNum</FormText>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleUpdateMaterial()}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleUpdate}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalUpdate}
                       toggle={() => this.toggleNestedUpdate()}
                       onClosed={this.state.closeAllUpdate ? () => this.toggleUpdate()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllUpdate()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultUpdate ?
                            resultUpdate.returnMessage : null
                        }
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}
                       className={'modal-info modal-lg modal-lg-custom'
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleDelete}>Xóa phụ tùng</ModalHeader>
                    <ModalBody>
                        Bạn có muốn xóa không?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleDeleteMaterial()}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalDelete}
                       toggle={() => this.toggleNestedDelete()}
                       onClosed={this.state.closeAllDelete ? () => this.toggleDelete()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllDelete()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultDelete ?
                            resultDelete.returnMessage : null
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default HandlingCar;
