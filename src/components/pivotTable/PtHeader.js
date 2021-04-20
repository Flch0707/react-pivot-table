import { FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { useContext } from 'react'
import { PtCtx } from '../../contexts/PtCtx'
import { PtSetCtx } from '../../contexts/PtSetCtx'

const PtHeader = () => {
    const { toggleShowColChild, state: ptState } = useContext(PtCtx)
    const { state: stState } = useContext(PtSetCtx)
    const getValuesHeader = () => {
        return ptState.valueArray.map((v) => {
            return <th >{v}</th>
        })
    }
    const getCols = () => {
        let objCols = {}
        // create as many properties as there are subcolumns
        stState.colSelection.forEach((col, i) => {
            if (i < ptState.colsDepth) {
                objCols[col.value] = [<th colSpan={ptState.rowsDepth} key={objCols[col.value] + i}></th>]
                objCols[col.value + "Values"] = [<th colSpan={ptState.rowsDepth} key={objCols[col.value + "Values"] + i}></th>]
            }
        })
        // Hydrate every props with values
        ptState.colsArray && ptState.colsArray.forEach((col, i) => {
            let obj = getColHeader(col, ptState.colsDepth)
            objCols[col.selector] && objCols[col.selector].push(obj)
            let arrVals = getValuesHeader()
            arrVals && arrVals.forEach(v => objCols[col.selector + "Values"].push(v))

            if (col.children.length > 0 && col.showChildren) {
                getChildren(col, ptState.colsDepth, objCols)
            }
        })
        // return array with obj values
        return Object.values(objCols)
    }
    const getChildren = (node, rowSpan, objCols) => {
        let accu = rowSpan -= 1
        node.children.forEach((col, i) => {
            // let obj = <th key={col.id}>{String(col.text)}</th>
            let obj = getColHeader(col, accu)
            objCols[col.selector].push(obj)
            if (i === node.children.length - 1) objCols[col.selector].push(<th className="blank-row" rowSpan={accu}>{node.text}</th>)
            if (col.children.length > 0 && col.showChildren) {
                getChildren(col, accu, objCols)
            }
        })
    }
    const getColHeader = (node, rowSpan) => {
        if (node.children.length > 0) {
            let arrow
            if (node.showChildren) {
                arrow = <FiChevronDown />
                return <>
                    <th key={node.id + "Blank"} className="blank-row" colSpan={node.colsLength + 1} onClick={() => toggleShowColChild(node.id, node.ancestor)}>{arrow}{node.text}</th>
                    {/* <th key={node.id} rowSpan={rowSpan} > {String(node.text)}</th> */}
                </>
            }
            else {
                arrow = <FiChevronRight />
                return <th key={node.id} rowSpan={rowSpan} onClick={() => toggleShowColChild(node.id, node.ancestor)}>{arrow} {String(node.text)}</th>
            }
        }
        else {
            return <th rowSpan={rowSpan} colSpan={node.colsLength} >{String(node.text)}</th>
        }
    }
    return (
        <thead>
            {stState.colSelection && stState.colSelection.length > 0 && getCols().map((col, i) => {
                return <tr key={i}>
                    {col}
                </tr>
            })
            }
        </thead>)
}

export default PtHeader
