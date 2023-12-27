import { useState } from 'react'
import './App.css'
import { useReducer } from 'react'
import { useRef } from 'react'


let list = [{
  id : 'Good Morning',
  see : true
}]

function task(x, y){
  switch (y.type) {
    case 'Increment':
      return[...x, {id: y.ta, see:true}]
      
    case 'Change_Theme':
      return x.map((a,index)=>{
        if(y.index === index){
          return {...a , see : !a.see};
        }else{
          return a
        }
      })
  
    default:
      return x;
      break;
  }
}

function App() {

  let [work, remove] = useReducer(task,list);
  let [temp, setTemp] = useState('')
  let references = useRef(null)


  function Change(e){
    setTemp(e.target.value);
  }

  function Key(){
    remove({type:'Increment', ta : temp })
  }

  function Change_Theme(index){
    remove({type:'Change_Theme', index})
  }

  function This(){
    references.current.focus();

  }

  return (
    <div className='box'>

      <input type="text" onChange={(e) => Change(e)} ref ={references} />

      <button onClick={Key}>
        Addition
      </button>
      {work.map((a,index) =>{
          return(
            <div key={index}>
              {(a.see) ? a.id : "Hidden"}
              <button onClick={()=> Change_Theme(index)}>Hide</button>
              
              {(a.see) ? <button onClick={This}>Focus</button> : null}
            </div>
          )
        })
      }  
    </div> 
  )
}

export default App