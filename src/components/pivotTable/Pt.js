import { PtSetCtx } from '../../contexts/PtSetCtx'
import { PtCtx } from '../../contexts/PtCtx'
import { useEffect, useContext } from 'react'
import PtHeader from './PtHeader'
import PtBody from './PtBody'
const PivotTable = ({ items }) => {
    const { state: stState } = useContext(PtSetCtx)
    const { onloadItems } = useContext(PtCtx)

    useEffect(() => {
        onloadItems(items, stState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stState])

    return (
        <div className='tableContainer'>
            <table>
                <PtHeader></PtHeader>
                <PtBody></PtBody>
            </table>
        </div>

    )
}

export default PivotTable
