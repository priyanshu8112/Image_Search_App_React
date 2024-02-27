import { useState } from 'react'
import axios from 'axios';


function App() {
  const [text, settext] = useState("")
  const [images, setimages] = useState([])
  
  
  const API_URL = 'https://api.unsplash.com/search/photos';
  const IMAGES_PER_PAGE=20;
  
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
           text
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('data', data);
      setimages(data.results)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(text);
    fetchImages();
    settext("")
  };

  return (
    <>
        <div className='bg-gradient-to-t from-cyan-300 to-fuchsia-300 w-full min-h-screen p-3'>
            <h1 className='  p-5 text-center text-black text-3xl'>Image Search App</h1>
              <form onSubmit={handleSearch}>

                <div className=' mx-96 gap-6'> 
                        <input type="text" placeholder='Add Your Text' className=' mx-28 mb-12 my-5 w-1/2 px-8 h-8 border-zinc-800 w-60 outline-none rounded-xl'  
                          value={text}
                          onChange={(e)=>(
                            settext(e.target.value)
                          )}
                        />
                        <button className=' bg-red-500 text-white -mx-14 h-8 w-20 rounded-xl'>ADD</button>

                </div>
               
               
              </form> 

                    <div className="container my-3">
                      <div className="row  grid grid-cols-3">
                            {images.map((image) => {
                                    return (
                                      <div className="flex" >

                                         <div className=''>
                                              <img 
                                                      key={image.id}
                                                      src={image.urls.small}
                                                      alt={image.alt_description}
                                                      className='image mb-4 '
                                                    /> 
                                         </div>
                                                                        
                                       </div>
                                    );
                            })}
                      </div>
                  </div>
             
             
              
              
        </div>
       
      
       
    </>
  )
}

export default App
