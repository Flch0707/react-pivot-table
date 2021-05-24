import { FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { useState, useEffect, useRef, useContext } from 'react'
import { PgnCtx } from '../../contexts/PgnCtx'
import Modal from './Modal'
const Pagination = ({ itemLength }) => {
    const { onPageChange, onInit, state } = useContext(PgnCtx)
    const [showModal, setshowModal] = useState(false)
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setshowModal(false);
        }
    };
    useEffect(() => {
        onInit(itemLength)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemLength])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [showModal]);

    return (
        <div className='pagination'>
            <FiChevronLeft
                onClick={() => onPageChange(false)}
                className={state.currentPage === 1 ? "paginat-arrows-disable" : "paginat-arrows-active"} />
            <div ref={ref} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <span >{state.currentPage}</span>
                <span style={{ fontSize: '0.7rem', marginTop: '0.2rem', marginLeft: '0.1rem' }}>/{state.nbPages}</span>
                <FiChevronDown
                    onClick={() => setshowModal(!showModal)}
                    className="paginat-arrows-down" />
                {showModal &&
                    <Modal
                        onItemPerPageArray={[1, 10, 30]}
                        onSelect={() => setshowModal(!showModal)}
                    />}
            </div>
            <FiChevronRight
                onClick={() => onPageChange(true)}
                className={state.currentPage === state.nbPages ? "paginat-arrows-disable" : "paginat-arrows-active"} />
        </div>
    )
}
export default Pagination