import styles from './SearchedUsersDropdown.module.css';
import SearchedUser from './searchedUser/SearchedUser';

export default function SearchedUsersDropdown({
    users
}) {

    if (users.length === 0 ){
        return;
    }

    return (
        <div className={styles.container}>
            <SearchedUser user={users[0]}></SearchedUser>
        </div>
    )
}