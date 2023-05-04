import { useState } from 'react'
import React from 'react'
function Form(){

    //making two states for the new meme object and for all the memes data repectively
    let [memeImg,setmemeImg]=React.useState({topText:"",bottomText:"",randomImage:"http://i.imgflip.com/1bij.jpg"})
    let [allMeme,setAllMeme]=React.useState([]);

    //making the api call
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMeme(data.data.memes))
    },[])
    //setting the new random image url to the old meme object
    function newMem(){
        let randNum=Math.floor(Math.random()*allMeme.length);
        let imgUrl=allMeme[randNum].url;
        setmemeImg(prevMeme=>({
            ...prevMeme,
            randomImage:imgUrl
        }));
    }
    function changeHandler(e){
        const {name,value}=e.target;
        setmemeImg(prev=>({
            ...prev,
            [name]:value
        }))
    }

    return (
        <div className='inputForm'>
            <div className='input'>
                <input placeholder=' Top Text' type="text" name="topText" value={memeImg.topText} onChange={changeHandler}/>
                < input placeholder='Bottom Text' type="text" name="bottomText" value={memeImg.bottomText} onChange={changeHandler} />
            </div>
            <button onClick={newMem}>Get a New Meme Image</button>
            <div className='ldImg'>
                <img src={memeImg.randomImage} />
                <h2 className="memeTop">{memeImg.topText}</h2>
                <h2 className="memeBottom">{memeImg.bottomText}</h2>
            </div>
        </div>
    )
}
export default Form