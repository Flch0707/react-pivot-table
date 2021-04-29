import { FiChevronRight, FiChevronDown } from 'react-icons/fi'

const PtCell = ({ cell, toggleShowChild }) => {
    return (
        <th
            onClick={() => cell.node && toggleShowChild(cell.node.id, cell.node.ancestor)}
            className={cell.className && cell.className}
            colSpan={cell.colSpan && cell.colSpan}
            rowSpan={cell.rowSpan && cell.rowSpan}>
            {cell.ico && (cell.ico === "FiChevronRight" ? <FiChevronRight /> : <FiChevronDown />)}
            {cell && cell.text}</th>
    )
}

export default PtCell
