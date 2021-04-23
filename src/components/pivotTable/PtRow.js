import PtCell from './PtCell'

const PtRow = ({ row }) => {
    return (
        <tr>
            {row && row.map((cell, idx) =>
                <PtCell
                    key={idx}
                    cell={cell} />
            )}
        </tr>
    )
}

export default PtRow
