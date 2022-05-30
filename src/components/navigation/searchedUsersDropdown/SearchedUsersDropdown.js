import styles from './SearchedUsersDropdown.module.css';
import SearchedUser from './searchedUser/SearchedUser';

export default function SearchedUsersDropdown({
    users,
    startChatWithUser,
    userSelected
}) {

    if (users.length === 0 ){
        return;
    }

    return (
        <div className={styles.container}>
            {users.map(user => <SearchedUser key={user.email} userSelected={userSelected} startChatWithUser={startChatWithUser} user={user}></SearchedUser>)}

        </div>
    )
}