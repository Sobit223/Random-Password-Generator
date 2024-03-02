import { useState, useCallback , useEffect, useRef} from "react";

function App(){
  const [length, setlength] = useState(8);
  const [numbers, setnumbers] = useState(false);
  const [specialchar, setspacialchar] = useState(false);
  const [password, setpassword] = useState('');
  let passwordreference = useRef(null);
  const passwordgenerator = useCallback(()=>{
    console.log('Heloo');
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ''
    if(numbers) str+='1234567890'
    if(specialchar) str+="#$%&'()*+,-./:;<=>?@[]^_`{|}~"
    console.log(str);
    for(let i =0; i<length; i++){
      let value = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(value)
    }
    setpassword(pass)

  
    
  }, [length, numbers, specialchar, setpassword])  

  useEffect(()=>{passwordgenerator()}, [length, numbers, specialchar])

  function copytoclip(){
    passwordreference.current?.select();
    // passwordreference.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password);
  }
  
  return (
    <>
    <div className="bg-blue-200 h-dvh w-full flex flex-wrap content-center">
      <div className="h-16 w-2/3 bg-zinc-200 mt-5 ml-80 rounded-xl">
        <input 
        type="text"
        value={password}
        placeholder="PASSWORD"
        className="h-14 w-3/4 ml-20 text-center rounded-xl"
        readOnly
        ref={passwordreference}
        ></input>
        <button className="outline-none bg-blue-700 text-white px-8 py-4 shrink-0 rounded ml-6" onClick={copytoclip}>COPY</button>
      </div>


      <div className="h-16 w-2/3 bg-zinc-200 mt-5 ml-80 rounded-xl text-center">
      <label className="ml-10">LABLE:{length}</label>
        <input
        type="range"

        max={150}
        min={6}
        className="cursor-pointer mt-4"
        onChange={(event)=>{setlength(event.target.value)}}
        />

        <label className="ml-8">Numbers Allowed</label>
        <input type="checkbox"
          defaultChecked= {numbers}
          id="Numberchecker"
          onChange={()=>{setnumbers((prev)=>!prev)}}     
          className="ml-2 h-4 w-5 mt-2"     
         />

         <label className="ml-8">Special Character</label>
        <input type="checkbox"
          defaultChecked= {specialchar}
          id="Numberchecker"
          onChange={()=>{setspacialchar((prev)=>!prev)}}     
          className="ml-2 h-4 w-5 mt-2"     
         />


      </div>
    </div>
    </>

  )
}

export default App