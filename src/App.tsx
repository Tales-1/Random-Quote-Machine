import {useEffect, useState} from "react"
import "./quote.css"
import twitterIcon from "./assets/twitter-white.png"


function App() {
  const [quotes,setQuotes] = useState(null)
  const[currentQuote, setCurrentQuote] = useState({author:"", text:""})
  const randomIndex = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
  function newQuote(){
    if(quotes){
      setCurrentQuote(quotes[randomIndex])
    }
  }
  console.log(currentQuote)
  useEffect(()=>{
    fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(data =>{ 
      setQuotes(data)
      setCurrentQuote(data[randomIndex])
    }
      ) 
    .catch(err => console.error(err));

  },[])
 
  return (
    <div className="relative grid place-items-center bg-slate-600 h-screen">
        <div className="w-3/4 max-w-[30rem] bg-white flex flex-col gap-4 py-4 md:p-8 shadow-[0_5px_15px_rgba(0,0,0,0.35)] rounded-md" id="quote-box">
          <figure className="flex flex-col w-full m-auto p-4">
            <blockquote>
              <p id="text" className="text-sm md:text- lg:text-3xl">{quotes ? currentQuote.text : "loading..."}</p>
            </blockquote>
            <figcaption className="self-end mt-5 text-xs md:text-sm" id="author">
              -- {quotes ? (currentQuote.author === null ? "anonymous" : currentQuote.author) 
                            : "loading author..."}
            </figcaption>
          </figure>
          
        
           
          <div className="flex w-full items-center justify-between p-1 md:p-3 my-auto bg-[#fbb040] shadow-[0_5px_15px_rgba(0,0,0,0.35)] rounded-md">
            <a href="twitter.com/intent/tweet" className="z-20" id="tweet-quote" target="_blank">
              <img src={twitterIcon} alt="twitter logo" className="w-6 md:w-8 ml-3 md:ml-0"/>
            </a>
  
            <button className="ml-auto mr-3 md:mr-0 text-xs md:text-base p-1 bg-slate-600 hover:scale-105 text-white font-bold md:p-3 rounded transition-all" id="new-quote" onClick={newQuote}> 
              New quote
            </button>
          </div>
        </div>
    </div>
  )
}

export default App
