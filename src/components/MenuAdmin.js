import React, {Component} from 'react';
import PropTypes from 'prop-types'
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import firebase from "firebase/app";

class MenuAdmin extends Component {
    static propTypes = {
        burgers: PropTypes.object,
        updateBurger: PropTypes.func,
        deleteBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
        handleLogout: PropTypes.func
    }

    state = {
        photo: '',
        user: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user})
            }
        })
    }

    authHandler = async (authData) => {
        const {email, photoUrl} = authData.user
        this.setState({user:email, photo:photoUrl})
    }

    render() {
        const {user, photo} = this.state
        const avatar = photo ? photo : '/images/avatar.png'

        return (
            <div className="menu-admin">
                { user ?
                <div className="login-header">
                    <div className="avatar">
                        <img src={avatar} alt={user}/>
                    </div>
                    <p>{user}</p>
                    <button className="buttonLogout" onClick={this.props.handleLogout}>
                        Logout
                    </button>
                </div> : null}

                <h2>Menu Control</h2>
                {Object.keys(this.props.burgers).map(key => {
                    return <EditBurgerForm
                        key={key}
                        index={key}
                        burger={this.props.burgers[key]}
                        updateBurger={this.props.updateBurger}
                        deleteBurger={this.props.deleteBurger}
                    />
                })}
                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Load Burgers</button>
            </div>
        )
    }
}

export default MenuAdmin