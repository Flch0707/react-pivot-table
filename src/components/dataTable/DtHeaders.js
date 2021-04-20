import { useContext } from 'react'
import {DtContext} from '../../contexts/DtContext'

const Headers = ()=> {
    const {state} = useContext(DtContext)
    return (
        <thead>
               <tr>
             {state.headings && state.headings.map((heading)=>
                  <th key={heading.value} >{heading.text}</th>
            )}
               </tr> 
        </thead>
    )
}

export default Headers
