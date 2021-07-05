import React, {Component} from 'react';
import PropTypes from 'prop-types'

class AddBurgerForm extends Component {

    static propTypes={
        addBurger:PropTypes.func
    }

    nameRef = React.createRef()
    priceRef = React.createRef()
    statusRef = React.createRef()
    descRef = React.createRef()
    imageRef = React.createRef()

    createBurger = (e) => {
        e.preventDefault()
        const burger = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value) || 0,
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }

        this.props.addBurger(burger)

        e.currentTarget.reset()
    }

    render() {
        return (
            <form className="burger-edit" onSubmit={this.createBurger}>
                <input ref={this.nameRef} name='name' type='text' autoComplete='off' placeholder='name' />
                <input ref={this.priceRef} name='price' type='text' autoComplete='off' placeholder='price' />
                <select ref={this.statusRef} name='status' className="status" >
                    <option value="available">Available</option>
                    <option value="unavailable">Remove from menu</option>
                </select>
                <textarea ref={this.descRef} name='desc' placeholder='desc' />
                <input ref={this.imageRef} name='image' type='text' autoComplete='off' placeholder='image' />
                <button type="submit">+ Add to Menu</button>
            </form>
        );
    }
}

export default AddBurgerForm;