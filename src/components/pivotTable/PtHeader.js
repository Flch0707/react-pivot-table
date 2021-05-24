import PtRow from "./PtRow"
import { PtCtx } from "../../contexts/PtCtx"
import { PtSetCtx } from "../../contexts/PtSetCtx"
import { useContext } from 'react'
const PtHeader = () => {
    const { state: ptState, toggleShowColChild } = useContext(PtCtx)
    const { state: stState } = useContext(PtSetCtx)

    class Header {
        constructor({ text = null, className = null, colSpan = null, rowSpan = null, ico = null, node = null }) {
            this.text = text
            this.className = className
            this.colSpan = colSpan
            this.rowSpan = rowSpan
            this.ico = ico
            this.node = node
        }
    }

    const getValueArray = (valSelect) => {
        let valArr = []
        valSelect.forEach(val => {
            val.valueParam.forEach(vp => {
                valArr.push(vp + " " + val.text)
            });
        })
        return valArr
    }

    const getCols = () => {
        let valueArray = getValueArray(stState.valueSelection)
        let subHeaderLenth = valueArray.length
        let objCols = {}
        // create as many properties as there are rows in the header
        stState.colSelection.forEach((col, i) => {
            if (i < ptState.colsDepth) objCols[col.value] = [new Header({ colSpan: ptState.rowsDepth, className: i === 0 ? "master-header-cell" : undefined })]
        })
        // get values for each header
        ptState.colsArray && ptState.colsArray.forEach((col) => {
            objCols[col.selector] && objCols[col.selector].push(getColHeader(col, ptState.colsDepth, subHeaderLenth, "master-header-cell"))
            // Look for children nodes and get the values
            if (col.children.length > 0 && col.showChildren) getChildren(col, ptState.colsDepth, objCols, subHeaderLenth)
        })
        // add the sub values row
        objCols["Values"] = getSubValues(valueArray)
        // return array with obj values
        return Object.values(objCols)
    }

    const getChildren = (node, rowSpan, objCols, subHeaderLenth) => {
        let accu = rowSpan -= 1
        node.children.forEach((col, i) => {
            // Add the col value
            objCols[col.selector].push(getColHeader(col, accu, subHeaderLenth))
            // add parent at the end of the selection
            if (i === node.children.length - 1) {
                objCols[col.selector].push(
                    new Header({ text: String(node.text), className: "header-reminder", colSpan: subHeaderLenth, rowSpan: accu !== 0 ? accu : 1 }))
            }
            if (col.children.length > 0 && col.showChildren) getChildren(col, accu, objCols, subHeaderLenth)
        })
    }
    const getColHeader = (node, rowSpan, subHeaderLenth, className = "header-cell") => {
        if (node.children.length > 0) {
            if (node.showChildren) {
                return new Header({ text: String(node.text), className: className, colSpan: (node.colSpan + 1) * subHeaderLenth, ico: "FiChevronDown", node: node })
            }
            else {
                return new Header({ text: String(node.text), className: className, rowSpan: rowSpan !== 0 ? rowSpan : 1, colSpan: (node.colSpan + 1) * subHeaderLenth, ico: "FiChevronRight", node: node })
            }
        }
        else {
            return new Header({ text: String(node.text), className: className, rowSpan: rowSpan !== 0 ? rowSpan : 1, colSpan: (node.colSpan + 1) * subHeaderLenth })
        }
    }
    // returns array of selected value to compute
    const getSubValues = (valueArray) => {
        let valArr = valueArray && valueArray.map((v) => {
            return new Header({ text: v, className: "sub-value" })
        })
        let valRow = []
        valRow = ptState.colsArray && ptState.colsArray.flatMap(col => {
            let colVal = []
            for (let i = 0; i <= col.colSpan; i++) {
                for (let v of valArr) { colVal.push(v) }
            }
            return colVal
        })
        valRow.unshift(new Header({ colSpan: ptState.rowsDepth, className: "sub-value" }))
        return valRow
    }
    return (
        <thead>
            {stState.colSelection && stState.colSelection.length > 0 && getCols().map((row, idx) =>
                <PtRow
                    toggleShowChild={toggleShowColChild}
                    key={idx}
                    row={row} />
            )}
        </thead>
    )
}

export default PtHeader
