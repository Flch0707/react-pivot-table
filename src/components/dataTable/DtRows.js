import {useContext } from 'react'
import {DtContext} from '../../contexts/DtContext'

const DtRows = ({row}) => {
    const {state} = useContext(DtContext)

    return (
        <tr>
            {state.headings.map((heading,i) =>
           <td key={i}>
               {row[heading.value] === undefined ? 0 : String(row[heading.value])}
          </td> 
            )}
        </tr>
    )
}

export default DtRows
