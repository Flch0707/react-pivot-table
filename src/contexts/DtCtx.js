import React, { createContext, useState } from 'react';

export const DtCtx = createContext();
const initialState = {
    items: [],
    pageItems: [],
    headings: [],
    nbPages: 1,
    currentPage: 1,
    itemsPerPage: 10
}
const DtCtxProvider = (props) => {
    const [state, setState] = useState(initialState)

    const onloadItems = (itemProp, headingsProp) => {
        const { itemsPerPage, currentPage } = state
        setState({
            ...state,
            items: itemProp,
            headings: getHeadings(itemProp, headingsProp),
            nbPages: getNbPages(itemProp.length, state.itemsPerPage),
            pageItems: [...itemProp.slice((itemsPerPage * (currentPage - 1)), itemsPerPage * currentPage)]
        })
    }
    // Update items displayed when page is changed
    const onPageChange = (PageUp) => {
        const { items, itemsPerPage } = state
        const CurrPage = GetCurrentPage(PageUp)
        setState({
            ...state,
            currentPage: CurrPage,
            pageItems: [...items.slice((itemsPerPage * (CurrPage - 1)), itemsPerPage * CurrPage)]
        })
    }
    // Update amount of items displayed
    const onChangeItemsPerPage = itemsPerPage => {
        const { items } = state
        setState({
            ...state,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            nbPages: getNbPages(state.items.length, itemsPerPage),
            pageItems: [...items.slice(0, itemsPerPage)]
        })
    }
    // Methods
    const getNbPages = (itemsSize, itemsPerPage) => {
        return Math.ceil(itemsSize / itemsPerPage)
    }
    const GetCurrentPage = PageUp => {
        const { currentPage, nbPages } = state
        if (PageUp) {
            return currentPage < nbPages ? currentPage + 1 : currentPage
        } else {
            return currentPage > 1 ? currentPage - 1 : currentPage
        }
    }
    // return the list of headers
    const getHeadings = (items, headings) => {
        const arr = []
        if (headings && headings.length > 0) { return headings }
        else {
            items.forEach((item) => {
                for (const prop in item) {
                    if (!arr.map(i => i && i.value).includes(prop)) {
                        arr.push({ text: prop, value: prop })
                    }
                }
            })
            return getColType(arr, items)
        }
    }

    var filterFloat = function (value) {
        // eslint-disable-next-line no-useless-escape
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }
    // flag headers as number/other
    const getColType = (arr, items) => {
        return arr.map((el) => {
            return {
                ...el,
                colType: items.map(col => {
                    return col[el.value] === undefined ? col[el.value] = 0 : filterFloat(col[el.value])
                }).includes(NaN) ? "string" : "number"
            }
        })
    }
    return (
        <DtCtx.Provider
            value={{
                state,
                onloadItems,
                onPageChange,
                onChangeItemsPerPage
            }}>
            {props.children}
        </DtCtx.Provider>
    );
}

export default DtCtxProvider;