import Pagination from '../pagination/Pagination'
import DtHeaders from './DtHeaders'
import DtBody from './DtBody'
import { useState, useEffect, useContext } from 'react'
import { DtContext } from '../../contexts/DtContext'
const DataTable = ({ items, CustomHeadings }) => {
    const { onloadItems, state } = useContext(DtContext)
    useEffect(() => {
        onloadItems(items, CustomHeadings)
    }, [])

    return (
        <div className='tableContainer'>
            <table>
                <DtHeaders />
                <DtBody rows={state.pageItems} />
            </table>
            <Pagination />
        </div>
    )
}
export default DataTable
