import { useState, useEffect } from 'react'
import DtCtxProvider from './contexts/DtContext'
import DataTable from "./components/dataTable/DataTable"

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

    const arr = data.map(el => {
      return el.cities.map((city) => {
        let a = { country: el.name, city: city.name, eu: el.eu, ...city }
        delete a.name
        return a
      })
    })
    return arr.flat().slice(1, 15)
  }
  return (
    <DtCtxProvider>
      <div className="App">
        <div className="container">
          <DataTable
            items={countries}
          />
        </div>
      </div>
    </DtCtxProvider>
  );
}

export default App;
