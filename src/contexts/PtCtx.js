import React, { createContext, useState } from 'react';

export const PtCtx = createContext();
const initialState = {
    colsArray: [],
    colsDepth: 1,
    rowsArray: [],
    rowsDepth: 1,
    valueArray: []
}

const PtCtxProvider = props => {
    const [state, setState] = useState(initialState)

    const onloadItems = (items, stState) => {
        let valueArray = getValueArray(stState.valueSelection)
        let cols = getColTree(items, stState.colSelection)
        setState({
            ...state,
            valueArray: valueArray,
            colsArray: cols,
            rowsArray: getRowTree(items, stState.rowSelection, stState.valueSelection, true),
        })
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
    const getRowTree = (items, grpSelect, valSelect) => {
        let tree = []
        if (grpSelect.length > 0) {
            const parentUniq = [...new Set(items.map(el => el[grpSelect[0].value]))]
            tree = parentUniq.map((p, ancestorIndex) => {
                let data = items.filter(it => it[grpSelect[0].value] === p ? it : "")
                let rowValues = getData(data, valSelect)
                let parent = {
                    id: String(grpSelect[0].value + p + (Math.round(Math.random() * 100000))),
                    colSpan: 0,
                    rowSpan: 0,
                    text: p,
                    ancestor: ancestorIndex,
                    data: rowValues,
                    children: [],
                    showChildren: false
                }
                if (grpSelect.length > 1) getRowChildren(data, 1, grpSelect, parent, valSelect, ancestorIndex)
                return parent
            })
        }
        return tree
    }
    const getRowChildren = (data, grpCurIdx, grpSelect, parent, valSelect, ancestorIndex) => {
        let grp = grpSelect[grpCurIdx].value
        let childUniq = [...new Set(data.map(el => el[grp]))]
        let children = childUniq.map(cu => {
            let dataChildren = data.filter(it => it[grp] === cu ? it : "")
            let rowValues = getData(dataChildren, valSelect)
            console.log(rowValues)
            let obj = {
                id: String(grp + cu + (Math.round(Math.random() * 100000))),
                colSpan: 0,
                rowSpan: 0,
                text: cu,
                ancestor: ancestorIndex,
                data: rowValues,
                children: [],
                showChildren: false
            }
            if (grpCurIdx < grpSelect.length - 1) {
                getRowChildren(dataChildren, grpCurIdx + 1, grpSelect, obj, valSelect, ancestorIndex)
            }
            return obj
        })
        parent.children = children
    }

    const getColTree = (items, grpSelect) => {
        let tree = []
        if (grpSelect.length > 0) {
            const parentUniq = [...new Set(items.map(el => el[grpSelect[0].value]))]
            tree = parentUniq.map((p, ancestorIndex) => {
                let data = items.filter(it => it[grpSelect[0].value] === p ? it : "")
                let parent = {
                    id: String(grpSelect[0].value + p + (Math.round(Math.random() * 100000))),
                    text: p,
                    selector: grpSelect[0].value,
                    ancestor: ancestorIndex,
                    children: [],
                    showChildren: false,
                    colSpan: 0,
                    rowSpan: 0
                }
                if (grpSelect.length > 1) getColChildren(data, 1, grpSelect, parent, ancestorIndex)
                return parent
            })
        }
        return tree
    }
    const getColChildren = (data, grpCurIdx, grpSelect, parent, ancestorIndex) => {
        let grp = grpSelect[grpCurIdx].value
        let childUniq = [...new Set(data.map(el => el[grp]))]
        let children = childUniq.map(cu => {
            let dataChildren = data.filter(it => it[grp] === cu ? it : "")
            let obj = {
                id: String(grp + cu + (Math.round(Math.random() * 100000))),
                text: cu,
                selector: grp,
                ancestor: ancestorIndex,
                children: [],
                showChildren: false,
                colSpan: 0,
                rowSpan: 0
            }
            if (grpCurIdx < grpSelect.length - 1) {
                getColChildren(dataChildren, grpCurIdx + 1, grpSelect, obj, ancestorIndex)
            }
            return obj
        })
        parent.children = children
    }

    const getData = (items, valSelect = []) => {
        return valSelect && valSelect.length > 0 ?
            getDataWithValue(items, valSelect) :
            getDataWithoutValue(items)
    }

    const getDataWithoutValue = (items) => {
        if (state.colsArray && state.colsArray.length === 0) {
            return [{ value: items.length }]
        }
        else {
            return state.colsArray.map(val => {
                // console.log("a", items, val)
                // getDataRow(items,val)
                // if (val.children.length >0) getDataRow(items,val)
                return {
                    value: items.filter(item => item[val.selector] === val.text).length
                }
            })
        }
    }

    // const getDataRow = (items, val) => {
    //     return {
    //         value: items.filter(item => item[val.selector] === val.text).length
    //     }
    // }

    const getDataWithValue = (items, valSelect) => {
        let res = []
        if (state.colsArray && state.colsArray.length > 0) {
            res = state.colsArray.map(col => {
                let filtItems = items.filter(item => item[col.selector] === col.text)
                return computeValues(filtItems, valSelect)
            })
        }
        else {
            res = computeValues(items, valSelect)
        }
        return res.flat()
    }

    const computeValues = (items, valSelect) => {
        let arr = valSelect.map(val => {
            return val.valueParam.map(par => {
                switch (par) {
                    case "COUNT":
                        return { value: items.map(item => item[val.text]).length }
                    case "SUM":
                        let filteredArraySum = items.map(item => item[val.text])
                        let resSum = filteredArraySum.length > 0 ? filteredArraySum.reduce((a, b) => a += b) : 0
                        return { value: resSum }
                    case "AVG":
                        let filteredArrayAvg = items.map(item => item[val.text])
                        let resAvg = filteredArrayAvg.length > 0 ? filteredArrayAvg.reduce((a, b) => a += b) / filteredArrayAvg.length : 0
                        return { value: resAvg }
                    default:
                        return { value: "toto" }
                }
            });
        })
        return arr.flat()
    }

    // ROWS MANAGEMENT
    const toggleShowRowsChild = (id, ancestorIndex) => {
        getColSpan(id, state.rowsArray[ancestorIndex])
        getRowSpan(state.rowsArray[ancestorIndex])
        setState({
            ...state,
            rowsDepth: getMaxColSpan() + 1,
        })

    }
    const getColSpan = (id, node) => {
        if (node.id === id) {
            node.showChildren = !node.showChildren
            node.rowSpan = 0
        }
        node.showChildren ? node.colSpan = 1 : node.colSpan = 0
        for (const child of node.children) {
            let nodeDepth = getColSpan(id, child)
            if (node.showChildren && child.colSpan) {
                node.colSpan += nodeDepth
            }
        }
        return node.colSpan
    }

    const getRowSpan = (node) => {
        node.rowSpan = node.showChildren ? node.children.length : 0
        for (const child of node.children) {
            let nodeLength = getRowSpan(child)
            node.rowSpan += nodeLength
        }
        return node.rowSpan
    }
    const getMaxColSpan = () => {
        return state.rowsArray.length > 0 ? Math.max(...state.rowsArray.map(el => el.colSpan)) : 1
    }

    // HEADINGS MANAGEMENT
    const toggleShowColChild = (id, ancestorIndex) => {
        getColsDepth(id, state.colsArray[ancestorIndex])
        getColsLength(state.colsArray[ancestorIndex])
        setState({
            ...state,
            colsDepth: getMaxColsDepth() + 1,
        })
    }
    const getColsLength = (node) => {
        node.colSpan = node.showChildren ? node.children.length : 0
        for (const child of node.children) {
            let nodeLength = getColsLength(child)
            node.colSpan += nodeLength
        }
        return node.colSpan
    }
    const getColsDepth = (id = null, node) => {
        if (node.id === id) {
            node.showChildren = !node.showChildren
            node.rowSpan = 0
        }
        node.showChildren ? node.rowSpan = 1 : node.rowSpan = 0
        for (const child of node.children) {
            let nodeDepth = getColsDepth(id, child)
            if (node.showChildren && child.rowSpan) {
                node.rowSpan += nodeDepth
            }
        }
        return node.rowSpan
    }

    const getMaxColsDepth = () => {
        return state.colsArray.length > 0 ? Math.max(...state.colsArray.map(el => el.rowSpan)) : 1
    }

    return (
        <PtCtx.Provider
            value={{
                state,
                onloadItems,
                toggleShowRowsChild,
                toggleShowColChild
            }}>
            {props.children}
        </PtCtx.Provider>
    );
}

export default PtCtxProvider
