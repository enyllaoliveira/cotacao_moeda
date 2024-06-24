import { Link } from 'react-router-dom'
import styles from './header.module.css'

export function Header() {
    return(
   <header className={styles.container}>
    <div>
    <Link to="/" className={styles.noUnderline}>
    <h1 className={styles.title}> Página inicial </h1>
   
    <h2> Criptomoedas</h2>
    </Link>
    </div>
    </header>
    )
}