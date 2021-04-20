import { useContext } from 'react'
import { DtCtx } from '../../contexts/DtCtx'

const Headers = () => {
    const { state } = useContext(DtCtx)
    return (
        <thead>
            <tr>
                {state.headings && state.headings.map((heading) =>
                    <th key={heading.value} >{heading.text}</th>
                )}
            </tr>
        </thead>
    )
}

export default Headers
