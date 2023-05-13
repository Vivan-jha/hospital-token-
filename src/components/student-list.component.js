import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PatientTableRow from './studentTableRow';

class PatientList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      patients: [],
      currentToken: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/patients/')
      .then(res => {
        this.setState({
          patients: res.data
        });
        if (res.data.length > 0) {
          this.setState({
            currentToken: res.data[res.data.length - 1].token
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Set up a WebSocket connection
    this.socket = new WebSocket('ws://localhost:4000');

    // When the connection is established, send a message to the server to join the "tokens" room
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        type: 'joinRoom',
        room: 'tokens'
      }));
    };

    // When a message is received from the server, update the current token if necessary
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateToken' && data.token !== this.state.currentToken) {
        this.setState({ currentToken: data.token });
      }
    };
  }

  componentWillUnmount() {
    // Close the WebSocket connection when the component is unmounted
    this.socket.close();
  }

  handleDelete(id) {
    const patients = this.state.patients.filter(patient => patient._id !== id);
    this.setState({ patients });
  }

  handleTokenChange() {
    const { patients, currentToken } = this.state;
    // Find the index of the current token in the patients array
    const currentIndex = patients.findIndex(patient => patient.token === currentToken);
    // Calculate the index of the next token in the patients array
    const nextIndex = (currentIndex + 1) % patients.length;
    // Set the next token as the current token
    const nextToken = patients[nextIndex].token;
    this.setState({ currentToken: nextToken });

    // Send a message to the server to update the current token in the "tokens" room
    this.socket.send(JSON.stringify({
      type: 'updateToken',
      room: 'tokens',
      token: nextToken
    }));
  }

  renderPatientTableRows() {
    return this.state.patients.map((patient, index) => {
      const active = patient.token === this.state.currentToken;
      return (
        <PatientTableRow
          key={index}
          obj={patient}
          active={active}
          onDelete={this.handleDelete}
        />
      );
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <div className="active-token">Currently Active Token: {this.state.currentToken}</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone No</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPatientTableRows()}
          </tbody>
        </Table>
        <div className="button-wrapper">
          <button onClick={this.handleTokenChange}>Next Token</button>
        </div>
      </div>
    );
  }
}

export default PatientList
