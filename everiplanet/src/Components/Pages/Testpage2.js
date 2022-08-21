// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD527UBKQkPkeLdhKnLU6aLJiLZDRnoO04",
  authDomain: "everipedia-back.firebaseapp.com",
  projectId: "everipedia-back",
  storageBucket: "everipedia-back.appspot.com",
  messagingSenderId: "86000100182",
  appId: "1:86000100182:web:14c04c885cdae77c7decf7",
  measurementId: "G-JBPS022EVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig); //firebase 초기화

const db = firebase.firestore(); //store 사용


enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

function Testpage2() {
  const [id, setId] = useState();
  const [age, setAge] = useState();
  const [names, setNames] = useState();
  const [data, setData] = useState();

  window.addEventListener('load', () => {
    Fetchdata();
  });

  const handleClick = () => {
    db.collection('users')
      .doc(id)
      .get()
      .then(doc => {
        if (!doc.data()) {
          db.collection('users')
            .doc(id)
            .set({
              age: parseInt(age),
              cons_amount: 1,
              coupons_amount: 0
            });
          db.collection(`/users/${id}/cons`).add({
            create_date: new Date(),
            is_used: false,
            is_expired: false
          });
          alert(`${id}님 환영합니다.`);
        } else { //등록된 유저일 경우
          db.doc(`/users/${id}`)
            .get()
            .then(doc => {
              const currentConsAmount = doc.data().cons_amount;

              db.doc(`/users/${id}`).update({
                cons_amount: currentConsAmount + 1
              });
            });
          alert(`현재 con 갯수 : ${doc.data().cons_amount}`);
        }
      })
    };


  const handleChange = e => {
    setId(e.target.value);
  };
  const handleAgeChange = e=> {
    setAge(e.target.value);
  }
  const handleNameChange = e=> {
    setNames(e.target.value);
  }

  const Fetchdata = ()=>{
    // db.collection("users").get().then((querySnapshot) => {
    //     var datas;
    //     querySnapshot.forEach(element => {
    //         var data = element.data();
    //         console.log(data);
    //         //datas.push(data);
           
    //     });
    //     console.log(datas);
    //     setData(datas);
    // })
}

  function checkList() {
    console.log(db.collection('users').get());
    alert(db);
  }


  return (
    <div>
      ID<input value={id} onChange={handleChange}></input><br></br>
      Name<input value={names} onChange={handleNameChange}></input><br></br>
      age<input value={age} onChange={handleAgeChange}></input><br></br>
      <button onClick={handleClick}>입력</button>
      {/* <button onClick={Fetchdata}>리스트 확인</button>
      {
            data.map((data) => (
            <Frame course={data.CourseEnrolled} 
                   name={data.Nane} 
                   age={data.Age}/>
            ))
        } */}
    </div>
  );
}

const Frame = ({course , name , age}) => {
  console.log(course + " " + name + " " + age);
  return (
      <center>
          <div className="div">
                
<p>NAME : {name}</p>
 
                
<p>Age : {age}</p>

                
<p>Course : {course}</p>
 
          </div>
      </center>
  );
}
export default Testpage2;