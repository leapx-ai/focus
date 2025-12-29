import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext';

render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById('app')
)
