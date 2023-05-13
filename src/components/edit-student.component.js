import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditPatient extends Component {
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangePatientName = this.onChangePatientName.bind(this);
    this.onChangePatientPhoneNo = this.onChangePatientPhoneNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      name: '',
      phoneNo: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/patients/edit-patient/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          phoneNo: res.data.phoneNo
        });
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

  onSubmit(e) {
    e.preventDefault()
    const patientObject = {
      name: this.state.name,
      phoneNo: this.state.phoneNo
    };
    axios.put('http://localhost:4000/patients/update-patient/' + this.props.match.params.id, patientObject)
      .then((res) => {
        console.log(res.data)
        console.log('Patient successfully updated')
      })
      .catch((error) => {
        console.log(error)
      })
    // Redirect to Patient List 
    this.props.history.push('/patient-list')
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangePatientName} />
          </Form.Group>
          <Form.Group controlId="phoneNo">
            <Form.Label>Phone No</Form.Label>
            <Form.Control type="text" value={this.state.phoneNo} onChange={this.onChangePatientPhoneNo} />
          </Form.Group>
          <Button variant="danger" size="lg" block type="submit">
            Update Patient
          </Button>
        </Form>
      </div>
    );
  }
}
