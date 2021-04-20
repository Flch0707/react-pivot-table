import { useContext } from 'react'
import { FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { PtCtx } from '../../contexts/PtCtx'

const Ptbody = () => {
    const { toggleShowRowsChild, state: ptState } = useContext(PtCtx)
    const getRows = () => {
        let arr = []
        ptState.rowsArray && ptState.rowsArray.forEach((row) => {
            arr.push(row && <tr key={row.id}>
                <>{getRowHeader(row, ptState.rowsDepth)}</>
                {row.data && row.data.map(data => {
                    return <td>{data.value}</td>
                })}
            </tr>)
            if (row.children.length > 0 && row.showChildren) {
                getChildren(row.children, ptState.rowsDepth, row.rowsLength, arr)
            }
        })
        return arr
    }

    const getChildren = (children, colspan, rowspan, arr) => {
        let accu = colspan -= 1
        children.forEach((child, i) => {
            let obj = child && <tr key={child.id}>
                {i === 0 && <td className="blank-row" rowspan={rowspan}></td>}
                <>{getRowHeader(child, accu)}</>
                {child.data.map(data => {
                    return <td>{data.value}</td>
                })}
            </tr>
            arr && arr.push(obj)
            if (child.children.length > 0 && child.showChildren) {
                getChildren(child.children, accu, child.rowsLength, arr)
            }
        })
    }
    const getRowHeader = (node, colSpan) => {
        if (node.children.length > 0) {
            let arrow = node.showChildren ? <FiChevronDown /> : <FiChevronRight />
            return <td colSpan={colSpan} onClick={() => toggleShowRowsChild(node.id, node.ancestor)}>{arrow} {String(node.text)}</td>
        }
        else {
            return <td colSpan={colSpan} >{String(node.text)}</td>
        }
    }
    return (
        <tbody>
            {getRows()}
        </tbody>
    )
}

export default Ptbody
