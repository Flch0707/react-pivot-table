import { DtCtx } from '../../contexts/DtCtx'
import { PtSetCtx } from '../../contexts/PtSetCtx'
import { PtCtx } from '../../contexts/PtCtx'
import { useEffect, useContext } from 'react'
import PtHeader from './PtHeader'
import Ptbody from './Ptbody'
const PivotTable = () => {
    const { state: dtState } = useContext(DtCtx)
    const { state: stState } = useContext(PtSetCtx)
    const { onloadItems } = useContext(PtCtx)

    useEffect(() => {
        onloadItems(dtState.items, stState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stState])

    return (
        <div className='tableContainer'>
            <table>
                <PtHeader></PtHeader>
                <Ptbody></Ptbody>
            </table>
        </div>

    )
}

export default PivotTable
