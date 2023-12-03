import { useState } from 'react'
import axios from 'axios'
import './assets/global.css'

function App() {
  const [inputs, setInputs] = useState({})

  function onFormSubmit(event) {
    event.preventDefault()
    console.log(inputs)
    axios.post('http://localhost:8000/price_estimate', inputs)
    .then(res => {
      console.log(res.data)
      var priceTag = document.getElementsByName('price')[0]
      priceTag.innerHTML = res.data
    })
    .catch(err => console.log(err))
  }

  function onInputChange(event) {
    setInputs({...inputs, [event.target.name]: event.target.value})
  }

  return (
    <div className='px-56 pt-36'>
      <form onSubmit={onFormSubmit}>
        <div className='bg-slate-100 p-3 border-2 rounded-xl shadow-xl'>
          <span className='text-2xl font-semibold'>House Info Form</span>
          <hr className='mt-3'></hr>
          {/* INPUTS */}
          <div className='grid gap-4 grid-cols-3 grid-rows-3'>
            <div className='m-3'>
              <label htmlFor='bedrooms' className='text-lg font-semibold'>Bedrooms</label>
              <input name='bedrooms' type='number' min={1} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 2' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='bathrooms' className='text-lg font-semibold'>Bathrooms</label>
              <input name='bathrooms' type='number' min={1} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 2' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='floors' className='text-lg font-semibold'>Floors</label>
              <input name='floors' type='number' min={1} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 1' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='waterfront' className='text-lg font-semibold'>Waterfront</label>
              <select name='waterfront' onChange={onInputChange} className='w-full text-left p-2 rounded-lg' defaultValue={''} required>
                <option value={''} disabled>Choose an option</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
            <div className='m-3'>
              <label htmlFor='condition' className='text-lg font-semibold'>Condition</label>
              <input name='condition' type='number' min={1} max={5} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='Values range from 1 to 5' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='grade' className='text-lg font-semibold'>Grade</label>
              <input name='grade' type='number' min={1} max={10} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='Values range from 1 to 10' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='sqft_living' className='text-lg font-semibold'>Living Area</label>
              <input name='sqft_living' type='number' min={600} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 5000' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='sqft_lot' className='text-lg font-semibold'>House Size</label>
              <input name='sqft_lot' type='number' min={1600} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 1800' required></input>
            </div>
            <div className='m-3'>
              <label htmlFor='sqft_basement' className='text-lg font-semibold'>Basement Size</label>
              <input name='sqft_basement' type='number' min={0} onChange={onInputChange} className='w-full text-left p-2 rounded-lg' placeholder='e.g. 0' required></input>
            </div>
          </div>
        </div>
        {/* BUTTON GROUP */}
        <div className='text-right m-2'>
          <button type='reset' className='bg-black text-white mx-1 p-3 w-28 rounded-xl shadow-xl'>Clear</button>
          <button type='submit' className='bg-black text-white mx-1 p-3 w-28 rounded-xl shadow-xl'>Estimate</button>
        </div>
      </form>
      <br></br>
      <div className='bg-slate-100 text-center h-20 w-56 py-3 px-2 mx-auto border-2 rounded-xl shadow-xl' placeholder='Estimated Price'>
        <label htmlFor='price' className='text-lg font-semibold'>Estimated Price</label><hr className='border-none h-[1px] bg-black'></hr>
        <span name='price' className='text-lg text-sky-600 font-extrabold'></span>
      </div>
    </div>
  )
}

export default App
