import react from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const s1 = {

        "name": "Harry",
        "class": "5b"

    }

    const s2 = {

        "name": "Larry",
        "class": "6b"

    }



    const [state, setState] = useState(s1);

    const update = ()=>{
        setTimeout(() => {
            setState(s2)
        }, 2000);

    }
    return(

        <noteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </noteContext.Provider>

    )

}

export default NoteState;