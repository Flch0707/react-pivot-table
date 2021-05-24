import Pagination from '../pagination/Pagination'
import DtHeaders from './DtHeaders'
import DtBody from './DtBody'

import { useEffect, useContext, useState } from 'react'
import { PgnCtx } from '../../contexts/PgnCtx'
const DataTable = ({ items, headings }) => {
    const { state: PgnState } = useContext(PgnCtx)
    const [rows, setRows] = useState([])

    useEffect(() => {
        const getRows = () => {
            setRows([...items.slice((PgnState.itemsPerPage * (PgnState.currentPage - 1)), PgnState.itemsPerPage * PgnState.currentPage)])
        }
        getRows()
    }, [items, PgnState])

    return (
        <div className='tableContainer'>
            <table>
                <DtHeaders headings={headings} />
                <DtBody
                    headings={headings}
                    rows={rows} />
            </table>
            <Pagination
                itemLength={items && items.length}
            />
        </div>
    )
}
export default DataTable
