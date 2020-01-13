import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    Progress, Button,
} from 'reactstrap';


const propTypes = {
    accnt: PropTypes.bool,
};
const defaultProps = {
    accnt: false,
};

class HeaderDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);


        this.state = {
            dropdownOpen: false,
        };
        this.onLogout= this.onLogout.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


    onLogout() {
        window.localStorage.clear();
    }



    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    <img src={'img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </DropdownToggle>
                <DropdownMenu right>

                    <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                    <DropdownItem><i className="fa fa-user"></i> Change Password</DropdownItem>

                    <DropdownItem><a href="/logout" onClick={this.onLogout}><i className="fa fa-lock"></i> Logout</a></DropdownItem>

                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        const {accnt, ...attributes} = this.props;
        return (
                accnt ? this.dropAccnt() : null
        );
    }
}

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default HeaderDropdown;
