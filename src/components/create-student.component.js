import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreatePatient extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangePatientName = this.onChangePatientName.bind(this);
    this.onChangePatientPhoneNo = this.onChangePatientPhoneNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      name: '',
      phoneNo: '',
      token: '',
      patients: []
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/patients/')
      .then(response => {
        this.setState({ patients: response.data })
        const token = this.generateToken();
        this.setState({ token });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  onChangePatientName(e) {
    this.setState({ name: e.target.value })
  }
  
  onChangePatientPhoneNo(e) {
    this.setState({ phoneNo: e.target.value })
  }
  
  generateToken() {
    const newTokenNumber = this.state.patients.length + 1;
    const newToken = 'T-' + newTokenNumber.toString().padStart(3, '0');
    return newToken;
  }
  
  onSubmit(e) {
    e.preventDefault();
    const patientObject = {
      name: this.state.name,
      phoneNo: this.state.phoneNo,
      token: this.generateToken()
    };
    axios.post('http://localhost:4000/patients/create-patient', patientObject)
      .then(res => {
        console.log(res.data);
        this.setState({
          name: '',
          phoneNo: '',
          patients: [...this.state.patients, res.data]
        });
      });
  }
  
  
  
  
  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangePatientName} />
          </Form.Group>
          <Form.Group controlId="PhoneNo">
            <Form.Label>Phone No</Form.Label>
            <Form.Control type="Number" value={this.state.phoneNo} onChange={this.onChangePatientPhoneNo} />
          </Form.Group>
          <Button variant="danger" size="lg" block type="submit" className="mt-4">
            Create Patient
          </Button>
        </Form>
      </div>
    );
  }
}
