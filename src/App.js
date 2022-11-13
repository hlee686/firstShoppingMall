import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import {useState} from 'react';
import data from "./data.js";
import {Routes, Route, Link, Outlet, useNavigate} from 'react-router-dom';
import  Detail from './Detail.js';
import axios from 'axios';
import Cart from "./Cart.js";

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock] = ([10,11,12]);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
      <Route path="/" element={
  <>
   <div className="main-bg"></div>
   <div className="container">
     <div className="row">
       { shoes.map((a, i)=>{
         return <Card shoes={shoes[i]} i={i} ></Card>
        })}
      </div>
    </div>
    <button onClick={()=>{
      axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
        let copy = [...shoes, ...결과.data];
        setShoes(copy);
      })
    }}>더보기</button>
  </>
} />
      <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
      <Route path="/cart" element={<Cart />}/>
      </Routes>
</div>
  );
}
function About(){
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}
function iDetail(props){
  return (
      <Detail shoes={props.shoes} i={props.i} />
  )
}

function Card(props){
  let navigate = useNavigate();
  return (
    <div className="col-md-4" onClick={()=> {navigate('/detail/' + props.i)}} >
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}
export default App;
