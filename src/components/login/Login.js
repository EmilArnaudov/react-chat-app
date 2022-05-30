import styles from './Login.module.css';

export default function Login({
    signInWithGoogle
}){

    return (
        <div className={styles.login}>
            <p className={styles.heading}>Welcome to ChatMe</p>
            <button className={styles.button} onClick={signInWithGoogle}><i className={["fa-brands", "fa-google", styles.icon].join(' ')}></i>Sign In</button>
        </div>
    )
}