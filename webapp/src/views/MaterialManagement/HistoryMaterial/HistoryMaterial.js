import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    FormText,
    Input, InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Pagination, PaginationItem, PaginationLink,
    Table
} from 'reactstrap';
import {
    addHistoryMaterial,
    addMaterialName,
    getListMaterial,
    getListMaterialName
} from "../../../api/materialManagement/materialManagement";

class HistoryMaterial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            materialID: '',
            materialName: '',
            newMaterialName: '',
            price: '',
            numInput: '',
            listTable: [],
            list: [],
            listMaterialName: [],
            resultAdd: null,
            modalAdd: false,
            nestedModalAdd: false,
            closeAllAdd: false,

            resultAddName: null,
            modalAddName: false,
            nestedModalAddName: false,
            closeAllAddName: false,

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 5,
            definePa: [],
            filterPa: []
        }

        this.toggleAddMaterials = this.toggleAddMaterials.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleNestedAdd = this.toggleNestedAdd.bind(this);
        this.toggleAllAdd = this.toggleAllAdd.bind(this);

        this.toggleAddName = this.toggleAddName.bind(this);
        this.toggleNestedAddName = this.toggleNestedAddName.bind(this);
        this.toggleAllAddName = this.toggleAllAddName.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {

        this.handleSearch()
        this.handleGetListMaterialName()

    }

    handleSearch() {

        getListMaterial().then(response => {
            this.setState({
                listTable: response.data,
                list: response.data
            }, () => this.handlePagination())

        })
    }

    handleGetListMaterialName() {
        getListMaterialName().then(res => {
            this.setState({
                listMaterialName: res.data
            })
        })
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

    toggleAddMaterials() {
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    handleAddMaterial() {
        const params = {
            materialID: this.state.materialID,
            price: this.state.price,
            numInput: this.state.numInput,
        };
        if (this.state.materialID && this.state.price && this.state.numInput) {
            addHistoryMaterial(params).then(res => {
                this.setState({
                    resultAdd: res.data
                }, () => this.toggleNestedAdd())

            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
    }

    toggleAdd() {
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    toggleAddName() {
        this.setState({
            modalAddName: !this.state.modalAddName
        });
    }

    toggleNestedAddName() {
        this.setState({
            nestedModalAddName: !this.state.nestedModalAddName,
            closeAllAddName: false
        });
    }

    toggleAllAddName() {
        this.setState({
            nestedModalAddName: !this.state.nestedModalAddName,
            closeAllAddName: true
        });
        window.location.reload();
    }

    toggleAddNameMaterial() {
        this.setState({
            closeAllAdd: false,
            modalAddName: !this.state.modalAddName

        });
    }

    handleAddMaterialName() {
        if (this.state.newMaterialName) {
            addMaterialName(this.state.newMaterialName).then(res => {
                this.setState({
                    resultAddName: res.data
                }, () => this.toggleNestedAddName())

            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
    }

    handlePagination() {
        const table = document.getElementById('table-import-materials');
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
        const table = document.getElementById("table-import-materials");
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
        const table = document.getElementById('table-import-materials');
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
        const {list, resultAdd, resultAddName, listMaterialName} = this.state;
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
            <div className="animated import-materials">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Phiếu nhập phụ tùng
                        <Button onClick={this.toggleAddMaterials} color="link" size="sm">Thêm phụ tùng</Button>
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="search">
                            <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                   title="Enter a search info"/>
                            <div className="input-group-append">
                                <i className="fa fa-search form-control" aria-hidden="true"></i>
                            </div>
                        </InputGroup>
                        <Table id="table-import-materials" responsive striped>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên phụ tùng</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Ngày nhập</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list ? list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.materialName}</td>
                                            <td>{item.numInput}</td>
                                            <td>{item.price}</td>
                                            <td>{item.reqDate}</td>
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
                                : null
                        }
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}
                       className={'modal-info modal-lg modal-lg-custom'
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleAdd}>Thêm phụ tùng</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Tên phụ tùng</Label>
                            <Button color="success" style={{"padding": "1px 5px 1px 5px", "marginLeft": "10px"}}
                                    onClick={() => this.toggleAddNameMaterial()}>+</Button>
                            <select
                                className="form-control"
                                id={"listMaterial"}
                                onChange={(e) => this.setState({materialID: e.target.value})}>
                                <option value={null}>Chọn tên phụ tùng</option>
                                {listMaterialName.map(item => {
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
                            <Label htmlFor="reqNum">Số lượng</Label>
                            <Input type="text" id="reqNum" value={this.state.numInput}
                                   onChange={(e) => this.setState({numInput: e.target.value})}
                                   placeholder="Enter your reqNum" required/>
                            <FormText className="help-block">Please enter your reqNum</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="reqNum">Đơn giá</Label>
                            <Input type="text" id="reqNum" value={this.state.price}
                                   onChange={(e) => this.setState({price: e.target.value})}
                                   placeholder="Enter your price" required/>
                            <FormText className="help-block">Please enter your price</FormText>
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


                <Modal isOpen={this.state.modalAddName} toggle={this.toggleAddName}
                       className={'modal-info modal-lg modal-lg-custom'
                       + this.props.className}>
                    <ModalHeader toggle={this.toggleAddName}>Thêm tên phụ tùng mới</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Tên phụ tùng mới</Label>
                            <Input type="text" id="newMaterialName" value={this.state.newMaterialName}
                                   onChange={(e) => this.setState({newMaterialName: e.target.value})}
                                   placeholder="Enter your name new material" required/>
                            <FormText className="help-block">Please enter your name new material</FormText>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleAddMaterialName()}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAddName}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalAddName}
                       toggle={() => this.toggleNestedAddName()}
                       onClosed={this.state.closeAllAddName ? () => this.toggleAddName()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAddName()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultAddName ?
                            resultAddName.returnMessage : null
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default HistoryMaterial;
