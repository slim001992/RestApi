import React, { Component } from 'react';
import Card from './components/Card';
import axios from 'axios';
import './App.css';
import AddContact from './components/AddContact';

class App extends Component {
  state = {
    contacts: [],
    show: false,
  };
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  componentDidMount() {
    this.getAllContacts();
  }
  getAllContacts = () =>
    axios.get('/contacts').then((res) => {
      this.setState({
        contacts: res.data,
      });
    });
  handleAdd = (newContact) =>
    axios.post('/add_contact', newContact).then(this.getAllContacts());

  handleDelete = (id) =>
    axios.delete(`/delete_contact/${id}`).then(this.getAllContacts());
  handleEdit = (contact) =>
    axios
      .put(`/edit_contact/${contact.id}`, {
        name: contact.name,
        mail: contact.mail,
        tel: contact.tel,
      })
      .then(this.getAllContacts());
  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h1>
            <span style={{ color: 'white' }}>Contact-List</span>
          </h1>
        </div>
        <AddContact
          show={this.state.show}
          handleShow={this.handleShow}
          handleAdd={this.handleAdd}
        />
        <div className='list'>
          {this.state.contacts.map((el, i) => (
            <Card
              key={i}
              person={el}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;