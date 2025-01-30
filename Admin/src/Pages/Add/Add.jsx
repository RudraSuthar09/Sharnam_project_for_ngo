import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
// import { useEffect } from 'react'
import axios from "axios"

const Add = () => {
    const url= "http://localhost:4000";
    const[image,setImage]= useState(false);
    const[data, setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    const onChangeHandler=(event)=>{
        const name= event.target.name;
        const value = event.target.value;
        setData(data=>({
            ...data,[name]:value
        }))
    }

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formData =new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response= await axios.post(`${url}/api/food/add`, formdata);
        if(response.data.success){
           setData ({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
        }
        else{

        }

    }

  return (
    <div className='add'>
        <form className='flex-col'>
            <div className='add-img-upload flex-col' onSubmit={onSubmitHandler}>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="" placeholder='type here'  />
                
            </div>
            <div className="add-product-description flex-col">
                <p>
                    Product Description
                </p>
                <textarea onChange={onChangeHandler} value={data.description} name="description"  rows="6" placeholder='Write content here' required></textarea>

            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select  name="category"  > 
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>

                </div>

                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />


                </div>
            </div>
            <button type='submit' className='add-btn'> ADD</button>
        </form>
        
    </div>
  )
}

export default Add