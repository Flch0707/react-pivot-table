import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import PgnCtxProvider from './contexts/PgnCtx'
import PtSetCtxProvider from './contexts/PtSetCtx'
import PtCtxProvider from './contexts/PtCtx'
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
    <PgnCtxProvider>
      <PtSetCtxProvider>
        <PtCtxProvider>
          <Dashboard items={countries} />
        </PtCtxProvider>
      </PtSetCtxProvider>
    </PgnCtxProvider>
  );
}

export default App;
