import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const [searchTerm,setSearchTerm]=useState("");
  const pastes = useSelector((state)=>state.paste.pastes);
  const dispatch = useDispatch();

  const filterdata = pastes.filter((paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }


  return (

    <div>
      <input 
      className='w-[700px] rounded-xl border-2 border-violet-500 place-content-center text-center h-9'
      type="search"
      placeholder='search here'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} />
      <div className='flex flex-col gap-5'>
        {
          filterdata.length > 0 && filterdata.map((paste)=>{
            return(
              <div className='border mt-6' key={paste?._id}>
                <div>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                  <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                  <button onClick={()=>{navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to Clipboard")
                  }}>Copy</button>
                  <button>Share</button>
                </div>
                <div>
                  {paste.createdAt}
                </div>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste
