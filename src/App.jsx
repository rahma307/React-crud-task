import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Product from './Product'

function App() {
  const [products, setProducts] = useState([])

  function onDelete(id) {
    const updated = products.filter((product) => product.id !== id)
    setProducts(updated)
    localStorage.setItem("data", JSON.stringify(updated))
  }
function onUpdate(id, newData) {
  const updated = products.map((p) =>
    p.id === id ? { ...p, ...newData } : p
  )
  setProducts(updated)
  localStorage.setItem("data", JSON.stringify(updated))
}

  async function display() {
    try {
      
      const savedData = localStorage.getItem("data")
      if (savedData) {
        setProducts(JSON.parse(savedData))
      } else {
       
        const { data } = await axios.get("https://dummyjson.com/products")
        setProducts(data.products)
        localStorage.setItem("data", JSON.stringify(data.products))
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    display()
  }, [])

  return (
    <div className="container py-4">
      {products.length === 0 ? (
        <div className="text-center py-5">
          <h2>Loading products...</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((el) => (
            <div key={el.id}  >
              <Product product={el} del={onDelete}   onUpdate={onUpdate}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
