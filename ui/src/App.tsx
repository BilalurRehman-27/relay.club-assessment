import Checkout from './components/Checkout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="App">
            <Checkout />
            <ToastContainer />
        </div>
    )
}

export default App
