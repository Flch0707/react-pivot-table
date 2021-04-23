import { useContext } from 'react'
import { PtCtx } from '../../contexts/PtCtx'
import PtRow from './PtRow'

const PtBody = () => {
    const { state: ptState } = useContext(PtCtx)
    class Cell {
        constructor({ text = null, className = null, colSpan = null, rowSpan = null, ico = null, node = null }) {
            this.text = text
            this.className = className
            this.colSpan = colSpan
            this.rowSpan = rowSpan
            this.ico = ico
            this.node = node
        }
    }

    const getRows = (nodes, colspan, rowSpan, isChild, rows) => {
        let curColSpan = colspan -= 1
        nodes.forEach((node, i) => {
            let row = getRow(node, colspan, rowSpan, isChild && i === 0)
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
        console.log(rowSpan, node.text)
        if (isChild) {
            row.push(new Cell({ className: "blank-row", rowSpan: rowSpan }))
        }
        row.push(getRowHeader(node, colSpan))
        node.data && node.data.forEach(data => {
            row.push(new Cell({ text: data.value }))
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
                    key={idx}
                    row={row} />
            )}
        </tbody>
    )
}

export default PtBody
