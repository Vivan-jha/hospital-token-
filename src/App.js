import React, { useState,useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Createpatient from './components/create-student.component';
import Editpatient from './components/edit-student.component';
import PatientList from './components/student-list.component';
import AnotherComponent from './components/anothercomponent';


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();

      }
    };
  }, []);

  return (
   <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/'} className="nav-link">
                  Hospital Token App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/create-patient'} className="nav-link">
                    Create Patient
                  </Link>
                </Nav>

                <Nav>
                  <Link to={'/patient-list'} className="nav-link">
                    Patient List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <Switch>
                {/* <Route exact path="/">
                  <Row>
                    <Col md={12}>
                      <h3>patient List</h3>
                      <patientList />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <h3>Create patient</h3>
                      <Createpatient />
                    </Col>
                  </Row>
                </Route> */}
                <Route
                  exact
                  path="/create-patient"
                  component={(props) => <Createpatient {...props} />}
                />
                  <Route
                  exact
                  path="/Activetoken"
                  component={(props) => <AnotherComponent {...props} />}
                />
                <Route
                  exact
                  path="/edit-patient/:id"
                  component={(props) => <Editpatient {...props} />}
                />
                <Route
                  exact
                  path="/patient-list"
                  component={(props) => (
                    <PatientList {...props}  />

                
                  )}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
