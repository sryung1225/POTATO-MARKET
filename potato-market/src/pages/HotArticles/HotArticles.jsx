import { useEffect, useState } from 'react';

import {onSnapshot} from "firebase/firestore"
import styled from 'styled-components';

import Filter from "./Filter";

import LoadingSpinner from '../../components/LoadingSpinner';

import Product from "@/components/product";

import firebase  from '@/firebase';
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';

const db = firebase.firestore();
const q = db.collection("UserWrite");

let newArr = [];

// console.log(serverdata)
function HotArticles(){
  const [render,Setrender] = useState(0);
  useEffect(()=>{
    newArr = [];
  //   db.collection('UserWrite').get().then((item)=>{
  //     item.forEach((item)=>{ 
  //     serverdata[i] = item.data();
  //     i++;
  //     Setrender(1);      
  //     serverdata.sort((b, a) => a.date - b.date)
  //     // console.log(serverdata)
  //     // console.log(orderedDate)
  // }
  // )})
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.map((doc)=>{
      const newObj = {
        id : doc.id,
        ...doc.data()
      }
      newArr.push(newObj);
      newArr.sort((b, a) => a.date - b.date);
      Setrender(1);
      // console.log(newArr);
    })
  })
},[])
  
  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render?newArr.map(({content,title,price,side,imgsrc,id,check,heart},index)=>(
          <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} side={side} title={title} />
        )):<LoadingSpinner className="loading"/>}
      </ProductList>
    </main>
  )
}

const ProductList = styled.section`
  margin: 35px auto;
  display: grid;
  gap: 55px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 309px;
  & .loading{
    left:43%;
    position: absolute;
  }
  @media (max-width: 767px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width:768px) and (max-width: 1023px){
    grid-template-columns: repeat(3, 1fr);
  }
`

export default HotArticles;