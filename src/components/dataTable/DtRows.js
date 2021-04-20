import { useContext } from 'react'
import { DtCtx } from '../../contexts/DtCtx'

const DtRows = ({ row }) => {
    const { state } = useContext(DtCtx)

    return (
        <tr>
            {state.headings.map((heading, i) =>
                <td key={i}>
                    {row[heading.value] === undefined ? 0 : String(row[heading.value])}
                </td>
            )}
        </tr>
    )
}

export default DtRows
