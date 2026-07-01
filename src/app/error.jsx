'use client';


const error = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-4xl font-bold text-primary'>Something Went Wrong</h1>
      <p className="text-pink-500 mt-4 font-bold text-xl italic">Try Again</p>
    </div>
  )
}

export default error
