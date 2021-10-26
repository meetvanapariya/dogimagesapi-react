import React ,{useState,useEffect} from 'react';
import {fetchPictures} from './lib/api';
import DogCardInfo from './components/DogCardInfo';
import BreedList from './components/BreedList';
import './App.css';

function App() {
  const [pictures,setPictures] = useState([]);
  const [selectBreedId,setSelectBreedId] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  useEffect(()=>{
    const loadPictures = async () =>{
      setIsLoading(loading => !loading);
      const fetchPictureAll = await fetchPictures(selectBreedId,20);
      setPictures(fetchPictureAll);
      setIsLoading(loading => !loading);
  }
  loadPictures();
  },[selectBreedId])
  return (
   <div className="container">
     <header className="section has-text-centered">
     <h1 className="title is-size-3 has-text-primary">Search For pictures For dogs</h1>
     <p>Filter by Breed for more choice!</p>
     </header>
     <hr/>
     <div className="columns section is-multiline">
       <div className="column is-one-quarter">
         <BreedList dispatchBreedChange={(breedId) => setSelectBreedId(breedId)}/>   
       </div>
       <div className="column">
        <div className="columns is-multiline">
        {isLoading && (
                <progress className="progress is-medium is-link" max="100">
                    60%
                </progress>
            )}
       
          {!isLoading && (
            pictures.map(picture =>(
              <div className="column is-one-quarter" key={picture.id}>
                <DogCardInfo imgUrl={picture.url} pictureId={picture.id} />
              </div>
            ))
          )}
           </div>
      </div>
     </div>
   </div>
  );
}

export default App;
