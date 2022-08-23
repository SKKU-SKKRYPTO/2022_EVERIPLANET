
import React, { useState } from 'react';
import { db } from "../Firebase"

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