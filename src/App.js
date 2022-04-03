
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React,{useEffect, useState} from 'react';

function getlocalstorage(){
  let list=localStorage.getItem("lists");
  if(list){
    return JSON.parse(localStorage.getItem("lists"));
  }
  else{
    return []
  }
}

function App() {


  
 const [task,settask] = useState('');
 const [result,setresult] = useState(getlocalstorage());
 const [btnupd,setbtnupd] =useState(false);
 const [btnadd,setbtnadd] = useState(false);
 const [valueid,setvalueid] = useState();

 useEffect(()=>{
   localStorage.setItem("lists",JSON.stringify(result))
 },[result])



 function onInputChange(e){
  settask(e.target.value);
 }

 function AddTask(){
   if(task){

    
    if(!result.includes(task)){
     
      setresult([...result,task]);
      settask('');
    
     }else{
       alert("Your task is already in list")
     }

   }
   else{
     alert("Enter Your Task");

   }
 }

 function DeleteTask(id){
    result.splice(id,1);
    setresult([...result]);
    settask('');
 }

 function EditTask(val,idx){
   settask(val);
   setbtnupd(true);
   setbtnadd(true);
   setvalueid(idx);
 }

 function UpdateTask(){
   settask(task);
   result.splice(valueid,1,task);
   setresult([...result]);
   setbtnadd(false);
   setbtnupd(false);
   settask('');
 }


  return (
    <div className="App">
    
  <div className='container'>
    <div className='row  d-flex justify-content-center align-items-center ' style={{height:"50vh"}}>
      <div className='col-lg-6 mx-auto'>
        <div className='text-center display-4 mb-3'>To Do App</div>
      <div className='input-group '>
      <input type="text" className='form-control shadow-none ' value={task} onChange={(e)=> onInputChange(e)} placeholder='Write something here...'/>
      {
        btnadd?null:<button type="button" className='btn btn-warning shadow-none' onClick={AddTask}>Add Task</button>
      }
      {
        btnupd?<button type='button' className='btn btn-success shadow-none' onClick={UpdateTask}>Update Task</button>:null
      }
      </div>
  {
    result.map((value,index)=>{
       return(
        <div className='bg-dark  text-white py-2 ps-3 pe-2 mt-3 rounded'>
        <div className='d-flex justify-content-between'>
         <span style={{wordBreak:"break-all" ,width:"460px"}}>{value}</span>
        <div>
        <button type="button" className='btn btn-primary shadow-none me-2' onClick={()=>EditTask(value,index)}>Edit</button>
        <button type="button" className='btn btn-danger shadow-none' onClick={()=>DeleteTask(index)}>Delete</button>
        
        </div>
        </div>
   
      </div>
       )
    })
  }
      </div>
    </div>
  </div>
    

    </div>
  );
}

export default App;
