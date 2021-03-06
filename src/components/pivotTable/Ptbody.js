import { useContext } from 'react'
import { PtCtx } from '../../contexts/PtCtx'
import PtRow from './PtRow'

const PtBody = () => {
    const { state: ptState, toggleShowRowsChild } = useContext(PtCtx)

    class Cell {
        constructor({ text = null, className = null, colSpan = null, rowSpan = null, ico = null, node = null, td = null }) {
            this.text = text
            this.className = className
            this.colSpan = colSpan
            this.rowSpan = rowSpan
            this.ico = ico
            this.node = node
            this.td = td
        }
    }

    const getRows = (nodes, colSpan, rowSpan, isChild, rows) => {
        let curColSpan = colSpan -= 1
        nodes.forEach((node, i) => {
            let row = getRow(node, colSpan, rowSpan, isChild && i === 0)
            rows.push(row)
            if (node.children.length > 0 && node.showChildren) {
                getRows(node.children, curColSpan, node.rowSpan, true, rows)
            }
        })
    }

    const getRowHeader = (node, colSpan) => {
        if (node.children.length > 0) {
            let arrow = node.showChildren ? "FiChevronDown" : "FiChevronRight"
            return new Cell({ text: node.text, colSpan: colSpan, ico: arrow, node: node })
        }
        else {
            return new Cell({ text: String(node.text), colSpan: colSpan })
        }
    }

    const getRow = (node, colSpan, rowSpan, isChild) => {
        let row = []
        if (isChild) {
            row.push(new Cell({ className: "blank-row", rowSpan: rowSpan }))
        }
        row.push(getRowHeader(node, colSpan))
        node.data && node.data.forEach(data => {
            row.push(new Cell({ text: data.value, td: true }))
        })
        return row
    }

    const getTbody = () => {
        let rows = []
        getRows(ptState.rowsArray, ptState.rowsDepth + 1, null, false, rows)
        return rows
    }

    return (
        <tbody>
            {ptState.rowsArray.length > 0 && getTbody().map((row, idx) =>
                <PtRow
                    toggleShowChild={toggleShowRowsChild}
                    key={idx}
                    row={row} />
            )}
        </tbody>
    )
}

export default PtBody
