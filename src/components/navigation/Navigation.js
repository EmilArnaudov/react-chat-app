import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { searchUsersInDb } from '../../services/userService';
import SearchedUsersDropdown from './searchedUsersDropdown/SearchedUsersDropdown';
export default function Navigation({
    logout,
    user,
    db
}) {

    let [foundUsers, setFoundUsers] = useState([]);

    let searchTimeOut;
    const searchUsers = (e) => {
        clearTimeout(searchTimeOut)
        searchTimeOut = setTimeout(async () => {
            if (e.target.value === '') {
                setFoundUsers([]);
                return;
            }

            let users = await searchUsersInDb(db, e.target.value)
            console.log(users);
            setFoundUsers(users);
        }, 500)

    }

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
                <input onChange={searchUsers} name='searchBar' id='searchBar' className={styles.input} type="text" placeholder="Search.." />
                {foundUsers.length > 0 ? <SearchedUsersDropdown users={foundUsers}/> : ''}
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