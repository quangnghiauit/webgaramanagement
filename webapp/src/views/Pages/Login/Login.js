import React, {Component} from 'react';
import {Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, Row} from 'reactstrap';
import {getRole} from "../../../api/Role/role";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
        this.redirectCheckLogin = this.redirectCheckLogin.bind(this);
    }

    handleUserChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    handleLogin() {
        // just in case we need it


        const {username, password} = this.state;

        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        fetch("http://localhost:9811/login", {
            method: "POST",
            body: data,
            credentials: "include",
        })
            .then(response => response.json()
            )
            .then((body) => {
                this.setState({
                    checklogin: body
                }, () => {
                    this.redirectCheckLogin()
                })
            })

    }

    redirectLogin() {
        if (this.state.auth !== '[ROLE_ANONYMOUS]') {
            this.props.history.push('/');

        }
    }

    redirectCheckLogin() {
        if (this.state.checklogin === true) {
            this.props.history.push('/');
        }

    }


    componentDidMount() {
        getRole()
            .then(response => {
                this.setState({
                        auth: response.data

                    }, () => this.redirectLogin()
                )
            })
            .catch(error => {

            });

    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>

                    <Row className="justify-content-center">

                        <Col md="5">
                            <CardGroup>

                                <Card className="p-4">
                                    <CardBody>

                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                </span>
                                            </div>

                                            <Input
                                                placeholder="Username"
                                                type="text"
                                                id="username"
                                                className="validate"
                                                value={this.state.username}
                                                name="username"
                                                onChange={this.handleUserChange}
                                                required/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-lock"></i>
                                                </span>
                                            </div>
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                                className="validate"
                                                value={this.state.password}
                                                name="password"
                                                onChange={this.handleUserChange}
                                                required/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs='4'/>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4" type="submit"
                                                        value="Submit" name="action"
                                                        onClick={this.handleLogin}>Login</Button>

                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>

                            </CardGroup>
                        </Col>

                    </Row>


                </Container>
            </div>
        );
    }


}

export default Login;
