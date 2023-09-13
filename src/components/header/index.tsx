import { Link } from 'react-router-dom'
import styles from './header.module.css'

export function Header() {
    return(
   <header className={styles.container}>
    <div>
    <Link to="/"/>
    <h1> Cabeçalho</h1>
    </div>
    </header>
    )
}