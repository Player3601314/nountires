import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { useEffect } from "react"
import CounriesInfo from "./pages/CounriesInfo"
import { countryDatas } from "./components/CountryDatas"

function App() {
  const { getData, getAllData } = countryDatas()
  useEffect(() => {
    getData()
    getAllData()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:countryName" element={<CounriesInfo />} />
      </Routes>
    </>
  )
}

export default App
