import React, { createContext, useState } from 'react';

export const PgnCtx = createContext();
const initialState = {
    itemLength: 0,
    nbPages: 1,
    currentPage: 1,
    itemsPerPage: 10
}
const PgnCtxProvider = (props) => {
    const [state, setState] = useState(initialState)

    const onInit = (itemLength) => {
        setState({
            ...state,
            itemLength: itemLength,
            nbPages: getNbPages(itemLength, state.itemsPerPage),
        })
    }
    // Update items displayed when page is changed
    const onPageChange = (PageUp) => {
        const CurrPage = GetCurrentPage(PageUp)
        setState({
            ...state,
            currentPage: CurrPage,
        })
    }
    // Update amount of items displayed
    const onChangeItemsPerPage = itemsPerPage => {
        setState({
            ...state,
            itemsPerPage: itemsPerPage,
            currentPage: 1,
            nbPages: getNbPages(state.itemLength, itemsPerPage),
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


    return (
        <PgnCtx.Provider
            value={{
                state,
                onInit,
                onPageChange,
                onChangeItemsPerPage
            }}>
            {props.children}
        </PgnCtx.Provider>
    );
}

export default PgnCtxProvider;