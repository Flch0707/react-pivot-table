import { FiChevronRight, FiChevronDown } from 'react-icons/fi'

const PtHeadCell = ({ cell, toggleShowChild }) => {
    return (
        <th
            onClick={() => cell.node && toggleShowChild(cell.node.id, cell.node.ancestor)}
            className={cell.className && cell.className}
            colSpan={cell.colSpan && cell.colSpan}
            rowSpan={cell.rowSpan && cell.rowSpan}>
            {cell.ico && (cell.ico === "FiChevronRight" ? <FiChevronRight /> : <FiChevronDown />)}
            {cell && cell.text}</th>
        // <th
        //     colSpan={cell.colSpan && cell.colSpan}
        //     rowSpan={cell.rowSpan && cell.rowSpan}
        //     className={cell.className && cell.className}

        // >
        //     <div
        //         onClick={() => cell.node && toggleShowChild(cell.node.id, cell.node.ancestor)}
        //     >
        //         {cell.ico && (cell.ico === "FiChevronRight" ? <FiChevronRight /> : <FiChevronDown />)}
        //         <span>{cell && cell.text}</span> </div>
        // </th>
    )
}

export default PtHeadCell
