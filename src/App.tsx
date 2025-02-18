import './App.css'
import { useLastFm } from './contexts/LastFmContext'
import { useNavigate } from 'react-router'

function App() {
  const { form, setForm, loading, error, handleSubmit} = useLastFm()
  const navigate = useNavigate()

  return (
    <>
      <main className='main-wrapper'>
        <h1>Your Scrobble Week🎶</h1>
        <form onSubmit={(e) => handleSubmit(e, navigate)} className='form'>
          <input 
            value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            className='base-input'
            placeholder='Enter your last.fm username'
            type="text" 
          />
          <select
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            className='base-select'
          >
            <option value="">Selecione um período</option>
            <option value="7day">Últimos 7 dias</option>
            <option value="1month">Último mês</option>
            <option value="3month">Últimos 3 meses</option>
            <option value="6month">Últimos 6 meses</option>
            <option value="12month">Último ano</option>
            <option value="overall">Geral</option>
          </select>
          <select
            value={form.limit}
            onChange={(e) => setForm({ ...form, limit: e.target.value })}
            className='base-select'
          >
            <option value="9">3x3</option>
            <option value="16">4x4</option>
            <option value="25">5x5</option>
            <option value="36">6x6</option>
            <option value="49">7x7</option>
            <option value="64">8x8</option>
            <option value="81">9x9</option>
            <option value="100">10x10</option>
          </select>
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            className='base-select'
          >
            <option value="user.gettopalbums">Top Albums</option>
            {/* <option value="user.gettopartists">Top Artists</option>
            <option value="user.gettoptracks">Top Tracks</option> */}
          </select>
          <input className='submit-input' type="submit"/>
        </form>
        {error && <p className='error'>{error}</p>}
        {loading && <p className='loading'>Loading...</p>}
      </main>
      <footer className='footer'>
        <p>Created by <a href="https://github.com/verezeeee" target="_blank" rel="noopener noreferrer">Matheus Henrique</a></p>
      </footer>
    </>
  )
}

export default App
