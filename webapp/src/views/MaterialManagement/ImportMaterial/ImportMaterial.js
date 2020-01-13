import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {InputAdapter, TextMask} from 'react-text-mask-hoc';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';

class ImportMaterial extends Component {
    constructor(props) {
        super(props);

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

        this.state = {modalAddMaterials: false};
        this.toggleAddMaterials = this.toggleAddMaterials.bind(this);
    }

    toggleAddMaterials() {
        this.setState({modalAddMaterials: !this.state.modalAddMaterials});
    }

    render() {
        return (
            <div className="animated import-materials">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Phiếu nhập phụ tùng
                        <Button onClick={this.toggleAddMaterials} color="link" size="sm">Thêm phụ tùng</Button>
                        <Modal isOpen={this.state.modalAddMaterials} toggle={this.toggleAddCustomer}
                               className={'modal-info ' + this.props.className}>
                            <ModalHeader toggle={this.toggleAddMaterials}>Thêm phụ tùng</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="name">Tên phụ tùng</Label>
                                    <Input type="text" id="name" placeholder="Enter material's name" required/>
                                    <FormText className="help-block">Please enter material's name</FormText>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleAddMaterials}>Thêm</Button>{' '}
                                <Button color="secondary" onClick={this.toggleAddMaterials}>Thoát</Button>
                            </ModalFooter>
                        </Modal>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label>Ngày lập</Label>
                            <InputGroup>
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                </div>
                                <TextMask
                                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                    Component={InputAdapter}
                                    className="form-control inputDate"
                                />
                            </InputGroup>
                        </FormGroup>
                        <BootstrapTable cellEdit={cellEditProp} version="4" hover pagination search insertRow
                                        options={this.options}>
                            <TableHeaderColumn isKey dataField="materials"
                                               editable={{type: 'select', options: {values: materials}}}>Phụ
                                tùng</TableHeaderColumn>
                            <TableHeaderColumn dataField="count">Số lượng</TableHeaderColumn>
                            <TableHeaderColumn dataField="price">Đơn giá</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                    <CardFooter>
                        <Button className="float-right" color="success">Lưu</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default ImportMaterial;
