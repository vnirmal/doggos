import React, {useState} from 'react';
import './App.css';
import './media.css'
import { TextField, Button , LinearProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';




function App() {
  const [text, setText] = useState('')
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(false)

  async function getDoggos() {
    setLoading(true)
    const key = "RGIylrCfPZhV3pn89X0SXDoD8ih0MTWM"
    let url = "https://api.giphy.com/v1/gifs/search?"
    url += "api_key=" + key
    url += "&q=" + text
    const r = await fetch(url)
    const body = await r.json()
    setDogs(body.data)
    setText('')
    console.log(dogs)
    setLoading(false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField id="outlined-basic" 
          label="Search for a dog" 
          fullWidth variant="outlined"
          color="secondary"
          value={text}
          onChange= {e=>setText(e.target.value)}
          onKeyPress={e=>{
            if(e.key==="Enter") getDoggos()
          }}/>
        </div>
        <Button 
          size="large" 
          variant="contained"
          onClick= {getDoggos}
          color="secondary">
          <Search/>
          </Button>
      </header>

      {loading && <LinearProgress />}
      <div className="dogs">
      {dogs.map((dog, i) => <Doggo key={i} {...dog}/>)}
      </div>
    </div>

    
  );
}

function Doggo ({title, images}) {
  const url = images.fixed_height.url
  return (<div className="doggo" onClick={()=>window.open(url, '_blank')}>
    <div className="doggo-title">{title}</div>
    <img height="200" alt="dog" src={url} />
  </div>)
}


export default App;
