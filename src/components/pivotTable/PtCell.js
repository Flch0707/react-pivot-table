import { FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { useContext } from 'react'
import { PtCtx } from '../../contexts/PtCtx'

const PtCell = ({ cell }) => {
    const { toggleShowColChild, toggleShowRowsChild } = useContext(PtCtx)

    return (
        <th
            onClick={() => cell.node && toggleShowColChild(cell.node.id, cell.node.ancestor)}
            className={cell.className && cell.className}
            colSpan={cell.colSpan && cell.colSpan}
            rowSpan={cell.rowSpan && cell.rowSpan}>
            {cell.ico && (cell.ico === "FiChevronRight" ? <FiChevronRight /> : <FiChevronDown />)}
            {cell && cell.text}</th>
    )
}

export default PtCell
