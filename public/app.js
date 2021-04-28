let db ;//= firebase.firestore();
document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();
  
     db = firebase.firestore();
     db.collection("subjects").orderBy("index").onSnapshot((snapshot) => {
            getInfo(snapshot.docs)
          
     }) ;
     
     const submitBtn = document.querySelector('#submit');
     let Name = document.querySelector('#namedb');
     let Price = document.querySelector('#pricedb');
     let Index = document.querySelector('#indexdb');

     
     
   
    submitBtn.addEventListener('click', function(){
        let nameInput =Name.value;
        let prieInput =Number(Price.value);
        let indexInput =Number(Index.value);
        db.collection("subjects").doc().set({
            name: nameInput,
            price: prieInput,
            index: indexInput,
            teachers:[]
        }).then(function(){
            console.log("data saved")
    
        }).catch(function(error){
            console.log(error);
        });
      Name.value="";
      Price.value="";
      Index.value="";

    });
  
    
    });
    function getInfo(data){
        var html="";
        document.getElementById("tabledata").innerHTML="";
        data.forEach(doc =>{
            var info =doc.data();
            
        html += ` <tr>
                 <td onclick="callOne('${doc.id}'),toptable('${doc.id}'),teachCall('${doc.id}')" style="cursor: pointer">`+ info.name +`</td>
                 <td>`+ info.price +`</td>
                 <td>`+ info.index +`</td>
                 <td ><button style="background-color: red;color:white;" class="form-control w-50" onClick="deleteDoc('${doc.id}')">Delete</button></td>
                </tr>`;
            });
            document.getElementById("tabledata").innerHTML=html;
    }
    
 function viewTable() {
          var mydiv =document.getElementById("viewtable");
          if(mydiv.style.display=="none"){
              mydiv.style.display="block";
          }
          else{
            mydiv.style.display="none";
          }
 };
 function addForm(){
    var addtable =document.getElementById("addtable");
    if(addtable.style.display=="none"){
        addtable.style.display="block";
        addtable.value="Back";
    }
    else{
      addtable.style.display="none";
    }
 };
 function cancel(){
    
    var addtable =document.getElementById("addtable");
    
    addtable.style.display="none";
    

 };
 function cancelEdit(){
    var callform = document.getElementById("callform")
    var taechdiv = document.getElementById("teachdiv")
    var mydiv =document.getElementById("viewtable");
    var topdiv =document.getElementById("topdiv");
    callform.style.display="none";
    taechdiv.style.display="none";
    mydiv.style.display="block";
    topdiv.style.display="none";

 };
 function updateData(docId){
     console.log(docId);
 }
 function callOne(docId){
   console.log(docId);
    var mydiv =document.getElementById("viewtable");
    var teachdiv =document.getElementById("teachdiv");
    var topdiv=document.getElementById("topdiv")
    var callform = document.getElementById("callform");
    mydiv.style.display="none"; 
    callform.style.display="block";
    topdiv.style.display="block";
    teachdiv.style.display="block";
    
    var html="";
  
 
    var cd=firebase.firestore().collection("subjects").doc(docId);
     cd.get().then((doc)=>{
         
        html+=` <div  class="form-group w-25">
          <label for="name">Name</label>
          <input  type="text" name="name" id="callname" value=`+doc.data().name+` class="form-control w-50">
        </div>
        <div class="form-group w-25" >
          <label for="name">Price</label>
          <input type="number" name="price" value=`+doc.data().price+` id="callprice" class="form-control w-50">
        </div>
        <div class="form-group w-25"  >
          <label for="name">Index</label>
          <input type="number" name="index" value=`+doc.data().index+` id="callindex" class="form-control w-50">
        </div>
        <button id="cancel"  onclick="cancelEdit()"  class="btn-btn-primary">Back</button>
        <button  id="update"  onclick="updateData('${doc.id}')" class="btn-btn-primary">Update</button>
        
        
        `;

        document.getElementById("callform").innerHTML=html;
    }).catch((error)=>{
        console.log (error);
    });


    
};
// arr.splice(index,1)
// arryunion
function toptable(docId){
   db = firebase.firestore();
 docId=docId;
 
     db.collection("subjects").doc(docId).collection("topics").onSnapshot((data) => {
      let html="";
      
      docID=docId;
       document.getElementById("topdata").innerHTML="";
       data.forEach(doc =>{
           let info =doc.data();
           
       html += ` <tr>
                <td style="cursor: pointer">`+ info.name +`</td>
                <td>`+ info.code +`</td>
                <td ><button class="form-control" style="background-color: red;color:white;" onClick="deleteTop(docID,'${doc.id}')">Delete</button></td>
               </tr>
              `;
           });
           document.getElementById("topdata").innerHTML=html+`<tr>
           <td><input class="form-control"  type="text" placeholder="name of topic here..." id="topinname"></td>
           <td><input class="form-control"  type="text" placeholder="code of topic here.." id="topincode"></td>
           <td><button class="form-control" style="background-color: green;color:white; " onClick="addTop(docID)">Add</button></td>
           </tr>`;
});
};
function teachCall(docId){
  db.collection("subjects").doc(docId)
  .onSnapshot((doc) => {
    let html="";
    docID=docId;
      let info =doc.data();
      let arr=info.teachers
      arr.forEach(data=>{
        html += ` <tr>
        <td style="cursor: pointer">`+data['name'] +`</td>
        <td>`+data['exp'] +`</td>
        <td ><button class="form-control" style="background-color: red;color:white;" onClick="dltTeach('${doc.id}','${arr.indexOf(data)}')">Remove</button></td>
       </tr> `;
       
      });
     document.getElementById("teachdata").innerHTML=html +`<tr>
     <td><input class="form-control"  type="text" placeholder="enter name of teacher..." id="addnames"></td>
     <td><input class="form-control"  type="text" placeholder="enter exp of teacher..." id="addexp"></td>
     <td><button class="form-control" style="background-color: green;color:white; " onClick="addTeach(docID)">Add</button></td>
     </tr>`;
     
    
  });
        
};
  

// function getTop(data,docId){
//   // var html="";
//   // docID=docId;
//   //  document.getElementById("topdata").innerHTML="";
//   //  data.forEach(doc =>{
//   //      var info =doc.data();
       
//   //  html += ` <tr>
//   //           <td style="cursor: pointer">`+ info.name +`</td>
//   //           <td>`+ info.code +`</td>
//   //           <td ><button class="form-control" style="background-color: red;color:white;" onClick="deleteTop(docID,'${doc.id}')">Delete</button></td>
//   //          </tr>
//   //         `;
//   //      });
//   //      document.getElementById("topdata").innerHTML=html+`<tr>
//   //      <td><input class="form-control"  type="text" placeholder="name of topic here..." id="topinname"></td>
//   //      <td><input class="form-control"  type="text" placeholder="code of topic here.." id="topincode"></td>
//   //      <td><button class="form-control" style="background-color: green;color:white; " onClick="addTop(docID)">Add</button></td>
//   //      </tr>`;
// };







function addTop(docId){
  let nameinpt =topinname.value;
  let codeinpt =topincode.value;
 db=firebase.firestore();
  db.collection("subjects").doc(docID).collection("topics").doc().set({
      name: nameinpt,
      code: codeinpt,

  }).then(function(){
      console.log("topic saved")

  }).catch(function(error){
      console.log(error);
  });
  topinname.value="";
topincode.value="";

};
  function updateData(docId){
      var db =firebase.firestore()
    let nameupdate =document.getElementById("callname").value;
    let priceupdate =Number(document.getElementById("callprice").value);
    let indexupdate =Number(document.getElementById("callindex").value);
    db.collection("subjects").doc(docId).update({
        name: nameupdate,
        price: priceupdate,
        index: indexupdate
    }).then(function(){
        console.log("data updated")

    }).catch(function(error){
        console.log(error);
    });

   } 

 function deleteDoc(docId) {
  let confirmstat=confirm("do you really want to delete?")
  
  if(confirmstat){
   console.log(docId);
     var db=firebase.firestore();
    db.collection("subjects").doc(docId).delete().then(function(){
console.log("data deleted") }).catch(function(error){
   console.log(error)
});
  }
};

function deleteTop(docID,docId) {
  let confirmstat=confirm("do you really want to delete?")
  if(confirmstat){
  var db=firebase.firestore();
 db.collection("subjects").doc(docID).collection("topics").doc(docId).delete().then(function(){
console.log("topic deleted") }).catch(function(error){
console.log(error)
});
  }
};
function dltTeach(docId,index){
let db=firebase.firestore();
// const[userDetails, setUserDetails]=useState('')
  db.collection("subjects").doc(docId).get().then(snapshot=>{
   let a=snapshot.data().teachers
  a.splice(index,1)
  db.collection("subjects").doc(docId).update({
    teachers:a
}).then(function(){
    console.log("data updated")

}).catch(function(error){
    console.log(error);
});
  
  });
}
function addTeach(docId){
  let name=document.getElementById("addnames").value;
  let exp=document.getElementById("addexp").value;
let ne={"exp":exp,
         "name":name
}
db.collection("subjects").doc(docId).get().then(snapshot=>{
  let a=snapshot.data().teachers
    a.push(ne)
 db.collection("subjects").doc(docId).update({
   teachers:a
}).then(function(){
   console.log("data updated")

}).catch(function(error){
   console.log(error);
});
 
 });
}