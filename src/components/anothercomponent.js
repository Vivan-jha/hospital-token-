import React, { useState, useEffect } from "react";
import axios from 'axios';

function AnotherComponent() {
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    // Set up a WebSocket connection
    const socket = new WebSocket('ws://localhost:4000');

    // When the connection is established, send a message to the server to join the "tokens" room
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'joinRoom',
        room: 'tokens'
      }));
    };

    // When a message is received from the server, update the current token if necessary
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateToken' && data.token !== currentToken) {
        setCurrentToken(data.token);
      }
    };

    // Get the initial list of patients and set the currentToken to the last token in the list
    axios.get('http://localhost:4000/patients/')
      .then(res => {
        const patients = res.data;
        if (patients.length > 0) {
          const lastToken = patients[patients.length - 1].token;
          setCurrentToken(lastToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Clean up function
    return () => {
      socket.close();
    };
  }, []);

  return (
    
      
 
   
    <div >
        
           <p style={{fontSize: '2rem', color: 'black',position:'relative'}}> Current Token: </p>
    <p style={{fontSize: '15rem', color: 'green'}}>{currentToken}</p>
  </div>
  
  );
}

export default AnotherComponent;
