import { useState } from 'react'
//import { Music, Plus, HardDrive, Clock, Play } from 'lucide-react'
import Footer from '../Components/Footer'


function Library() {
  return (
    <>
    <div className="md:ml-64 min-h-screen bg-gradient-to-r mb-30 from-purple-500 to-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>
      <section className="mb-30">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
         {/*<Clock className="mr-2" /> Recent Songs*/}
        </h2>
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
         This page is still under construction 
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default Library
