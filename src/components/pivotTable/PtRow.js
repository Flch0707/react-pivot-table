import PtCell from './PtCell'

const PtRow = ({ row, toggleShowChild }) => {
    return (
        <tr>
            {row && row.map((cell, idx) =>
                <PtCell
                    toggleShowChild={toggleShowChild}
                    key={idx}
                    cell={cell} />
            )}
        </tr>
    )
}

export default PtRow
