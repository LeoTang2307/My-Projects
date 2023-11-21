import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './assets/global.css'

function App() {
  const [city, setCity] = useState()
  const [city_cols, setCityCols] = useState([])
  const [bed, setBed] = useState()
  const [bath, setBath] = useState()
  const [house_size, setHouseSize] = useState()
  const [land_size, setLandSize] = useState()
  const [price, setPrice] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/get_cities')
    .then(res => setCityCols(res.data))
    .catch(err => console.log(err))
  })

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:8000/price_estimate', null, {params: {
      city: city,
      bath: bath,
      bed: bed,
      house_size: house_size,
      land_size: land_size
    }})
    .then(res => setPrice(res.data))
    .catch(err => console.log(err))
  }

  return (
    <div className='grid items-center justify-center font-[Poppins] text-xl pt-5 px-[5%]'>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 items-center justify-center mx-5'>
        <div>
          <label for='land' className='mb-2 mt-7 text-violet-200 font-extrabold'>Land size (square feet)</label>
          <input id='land' onChange={(e) => setLandSize(e.target.value)} type='number' className='outline-none bg-sky-50 p-2 w-full h-full rounded-lg shadow-xl' required></input>
        </div>

        <div>
          <label for='house' className='mb-2 mt-7 text-violet-200 font-extrabold'>Home size (square feet)</label>
          <input id='house' onChange={(e) => setHouseSize(e.target.value)} type='number' className='outline-none bg-sky-50 p-2 w-full h-full rounded-lg shadow-xl' required></input>
        </div>

        <div>
          <label for='bed' className='mb-2 mt-7 text-violet-200 font-extrabold'>Bedroom(s)</label>
          <input id='bed' onChange={(e) => setBed(e.target.value)} type='number' className='outline-none bg-sky-50 p-2 w-full h-full rounded-lg shadow-xl' required></input>
        </div>

        <div>
          <label for='bath' className='mb-2 mt-7 text-violet-200 font-extrabold'>Bathroom(s)</label>
          <input id='bath' onChange={(e) => setBath(e.target.value)} type='number' className='outline-none bg-sky-50 p-2 w-full h-full rounded-lg shadow-xl' required></input>
        </div>

        <div>
          <label for='city' className='mb-2 mt-7 text-violet-200 font-extrabold'>City</label>
          <select id='city' onChange={(e) => setCity(e.target.value)} className='outline-none bg-sky-50 p-2 w-full h-full rounded-lg shadow-xl' required>
            <option value="" selected disabled>--Select--</option>
            {city_cols.map(col => (
              <option value={col}>{col}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div className='col-span-2 text-center'>
          <button type='submit' className='w-fit px-4 py-1 outline-none my-5 border-2 rounded-lg bg-orange-200 border-orange-200 hover:bg-orange-300 hover:border-orange-300 shadow-xl'>Estimate Price</button>
        </div>
      </form>
      <input value={price} className='w-fit outline-none mt-5 mx-auto p-1 rounded-lg text-center font-extrabold bg-gradient-to-r from-indigo-300 via-sky-500 to-emerald-300 shadow-xl' disabled></input>
    </div>
  )
}

export default App
