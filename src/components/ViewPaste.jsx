import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {

  const {id} = useParams(); 
  const allPastes = useSelector((state)=> state.paste.pastes);
  const paste = allPastes.filter((p)=> p._id === id)[0];
  console.log("final paste: ", paste);

  return (
    <div className='flex-wrap'>
      <input
      className='p-1.5 rounded-2xl bg-gray-900 w-100'
      type="text" 
      placeholder='enter title name'
      value={paste.title}
      disabled
      />

     {/* <button className='p-2 rounded-2xl mt-2 ml-10'
      onClick={createPaste}
      >
        {pasteId? "Update my Paste":"Create my Paste"}
      </button> */}
      
        <div className='mt-8'>
          <textarea 
          className='bg-black rounded-2xl min-w-[600px] p-4'
          placeholder='enter content here'
          value={paste.content}
          disabled
          rows={20}
          />
        </div>
    </div>
  )
}

export default ViewPaste
