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
import {getRole} from '../../../api/AdminManagement/RoleManagement/roleManagement'
import {
    addUser,
    deleteUser,
    getInfoUser,
    getUsers,
    getUsersRole,
    updateUser
} from '../../../api/AdminManagement/UserManagement/userManagement'


class UserManagement extends Component {
    constructor(props) {
        super(props);

        this.state={
            userID:'',
            listRole:null,
            listUser:null,
            user:null,
            displayname:'',
            role:'',
            userName:'',
            password:'',

            resultAdd: null,
            modalAddUser: false,
            modalUser: false,
            nestedModalAdd: false,
            closeAllAdd: false,

            modalUpdate: false,
            nestedModalUpdate: false,
            closeAllUpdate: false,
            resultUpdate: null,

            modalDelete: false,
            nestedModalDelete: false,
            closeAllDelete: false,
            resultDelete: null,

            curPaItem: 1,
            maxRows: 10,
            maxPaItems: 3,
            definePa: [],
            filterPa: []
        };
        this.toggleAddUser = this.toggleAddUser.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.toggleNestedAdd = this.toggleNestedAdd.bind(this);
        this.toggleAllAdd = this.toggleAllAdd.bind(this);

        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleNestedUpdate = this.toggleNestedUpdate.bind(this);
        this.toggleAllUpdate = this.toggleAllUpdate.bind(this);

        this.toggleDelete = this.toggleDelete.bind(this);
        this.toggleNestedDelete = this.toggleNestedDelete.bind(this);
        this.toggleAllDelete = this.toggleAllDelete.bind(this);

        this.filterPa = this.filterPa.bind(this);
        this.togglePa = this.togglePa.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePre = this.togglePre.bind(this);
    }

    componentDidMount() {
        this.loadRole();
        this.loadUser();
    }

    loadRole() {
        getRole().then(res => {
            this.setState({
                listRole: res.data
            });
        })
    }

    loadUser() {
        getUsers().then(res => {
            this.setState({
                listUser: res.data
            }, () => {
                const table = document.getElementById('table-users');
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
        const table = document.getElementById("table-users");
        const tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            display = false;
            for (let j = 1; j < td.length; j++) {
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
        const table = document.getElementById('table-users');
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
        if (this.state.curPaItem * this.state.maxRows < this.state.listUser.length) {
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

    handleAddUser() {
        const params = {
            displayname: this.state.displayname,
            role: this.state.role,
            userName: this.state.userName,
            password: this.state.password
        }
        if (this.state.displayname && this.state.role
            && this.state.userName && this.state.password) {
            addUser(params).then(res => {
                this.setState({
                    resultAdd: res.data
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

    toggleAddUser() {
        this.setState({modalAddUser: !this.state.modalAddUser});
    }

    toggleUser(user) {
        this.setState({
            user: user,
            modalUser: !this.state.modalUser
        });
    }


    toggleDelete() {
        this.setState(prevState => ({
            modalDelete: !prevState.modalDelete
        }));
    }

    toggleDeleteUser(id) {
        this.setState({
            modalDelete: !this.state.modalDelete,
            userID: id
        });
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

    handleDeleteUser() {
        deleteUser(this.state.userID).then(res => {
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

    updateUser(id) {
        getInfoUser(id).then(res => {
            this.setState({
                userID: res.data.userID,
                userName: res.data.userName,
                displayname: res.data.displayname,
                role: res.data.role,

            }, () => this.toggleUpdateUser())
        })

    }

    toggleUpdateUser() {
        this.setState({
            modalUpdate: !this.state.modalUpdate,
        });
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

    handleUpdateUser() {
        const params = {
            displayname: this.state.displayname,
            role: this.state.role,
        }
        if (this.state.displayname && this.state.role) {
            updateUser(this.state.userID, params).then(res => {
                this.setState({
                    resultUpdate: res.data
                }, () => this.toggleNestedUpdate())
            })
        } else {
            alert("Vui lòng điền đầy đủ thông tin.")
        }
    }


    render() {
        const {listRole, listUser, user, resultAdd, resultDelete, resultUpdate} = this.state;
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
            <div className="animated user-management">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Quản lý tài khoản
                        <Button onClick={this.toggleAddUser} color="link" size="sm">Thêm tài khoản</Button>
                    </CardHeader>
                    <CardBody>
                        <InputGroup className="search">
                            <Input type="text" id="search" onKeyUp={this.filterTable} placeholder="Search..."
                                   title="Enter a search info"/>
                            <div className="input-group-append">
                                <i className="fa fa-search form-control" aria-hidden="true"></i>
                            </div>
                        </InputGroup>
                        <Table id="table-users" responsive>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã nhân viên</th>
                                <th>Tên đăng nhập</th>
                                <th>Tên hiển thị</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                listUser ? listUser.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.userID}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.displayname}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <Button color="primary" onClick={() => {
                                                this.updateUser(item.userID)
                                            }}>Update</Button> {' '}
                                            <Button color="danger"
                                                    onClick={() => this.toggleDeleteUser(item.userID)}>Delete</Button>
                                        </td>
                                    </tr>
                                ) : null
                            }
                            </tbody>
                        </Table>
                        {
                            this.state.listUser ?
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

                <Modal isOpen={this.state.modalAddUser} toggle={this.toggleAddUser}
                       className={'modal-info ' + this.props.className}>
                    <ModalHeader toggle={this.toggleAddUser}>Thêm tài khoản</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Tên người dùng</Label>
                            <Input type="text" id="name" value={this.state.displayname}
                                   onChange={e => this.setState({displayname: e.target.value})}
                                   placeholder="Enter your name" required/>
                            <FormText className="help-block">Please enter your name</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="select-role">Role</Label>
                            <Input type="select" id="select-role" value={this.state.role}
                                   onChange={e => this.setState({role: e.target.value})}>
                                <option value="">Select Role</option>
                                {
                                    listRole ? listRole.map((item, index) =>
                                        <option value={item.role} key={index}>{item.role}</option>
                                    ) : null
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Tên đăng nhập (UserName)</Label>
                            <Input type="text" id="username" value={this.state.userName}
                                   onChange={(e) => this.setState({userName: e.target.value})}
                                   placeholder="Enter your username" required/>
                            <FormText className="help-block">Please enter your username</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Mật khẩu (Password)</Label>
                            <Input type="password" id="password" name="password"
                                   value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   placeholder="Enter password.."/>
                            <FormText className="help-block">Please enter password</FormText>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleAddUser()}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAddUser}>Thoát</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.nestedModalAdd}
                       toggle={() => this.toggleNestedAdd()}

                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAdd()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultAdd ?
                            resultAdd.returnMessage : null
                        }
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}
                       className={'modal-info ' + this.props.className}>
                    <ModalHeader toggle={this.toggleDelete}>Xóa nhân viên</ModalHeader>
                    <ModalBody>
                        Bạn có muốn xóa nhân viên này ?

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={() => this.handleDeleteUser()}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.nestedModalDelete}
                       toggle={() => this.toggleNestedDelete()}
                       onClosed={this.state.closeAllDelete ? () => this.toggleDelete()
                           : undefined}
                       className={'modal-info ' + this.props.className} centered>
                    <ModalHeader toggle={() => this.toggleAllAdd()}>Thông
                        báo</ModalHeader>
                    <ModalBody>
                        {resultDelete ?
                            resultDelete.returnMessage : null
                        }
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate}
                       className='modal-info'>
                    <ModalHeader toggle={this.toggleUpdate}>Settings</ModalHeader>
                    {
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="userID">ID</Label>
                                <Input type="text" id="user-id" placeholder={this.state.userID} disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input type="text" id="username" placeholder={this.state.userName} disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="display-name">Tên hiển thị</Label>
                                <Input type="text" id="display-name"
                                       value={this.state.displayname}
                                       onChange={(e) => this.setState({displayname: e.target.value})}
                                       placeholder={this.state.displayname} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="select-role">Role</Label>
                                <Input type="select" id="select-role" value={this.state.role}
                                       onChange={e => this.setState({role: e.target.value})}>
                                    <option value="">Select Role</option>
                                    {
                                        listRole ? listRole.map((item, index) =>
                                            <option value={item.role} key={index}>{item.role}</option>
                                        ) : null
                                    }
                                </Input>
                            </FormGroup>
                        </ModalBody>
                    }
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleUpdateUser()}>Cập nhật</Button>{' '}
                        <Button color="secondary" onClick={this.toggleUpdate}>Thoát</Button>
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

            </div>
        );
    }
}

export default UserManagement;