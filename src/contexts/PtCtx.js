import React, { createContext, useState } from 'react';

export const PtCtx = createContext();
const initialState = {
    colsArray: [],
    colsDepth: 1,
    rowsArray: [],
    rowsDepth: 1,
    valueSelection: []
}

const PtCtxProvider = props => {
    const [state, setState] = useState(initialState)

    const onloadItems = (items, stState) => {
        let cols = getColTree(items, stState.colSelection)
        setState({
            ...state,
            valueSelection: stState.valueSelection,
            colsArray: cols,
            rowsArray: getRowTree(items, stState.rowSelection, stState.valueSelection,),
        })
    }

    const getRowTree = (items, grpSelect, valSelect) => {
        let headers = []
        getFiltersList(state.colsArray, headers)
        let tree = []
        if (grpSelect.length > 0) {
            const parentUniq = [...new Set(items.map(el => el[grpSelect[0].value]))]
            tree = parentUniq.map((p, ancestorIndex) => {
                let grp = grpSelect[0].value
                let source = items.filter(it => it[grp] === p ? it : "")
                let parent = {
                    id: String(grpSelect[0].value + p + (Math.round(Math.random() * 100000))),
                    source: source,
                    colSpan: 0,
                    rowSpan: 0,
                    text: p,
                    data: getData(source, headers),
                    ancestor: ancestorIndex,
                    children: [],
                    showChildren: false
                }
                if (grpSelect.length > 1) getRowChildren(source, 1, grpSelect, parent, valSelect, ancestorIndex, headers)
                return parent
            })
        }
        return tree
    }
    const getRowChildren = (source, grpCurIdx, grpSelect, parent, valSelect, ancestorIndex, headers) => {
        let grp = grpSelect[grpCurIdx].value
        let childUniq = [...new Set(source.map(el => el[grp]))]
        let children = childUniq.map(cu => {
            let sourceChildren = source.filter(it => it[grp] === cu ? it : "")
            let obj = {
                id: String(grp + cu + (Math.round(Math.random() * 100000))),
                source: sourceChildren,
                colSpan: 0,
                rowSpan: 0,
                text: cu,
                data: getData(sourceChildren, headers),
                ancestor: ancestorIndex,
                parent: null,
                children: [],
                showChildren: false
            }
            if (grpCurIdx < grpSelect.length - 1) {
                getRowChildren(sourceChildren, grpCurIdx + 1, grpSelect, obj, valSelect, ancestorIndex)
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
                    parent: null,
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
                parent: parent.id,
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

    const getFiltersList = (nodes, arr, ancestor = null) => {
        nodes.forEach(node => {
            if (node.children.length > 0 && node.showChildren) {
                getFiltersList(node.children, arr, node.ancestor)
            }
            let head = [{ id: node.id, text: node.text, selector: node.selector, parent: node.parent, ancestor: ancestor }]
            if (node.parent !== null) {
                getFiltersValues(state.colsArray[ancestor], node.parent, head)
            }
            arr.push(head)
        })
    }

    const getFiltersValues = (nodes, parent, head) => {
        if (nodes.id === parent) {
            head.unshift({ text: nodes.text, selector: nodes.selector })
        }
        else {
            for (let node of nodes.children) {
                if (node.id === parent) {
                    head.unshift({ text: node.text, selector: node.selector })
                    if (node.parent !== null) {
                        getFiltersValues(state.colsArray[node.ancestor], node.parent, head)
                    }
                }
            }
        }
    }

    const updateValues = (items) => {
        let headers = []
        getFiltersList(items, headers)
        state.rowsArray.forEach(row => {
            row.data = getData(row.source, headers)
        })
    }

    const getData = (items, headers) => {
        return state.valueSelection && state.valueSelection.length > 0 ?
            getDataWithValue(items, state.valueSelection, headers) :
            getDataWithoutValue(items, headers)
    }

    const getDataWithValue = (items, valSelect, headers) => {
        let tot = []
        if (state.colsArray && state.colsArray.length > 0) {
            tot = headers.map(cols => {
                let reduceArr = items
                let filtItems
                for (let col of cols) {
                    filtItems = reduceArr.filter(item => {
                        return item[col.selector] === col.text
                    })
                    reduceArr = filtItems
                }
                return computeValues(filtItems, valSelect)
            })
        }
        else {
            tot = computeValues(items, valSelect)
        }
        return tot.flat()
    }

    const getDataWithoutValue = (items) => {
        if (state.colsArray && state.colsArray.length === 0) {
            return [{ value: items.length }]
        }
        else {
            return state.colsArray.map(val => {
                return {
                    value: items.filter(item => item[val.selector] === val.text).length
                }
            })
        }
    }
    const round = (num) => {
        return +(Math.round(num + "e+2") + "e-2");
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
                        return { value: round(resSum) }
                    case "AVG":
                        let filteredArrayAvg = items.map(item => item[val.text])
                        let resAvg = filteredArrayAvg.length > 0 ? filteredArrayAvg.reduce((a, b) => a += b) / filteredArrayAvg.length : 0
                        // return { value: resAvg }
                        return { value: round(resAvg) }
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
        updateValues(state.colsArray)
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
