import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { countryDatas } from "../components/CountryDatas"
import Nav from "../components/Nav"
import "../index.css"
import { FaArrowLeftLong } from "react-icons/fa6"

const CounriesInfo = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [oneCountry, setOuneCountry] = useState(null)

  const data = countryDatas((state) => state.data)

  useEffect(() => {
    if (data.length > 0) {
      const one = data.filter(item => item.name === params.countryName)
      setOuneCountry(one.length > 0 ? one[0] : null)
    }
  }, [data, params.countryName])

  console.log(oneCountry)

  return (
    <>
      <header>
        <Nav />
      </header>
      <section className="section">
        <div onClick={() => navigate("/")} className="section_button">
          <FaArrowLeftLong />
          <button className="section_button--button">
            Back
          </button>
        </div>
        {oneCountry ? (
          <div className="section_container">
            <div className="section_container_img">
              <img className="section_container_img--img" src={oneCountry.flag ?? "https://preview.redd.it/the-flag-exists-but-we-dont-know-what-it-looks-like-flag-on-v0-5ilwz1vxv50b1.png?width=640&crop=smart&auto=webp&s=b24df479fdaf0747265c9cf12a20d9cb811c18bb"} alt="" />
            </div>
            <div className="section_container_text">
              <div>
                <h2 className="section_container_text--h2">{oneCountry.name}</h2>
              </div>
              <div className="country_about">
                <div>
                  <h2 className="country_about--h2"></h2>
                  <p className="country_about--p"></p>
                </div>
                <div>
                  <h2 className="country_about--h2"></h2>
                  <p className="country_about--p"></p>
                </div>
                <div>
                  <h2 className="country_about--h2"></h2>
                  <p className="country_about--p"></p>
                </div>
                <div>
                  <h2 className="country_about--h2"></h2>
                  <p className="country_about--p"></p>
                </div>
                <div>
                  <h2 className="country_about--h2"></h2>
                  <p className="country_about--p"></p>
                </div>
              </div>
              <div className="countr_about">
                <h2 className="countr_about--h2">
                  <p className="country_about--p"></p>
                </h2>
                <h2 className="countr_about--h2">
                  <p className="country_about--p"></p>
                </h2>
                <h2 className="countr_about--h2">
                  <p className="country_about--p"></p>
                </h2>
              </div>
            </div>
            <div>
              <h2></h2>
              <div></div>
            </div>
          </div>
        ) : (<>
          not found
        </>)}
      </section>
    </>
  )
}

export default CounriesInfo
