import Button from '../Button'
import { useState } from 'react'
import SettingModal from '../pivotSetting/SettingModal'

const PtSetBar = ({ headings }) => {
    const [showModal, setshowModal] = useState(false)

    return (
        <div style={{ textAlign: 'right' }}>
            <Button
                icoName='FiChevronDown'></Button>
            <Button
                onClick={() => setshowModal(!showModal)}
                icoName='FiSettings'></Button>

            {showModal &&
                <SettingModal showModal={() => setshowModal(!showModal)} headings={headings} />
            }
        </div>

    )
}

export default PtSetBar
