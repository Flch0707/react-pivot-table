import React, { createContext, useState } from 'react';
export const PtSetCtx = createContext();
const initialDnD = {
    draggedFrom: null,
    draggedFromPos: null,
    draggedTo: null,
    draggedToPos: null,
    isDragging: false
}
const initialState = {
    colCollection: [],
    rowSelection: [],
    colSelection: [],
    valueSelection: [],
    dragAndDrop: initialDnD
}
const PtSetCtxProvider = props => {
    const [state, setState] = useState(initialState)

    //First Load  
    const onLoadColumns = headings => {
        if (state.colCollection.length === 0 && state.rowSelection.length === 0) {
            setState({
                ...state,
                colCollection: headings.map(heading => { return { ...heading, valueParam: heading.colType === 'string' ? ['COUNT'] : ['SUM'] } })
            })
        }
    }

    //Drag and drop events
    const onDragStart = ev => {
        const initialPosition = Number(ev.currentTarget.dataset.position);
        const initialPlace = ev.currentTarget.getAttribute("for");
        setState({
            ...state,
            dragAndDrop: {
                draggedFrom: initialPlace,
                draggedFromPos: initialPosition,
                draggedTo: null,
                draggedToPos: 0,
                isDragging: true
            }
        })
        ev.target.style.opacity = 0.3;
        ev.dataTransfer.setData("text/html", '')
    }

    const onDragEnter = ev => {
        ev.preventDefault();
        const draggedTo = ev.currentTarget.getAttribute("for");
        setState({
            ...state,
            dragAndDrop: {
                ...state.dragAndDrop,
                draggedTo: draggedTo
            }
        })
    }

    const onDragDrop = (ev) => {
        setState({
            ...state,
            colCollection: getList('colCollection'),
            rowSelection: getList('rowSelection'),
            colSelection: getList('colSelection'),
            valueSelection: getList('valueSelection'),
            dragAndDrop: initialDnD
        })
    }

    const onReorder = ev => {
        ev.preventDefault();
        const draggedToPos = Number(ev.currentTarget.dataset.position)
        setState({
            ...state,
            dragAndDrop: {
                ...state.dragAndDrop,
                draggedToPos: draggedToPos
            }
        })
    }

    const getList = ListName => {
        const { draggedFrom, draggedTo } = state && state.dragAndDrop
        const list = state[ListName]
        if (draggedFrom === ListName && draggedTo === ListName) {
            return UpdateList('MOVE', list)
        }
        if (draggedFrom === ListName) {
            return UpdateList('LESS', list)
        }
        if (draggedTo === ListName) {
            return UpdateList('ADD', list)
        }
        return UpdateList('NONE', list)
    }

    const UpdateList = (action, list) => {
        const { draggedFrom, draggedFromPos, draggedToPos } = state && state.dragAndDrop
        let updList = []
        switch (action) {
            case 'MOVE':
                updList = list.filter((el, i) => i !== draggedFromPos)
                updList.splice(draggedToPos, 0, list[draggedFromPos])
                return updList
            case 'LESS':
                updList = list.filter((el, i) => i !== draggedFromPos)
                return updList
            case 'ADD':
                updList = [...list, state[draggedFrom][draggedFromPos]]
                return updList
            default:
                return list;
        }
    }

    const setValueParam = (col, valueParam) => {
        const arrValueSelection = state.valueSelection.map(vs => {
            return vs.value !== col.value ? vs :
                col.valueParam.includes(valueParam) ? { ...vs, valueParam: col.valueParam.filter(vp => vp !== valueParam) } :
                    { ...vs, valueParam: [...col.valueParam, valueParam] }
        })
        if (col.colType !== 'string')
            setState({
                ...state,
                valueSelection: arrValueSelection
            })
    }

    return (
        <PtSetCtx.Provider
            value={{
                state,
                onLoadColumns,
                onDragStart,
                onDragEnter,
                onReorder,
                onDragDrop,
                setValueParam
            }}>
            {props.children}
        </PtSetCtx.Provider>
    )
}
export default PtSetCtxProvider