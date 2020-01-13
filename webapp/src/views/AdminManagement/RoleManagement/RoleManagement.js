import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    FormText,
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
import {addRole, deleteRole, getRole} from '../../../api/AdminManagement/RoleManagement/roleManagement'


class RoleManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listRole: null,
            role: '',
            roleSelected: null,
            resultAdd: null,
            resultDelete: null,
            modalAddRole: false,
            modalDeleteRole: false,
            nestedModalAdd: false,
            closeAllAdd: false,
            nestedModalDelete: false,

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 3,
            definePa: [],
            filterPa: []
        };
        this.toggleAddRole = this.toggleAddRole.bind(this);
        this.toggleDeleteRole = this.toggleDeleteRole.bind(this);
        this.loadRoles = this.loadRoles.bind(this);
        this.handleAddRole = this.handleAddRole.bind(this);
        this.toggleNestedAdd = this.toggleNestedAdd.bind(this);
        this.toggleAllAdd = this.toggleAllAdd.bind(this);
        this.toggleNestDelete = this.toggleNestDelete.bind(this);
        this.handleDeleteRole = this.handleDeleteRole.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {
        this.loadRoles();
    }

    loadRoles() {
        getRole().then(res => {
            this.setState({
                    listRole: res.data
                }, () => {
                    const table = document.getElementById('table-roles');
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
            );
        })
    }

    toggleAddRole() {
        this.setState({modalAddRole: !this.state.modalAddRole});
    }

    filterTable() {
        let td, txtValue, display;
        const filter = document.getElementById("search").value.toUpperCase();
        const table = document.getElementById("table-roles");
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
        const table = document.getElementById('table-roles');
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
        if (this.state.curPaItem * this.state.maxRows < this.state.listRole.length) {
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

    handleAddRole() {
        const params = this.state.role;
        if (this.state.role) {
            addRole(params).then(res => {
                this.setState({
                    resultAdd: res
                }, () => this.toggleNestedAdd())

            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
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

    toggleDeleteRole(role) {
        this.setState({
                modalDeleteRole: !this.state.modalDeleteRole,
                roleSelected: role
            }
        );
    }

    handleDeleteRole() {
        const params = this.state.roleSelected;
        deleteRole(params).then(res => {
            this.setState({
                resultDelete: res
            }, () => this.toggleNestDelete())
        })
    }

    toggleNestDelete() {
        this.setState({
            nestedModalDelete: !this.state.nestedModalDelete,
            closeAllAdd: false
        });
    }

    render() {
        const {listRole, resultAdd, resultDelete} = this.state;
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
            <div className="animated role-management">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Quản lý role
                        <Button onClick={this.toggleAddRole} color="link" size="sm">Thêm role</Button>
                        <Modal isOpen={this.state.modalAddRole} toggle={this.toggleAddRole}
                               className={'modal-info ' + this.props.className}>
                            <ModalHeader toggle={this.toggleAddRole}>Thêm role</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="role">Tên role</Label>
                                    <Input type="text" id="role" value={this.state.role}
                                           onChange={(e) => this.setState({role: e.target.value})}
                                           placeholder="Enter role" required/>
                                    <FormText className="help-block">Please enter role</FormText>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleAddRole}>Thêm</Button>{' '}
                                <Button color="secondary" onClick={this.toggleAddRole}>Thoát</Button>
                            </ModalFooter>
                        </Modal>
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="search">
                            <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                   title="Enter a search info"/>
                            <div className="input-group-append">
                                <i className="fa fa-search form-control" aria-hidden="true"></i>
                            </div>
                        </InputGroup>
                        <Table id="table-roles" responsive>
                            <thead>
                            <tr>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                listRole ? listRole.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.role}</td>
                                            <td><Button color="primary" onClick={() => {
                                                this.toggleDeleteRole(item.role);
                                            }}>Xóa</Button></td>
                                        </tr>
                                    )
                                }) : null
                            }
                            </tbody>
                        </Table>
                        {
                            this.state.listRole ?
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
                        <Modal isOpen={this.state.modalDeleteRole} toggle={this.toggleDeleteRole}
                               className='modal-primary'>
                            <ModalHeader toggle={this.toggleDeleteRole}>Xóa Role</ModalHeader>
                            <ModalBody>
                                Bạn có chắc muốn xóa role {this.state.roleSelected} ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleDeleteRole}>OK</Button>{' '}
                                <Button color="secondary" onClick={this.toggleDeleteRole}>Thoát</Button>{' '}
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.nestedModalAdd}
                       toggle={() => this.toggleNestedAdd()}

                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAdd()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultAdd ?
                            <p>Thêm thành công !</p> : <p>Thêm thất bại !</p>
                        }
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.nestedModalDelete}
                       toggle={() => this.toggleNestDelete()}

                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAdd()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultDelete ?
                            "Xóa thành công !" : "Xóa thất bại !"
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default RoleManagement;