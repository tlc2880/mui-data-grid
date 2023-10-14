import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="home">
      <p>
        <Link to="/admin">Go to Admin</Link>
      </p>
    </main>
  )
}
export default Home
