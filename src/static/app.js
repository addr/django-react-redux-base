import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { Container, Menu } from 'semantic-ui-react'

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.shape().isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/feedback'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        const protectedClass = classNames({
            active: this.props.pathName === '/protected'
        });
        const loginClass = classNames({
            active: this.props.pathName === '/login'
        });
        return (
            <div>
                <Menu>
                    <Menu.Item
                        name="Home"
                        onClick={this.goToIndex}>
                        Home
                    </Menu.Item>
                    <Link to="/login">
                        <Menu.Item
                            name="Login">
                            Login
                        </Menu.Item>
                    </Link>
                    <Menu.Item
                        name="Logout"
                        onClick={this.logout}>
                        Logout
                    </Menu.Item>
                </Menu>
                <Container text-align='center'>
                    <div>
                        {this.props.children}
                    </div>
                </Container>
            </div>
        )
// return (
//     <div className="app">
//         <nav className="navbar navbar-default">
//             <div className="container-fluid">
//                 <div className="navbar-header">
//                     <button type="button"
//                             className="navbar-toggle collapsed"
//                             data-toggle="collapse"
//                             data-target="#top-navbar"
//                             aria-expanded="false"
//                     >
//                         <span className="sr-only">Toggle navigation</span>
//                         <span className="icon-bar" />
//                         <span className="icon-bar" />
//                         <span className="icon-bar" />
//                     </button>
//                     <a className="navbar-brand" tabIndex="0" onClick={this.goToIndex}>
//                         Django React Redux Demo
//                     </a>
//                 </div>
//                 <div className="collapse navbar-collapse" id="top-navbar">
//                     {this.props.isAuthenticated ?
//                         <ul className="nav navbar-nav navbar-right">
//                             <li className={homeClass}>
//                                 <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
//                                     <i className="fa fa-home" /> Home
//                                 </a>
//                             </li>
//                             <li className={protectedClass}>
//                                 <a className="js-go-to-protected-button"
//                                    tabIndex="0"
//                                    onClick={this.goToProtected}
//                                 >
//                                     <i className="fa fa-lock" /> Protected
//                                 </a>
//                             </li>
//                             <li>
//                                 <a className="js-logout-button" tabIndex="0" onClick={this.logout}>
//                                     Logout
//                                 </a>
//                             </li>
//                         </ul>
//                         :
//                         <ul className="nav navbar-nav navbar-right">
//                             <li className={homeClass}>
//                                 <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
//                                     <i className="fa fa-home" /> Home
//                                 </a>
//                             </li>
//                             <li className={loginClass}>
//                                 <Link className="js-login-button" to="/login">Login</Link>
//                             </li>
//                         </ul>
//                     }
//                 </div>
//             </div>
//         </nav>
//
//         <div>
//             {this.props.children}
//         </div>
//     </div>
// );
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
