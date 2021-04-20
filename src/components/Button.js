import PropTypes, { func } from 'prop-types'
import { FiPlay, FiX, FiChevronDown, FiChevronUp, FiSettings } from 'react-icons/fi'
import { IconContext } from "react-icons";

const Button = ({ color, text, onClick, icoName }) => {

    return <button onClick={onClick}
        style={{ backgroundColor: color }}
        className='btn'>
        <span>{text}</span>
        <IconContext.Provider value={{ color: "#2D5B72" }}>
            {icoName === 'FiPlay' && <FiPlay />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#ce8080" }}>
            {icoName === 'FiX' && <FiX className='fill-blue' />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#2D5B72" }}>
            {icoName === 'FiChevronDown' && <FiChevronDown className='fill-blue' />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#2D5B72" }}>
            {icoName === 'FiChevronUp' && <FiChevronUp className='fill-blue' />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#2D5B72" }}>
            {icoName === 'FiSettings' && <FiSettings className='fill-blue' />}
        </IconContext.Provider>

    </button>
}
Button.defaultProps = {
    color: '#f2f2f2'
}
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: func
}

export default Button
