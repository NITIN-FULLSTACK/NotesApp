import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


const App = () => {
  
 const [task,setTask]= useState('')
 const [taskHead,setTaskHead]= useState('')
 const [newTask,setNewTask] = useState([])
 const[loading,setLoading ] = useState(true)
 const [error,setError] = useState(null)
 
 useEffect(()=>{
    axios.get("http://localhost:8000/task").then(res=>{
      setNewTask(res.data)
      setLoading(false)
      
    }).catch(error=>{
      setError(error.message)
      setLoading(false)
    })
  }) 
 
 const ClickButton = ()=>{
   if (taskHead.trim() !=='' && task.trim()!=='') {
     axios.post("http://localhost:8000/task",{taskHead,task}).then( res=>{
      
      setNewTask([...newTask,{taskHead,task}])
      console.log(res.data);
      setTask('')
      setTaskHead('') 
      
    }).catch(error=>{
      console.log(error+"no");
      
    })
   }
      

  }
  if (loading) {
    return <p>loading..</p>
  }if(error){
    return <p>Error :{error}</p>
  }
  const DeleteButton = (id)=>{
    if (confirm("Are you sure")) {
      axios.delete("http://localhost:8000/task/" + id)
    .then(()=>{
      const update = newTask.filter((item)=>item._id !== id)
      setNewTask(update)
      
    }).catch((error)=>{
       console.log(error+"no");
    })
    }
  }
    return<>
    <center>
    <div className='center-align'><h1>Task Manager 📑</h1>
  <input type="text" className="" value={taskHead} onChange={(e)=>setTaskHead(e.target.value)}  /> <span>+</span>
  <input type="text" className=""value={task} onChange={(e)=>setTask(e.target.value)} />
  <button type="button" onClick={ClickButton}  > Summit 👍 </button>
  <div>
    {newTask.map((newtasks,index)=><li key={index} >{newtasks.taskHead}-<br/>{newtasks.task}<button onClick={()=>DeleteButton(newtasks._id)}  >Delete👀</button></li>)} 
    
  </div>
  </div>
    </center>
    </>
  
}

 

export default App