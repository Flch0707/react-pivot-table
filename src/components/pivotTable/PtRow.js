import PtHeadCell from './PtHeadCell'
import PtTableCell from './PtTableCell'

const PtRow = ({ row, toggleShowChild }) => {
    return (
        <tr>
            {row && row.map((cell, idx) =>
                cell.td ?
                    <PtTableCell
                        toggleShowChild={toggleShowChild}
                        key={idx}
                        cell={cell} /> :
                    <PtHeadCell
                        toggleShowChild={toggleShowChild}
                        key={idx}
                        cell={cell} />
            )}
        </tr>
    )
}

export default PtRow
