import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation({
    logout,
    user
}) {

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
                <input name='searchBar' id='searchBar' className={styles.input} type="text" placeholder="Search.." />
            </div>

            <ul className={styles.ul}>
                <li className={styles.userInfo}>
                    <div className={styles.userInfoContainer}>
                        <div className={styles.userImgContainer}>
                            <img className={styles.userImage} src={user.photoURL} alt="userPhoto" />
                        </div>
                        <div className={styles.userDetails}>
                            <p onClick={logout} className={styles.username}>{user.displayName}</p>
                            <p className={styles.email}>{user.email}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    )
}