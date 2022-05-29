import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <div className={styles.logoContainer}>
                <img className={styles.logoImg} src="/chat.png" alt="" />
                <NavLink className={styles.link} to='/'><span className={styles.chat}>Chat<span className={styles.me}>Me</span></span></NavLink>
            </div>
            
            <div className={styles.searchBar}>
                <label htmlFor ="searchBar">
                    <i className={[styles.searchIcon, 'fa-solid', 'fa-magnifying-glass'].join(' ')}></i>
                </label>
                <input name='searchBar' id='searchBar' className={styles.input} type="text" />
            </div>

            <ul className={styles.ul}>
                <li className={styles.userInfo}>
                    <div className={styles.userInfoContainer}>
                        <div className={styles.userImgContainer}>
                            <img className={styles.userImage} src="https://c8.alamy.com/comp/MHJ5HN/mascot-icon-illustration-of-head-of-a-black-wizard-sorcerer-or-magician-a-practitioner-of-magic-and-witchcraft-wearing-a-pointed-hat-viewed-from-fro-MHJ5HN.jpg" alt="" />
                        </div>
                        <div className={styles.userDetails}>
                            <p className={styles.username}>Askkattor</p>
                            <p className={styles.email}>email@email.yahoo</p>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    )
}