import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const[length,setLength]=useState(8)
  const[num,setNum]=useState(false)
  const[charr,setCharr]=useState(false)
  const[password,setPass]=useState("")

  const passwordRef=useRef(null)

  const generate=useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz"
    if(num) str += "0123456789"
    if(charr) str += "!@#$%^&*_+{}|[]/~`"
    for(let i=1;i<=length;i++)
    {
      let c = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(c)

    }
    setPass(pass)
  },[length,num,charr,setPass])

  const copyOnClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generate()
  },[length,charr,num,generate])

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl px-6 py-4  bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>PASSWORD GENERATOR:</h1>
      
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>

      <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
      <button className='outline-none bg-blue-600 text-white px-3 py-1 shrink-0 hover:bg-blue-800 transition duration-200' onClick={copyOnClipboard}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2 text-orange-300'>
      <div className='flex items-center gap-x-1'>
        <input type="Range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e)=>{
          setLength(e.target.value)}}/>
        <label >Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={num} id='numberInput' onChange={()=>{
          setNum((prev)=>!prev)
        }}/>
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={charr} id='charInput' onChange={()=>{
          setCharr((prev)=>!prev)
        }}/>
        <label htmlFor='charInput'>Characters</label>
      </div>
    </div>
    </div>
  );
}

export default App;
