import axios from 'axios';
import React, { useState } from 'react';

function Dictionary() {

  const [keyword, setkeyword] = useState("");
  const [data, setData] = useState("");
  const [speech, setSpeech] = useState("");
  const [Defination, setDefination] = useState("");
  const [example, setExample] = useState("");


  const handleClick = () => {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`)
      .then(function (response) {
        // handle success
        const fetcheddata = response.data[0];
        setData(fetcheddata);
        const partspeech = fetcheddata.meanings[0].partOfSpeech
        setSpeech(partspeech)
        const definations = fetcheddata.meanings[0].definitions[0]
        const define = definations.definition
        setDefination(define)
        setExample(definations.example)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  return (
    <>
      <h1 className='my-4'>Dictionary App</h1>
      <div className="containerx">
        <div className="input-group mb-3" style={{ width: "500px", }}>
          <input type="text" className="form-control" placeholder="Enter your text" onChange={(e) => setkeyword(e.target.value)} />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={() => handleClick()}>Search</button>
        </div>

        {data !== "" ? <div className='happy'>
          <h2 className='my-3'>{data.word}</h2>
          <p className='text-success fw-bold'>Parts of speech:
          <br />
            <span className='text-dark'>{speech}</span></p>
          

          <p className='text-success fw-bold'>Defination:
          <br />
            <span className='text-dark'>{Defination}</span></p>
          

          {example !== undefined ? <p className='text-success fw-bold my-2'>Example:
            <br />
            <span className='text-dark'>{example}</span>
          </p> : ""}

        </div> : ""}
      </div>

    </>
  )
}

export default Dictionary
