import Pagination from '../pagination/Pagination'
import DtHeaders from './DtHeaders'
import DtBody from './DtBody'
import { useEffect, useContext } from 'react'
import { DtCtx } from '../../contexts/DtCtx'
import DtSetBar from './DtSetBar'
const DataTable = ({ items, CustomHeadings }) => {
    const { onloadItems, state } = useContext(DtCtx)
    useEffect(() => {
        console.log("a")
        onloadItems(items, CustomHeadings)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='tableContainer'>
            <DtSetBar headings={state.headings}></DtSetBar>
            <table>
                <DtHeaders />
                <DtBody rows={state.pageItems} />
            </table>
            <Pagination />
        </div>
    )
}
export default DataTable
