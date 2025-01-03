import { useEffect, useState } from "react"
import axios from "axios"
import Cycle from "../components/Cycle/Cycle"
import Sidebar, { VIEWS } from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"

const CycleView = () => {
  const [cycles, setCycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Unauthorized: No token found")
        }

        // Replace with your backend API URL
        const response = await axios.get("http://localhost:3000/api/cycles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCycles(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCycles()
  }, [])

  const [view, setView] = useState()
  const [data, setData] = useState({})

  const switchView = (value, d) => {
    setView(value)
    setData(d)
  }

  const renderView = () => {
    switch (view) {
      case VIEWS.CYCLE:
        return <Cycle cycle={data} />
      default:
        return <Day cycle={cycles[0]}></Day>
    }
  }

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Sidebar
      switchView={switchView}
      view={view}
      cycles={cycles}
      loading={loading}
      error={error}
      setCycles={setCycles}
    >
      {renderView()}
    </Sidebar>
  )
}

export default CycleView
