import { useState, useEffect } from 'react'
import DtCtxProvider from './contexts/DtCtx'
import PtSetCtxProvider from './contexts/PtSetCtx'
import PtCtxProvider from './contexts/PtCtx'
import Dt from "./components/dataTable/Dt"
import Pt from './components/pivotTable/Pt'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getCountries = async () => {
      const ItemsFromServer = await fetchCountries()
      setCountries(ItemsFromServer)
    }
    getCountries()
  }, [])

  const fetchCountries = async () => {
    const res = await fetch('http://localhost:5000/countries')
    const data = await res.json()
    return data.slice(0, 10)
  }
  return (
    <DtCtxProvider>
      <PtSetCtxProvider>
        <PtCtxProvider>
          <div className="App">
            <div className="container">
              <Dt
                items={countries}
              />
              <Pt />
            </div>
          </div>
        </PtCtxProvider>
      </PtSetCtxProvider>
    </DtCtxProvider>
  );
}

export default App;
