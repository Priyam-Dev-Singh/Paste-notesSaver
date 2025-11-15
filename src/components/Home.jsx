import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const[title,setTitle]=useState("");
  const[value,setValue]=useState("");
  const[searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));
    }
    //after creation or updation of the paste clear all fields
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className='flex-wrap'>
      <input
      className='p-1.5 rounded-2xl bg-gray-900 w-100'
      type="text" 
      placeholder='enter title name'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <button className='p-2 rounded-2xl mt-2 ml-10'
      onClick={createPaste}
      >
        {pasteId? "Update my Paste":"Create my Paste"}
      </button>
      
        <div className='mt-8'>
          <textarea 
          className='bg-black rounded-2xl min-w-[600px] p-4'
          placeholder='enter content here'
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
          />
        </div>
    </div>
  )
}

export default Home
