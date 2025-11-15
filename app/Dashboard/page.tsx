"use client"
import { useState } from "react"
import Render from "../Render/page"

export default function Dashboard() {
    
    const [bookName,setBookName] = useState('')
    const [authorName,setAuthorName]= useState('')

    const handleSubmit = async ()=>{
        try{
            const response = await fetch("http://localhost:3000/api/books",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    bookName:bookName,
                    authorName:authorName
                })
            })
            const data = await response.json()
            if(response.ok){
                alert("book added successfully")
                setBookName('')
                setAuthorName('')
            }
            else
                alert('error')
        }
        catch(error){
            console.error('error:' ,error)
            alert('failed to add book')
        }
        
    }
    

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
                    
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Book name" 
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-gray-400"
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Author name" 
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-gray-400"
                        />
                        
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <Render />
        </div>

    )
}