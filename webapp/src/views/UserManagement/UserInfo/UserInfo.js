import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalUpdate: false,
            collapseBill: false
        };
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleBill = this.toggleBill.bind(this);
    }

    toggleUpdate() {
        this.setState({modalUpdate: !this.state.modalUpdate});
    }

    toggleBill() {
        this.setState({collapseBill: !this.state.collapseBill});
    }

    render() {
        return (
            <div className="animated fadeIn customer-info">
                <Card>
                    <CardHeader>Thông tin khách hàng</CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="display-name">Tên hiển thị</Label>
                                    <Input type="text" id="display-name" placeholder="display name"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input type="text" id="address" placeholder="Enter your address" disabled/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email" placeholder="Enter Email.." disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input type="text" id="phone" placeholder="Enter your phone" disabled/>
                                </FormGroup>
                            </Col>
                            <Col xs="12" lg="4">
                                <FormGroup>
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                    <Input type="text" id="username" placeholder="username" disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <Input type="password" id="password" placeholder="password"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Button className="float-right" color="success" onClick={this.toggleUpdate}>Cập nhật</Button>
                        <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate}
                               className='modal-info'>
                            <ModalHeader toggle={this.toggleUpdate}>Thông báo</ModalHeader>
                            <ModalBody>Cập nhật thành công !</ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggleUpdate}>Thoát</Button>
                            </ModalFooter>
                        </Modal>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default UserInfo;


// return (
//   <div className="animated fadeIn customer-info">
//     <Row>
//       <Col xs="12" lg="6">
//         <Card>
//           <CardHeader>
//             <i className="fa fa-align-justify"></i> Thông tin khách hàng
//           </CardHeader>
//           <CardBody >
//             <ScrollArea
//             className="customer-info-scroll">
//               <FormGroup>
//                 <Label htmlFor="username">Tên đăng nhập</Label>
//                 <Input type="text" id="username" placeholder="username" disabled/>
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="password">Mật khẩu</Label>
//                 <Input type="password" id="password" placeholder="password"/>
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="display-name">Tên hiển thị</Label>
//                 <Input type="text" id="display-name" placeholder="display name" />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="address">Địa chỉ</Label>
//                 <Input type="text" id="address" placeholder="Enter your address" disabled/>
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="email">Email</Label>
//                 <Input type="email" id="email" name="email" placeholder="Enter Email.." disabled/>
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="phone">Số điện thoại</Label>
//                 <Input type="text" id="phone" placeholder="Enter your phone" disabled/>
//               </FormGroup>

//             </ScrollArea>
//           </CardBody>
//           <CardFooter>
//             <Button className="float-right" color="success"  onClick={this.toggleUpdate}>Cập nhật</Button>
//             <Modal isOpen={this.state.modalUpdate} toggle={this.toggleUpdate}
//             className='modal-info'>
//               <ModalHeader toggle={this.toggleUpdate}>Thông báo</ModalHeader>
//               <ModalBody>Cập nhật thành công !</ModalBody>
//               <ModalFooter>
//                 <Button color="secondary" onClick={this.toggleUpdate}>Thoát</Button>
//               </ModalFooter>
//             </Modal>
//           </CardFooter>
//         </Card>
//       </Col>

//       <Col xs="12" lg="6">
//         <Card>
//           <CardHeader>
//             <i className="fa fa-align-justify"></i> Danh sách xe
//           </CardHeader>
//           <CardBody>
//           <ScrollArea
//                  className="customer-info-listcar">
//             <Table>
//               <thead>
//                 <tr>
//                   <th>Biển số xe</th>
//                   <th>Trạng thái</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>HE54631</td>
//                   <td><Badge color="success" pill>success</Badge></td>
//                 </tr>
//               </tbody>
//             </Table>
//             </ScrollArea>
//           </CardBody>

//         </Card>
//       </Col>
//     </Row>
//   </div>

// )