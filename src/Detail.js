import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {addItem} from "./Store.js";
import {useDispatch} from "react-redux";



function Detail(props){

  let [count, setCount] = useState(0);
  let {id} = useParams();
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let dispatch = useDispatch();
  useEffect(()=>{
    let a = setTimeout(()=>{setAlert(false)}, 2000)
    return ()=>{
      clearTimeout(a);
    }
  })
  return (
    <div className="container">
      {
        alert === true ?
        <div className="alert alert-warning">
          2초 이내 구매시 할인
        </div>
        : null
      }
      <button onClick={()=>{ setCount(count+1) }}>버튼</button>
      <div className="row">
        <div className="col-md-6">
        {
          id === null ?
          null:
          <img src={'https://codingapple1.github.io/shop/shoes'.concat(parseInt(id)+1).concat('.jpg')} width="80%" />
          }
        }
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[id].content}</p>
        <p>{props.shoes[id].price}원</p>
        <button className="btn btn-danger" onClick={()=>{
          dispatch(addItem({id: 2, name: "Red Knit", count: 1}))
        }}>주문하기</button>
      </div>
    </div>

    <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
        </Nav.Item>
    </Nav>
    <TabContent shoes={props.shoes} tab={tab}/>
  </div>
)
}
function TabContent({tab, shoes}){

  let [fade, setFade] = useState('')

  useEffect(()=>{
    setTimeout(()=>{ setFade('end') }, 300)
  return ()=>{
    setFade('')
  }
}, [tab])

  return (
    (<div className={'start ' + fade}>
      { [<div>{shoes[0].title}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][tab] }
    </div>)
  )
}
export default Detail;
