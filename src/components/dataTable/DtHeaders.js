const Headers = ({ headings }) => {
    return (
        <thead>
            <tr>
                {headings && headings.map((heading) =>
                    <th key={heading.value} >{heading.text}</th>
                )}
            </tr>
        </thead>
    )
}

export default Headers
