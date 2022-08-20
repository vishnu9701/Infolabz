import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Container,Col,Card,Table } from 'react-bootstrap';
import React,{ useState, useEffect } from 'react';

function App() {

  const [mydata,setData] = useState([]);
  const apiGet = () => {
    fetch('https://inshorts.deta.dev/news?category=sports')
    .then((response)=>response.json())
    .then((json)=>{
      console.log(json);
      setData(json.data);
    });
  };

  useEffect(()=>{
    apiGet();
    const interval = setInterval(()=>{
      apiGet();
    },500000);
    return () => clearInterval(interval);
  },[]);
  
  return (
    <Container fluid>
      <Row xs={1} md={3} className="g-4">
        {
          mydata.map(
            (value)=>{
              return(
                <>
                   <Col className="container-fluid mt-4">
          <Card border="success">
          <Card.Img variant="top" height="350px" width="50%" src={value.imageUrl} />
          <Card.Body>
          <Card.Title>{value.date}</Card.Title>
          <Card.Text>{value.content}</Card.Text>
          </Card.Body>
          </Card>
        </Col>
                </>
              );
            }
          )
        }
       
      </Row>
    </Container>
  );
}

export default App;
