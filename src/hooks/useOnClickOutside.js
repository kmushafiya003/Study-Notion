import { useEffect } from "react";

export function useOnClickOutside(ref , handler)  {

    useEffect( ()=>{
      
    const listener = (events) => {

        //agr box ke andr click hua ho to kuvh nhi krna
        if(!ref.current || ref.current.contains(events.target)){
           return
        }
       
        //bahar click hua to call krna
        handler(events);

    }

   //add the listener
    document.addEventListener("mousedown" , listener);
    document.addEventListener("touchstart" , listener);

 
    //remove the listener
    return ()=>{
    document.removeEventListener("mousedown" , listener);
    document.removeEventListener("touchstart" , listener);
    }

    } , [ref ,handler])


}

