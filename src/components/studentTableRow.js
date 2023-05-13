import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class PatientTableRow extends Component {
  constructor(props) {
    super(props)
    this.deletePatient = this.deletePatient.bind(this)
  }

  deletePatient() {
    axios
      .delete(
        'http://localhost:4000/patients/delete-patient/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Patient successfully deleted!')
        this.props.onDelete(this.props.obj._id); // Call the callback function with the deleted patient's id
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.phoneNo}</td>
        <td>{this.props.obj.token}</td>
        <td>
          <Link className="edit-link" to={'/edit-patient/' + this.props.obj._id}>
            Edit
          </Link>
          <Button onClick={this.deletePatient} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  
}
