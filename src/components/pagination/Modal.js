import PropTypes from 'prop-types'
import { PgnCtx } from '../../contexts/PgnCtx'
import { useContext } from 'react'
const Modal = ({ onSelect, onItemPerPageArray }) => {
    const { onChangeItemsPerPage } = useContext(PgnCtx)
    return (
        <ul className='paginat-modal'>
            <h6>Rows per page:</h6>
            {onItemPerPageArray && onItemPerPageArray.map((item) => (
                <li
                    key={item}
                    onClick={() => { onChangeItemsPerPage(item); onSelect() }}>{item}</li>
            ))}
        </ul>
    )
}

Modal.propTypes = {
    onItemPerPageArray: PropTypes.array,
}
export default Modal
