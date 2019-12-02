import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import {accountSelector} from '../store/selectors/web3';
import {tokenNameSelector} from '../store/selectors/contracts';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/#">Ethereum Dex - (Kovan Network)</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle size="sm" id="dropdown-basic">
                            {this.props.tokenName}/ETH
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link small"
                            href={'https://etherscan.io/address/' + this.props.account}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.props.account}
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }

}

function mapStateToProps(state){
    return {
        account: accountSelector(state),
        tokenName: tokenNameSelector(state)
    }
}

export default connect(mapStateToProps)(Navbar);