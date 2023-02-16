import styles from "./profile.module.css";

const ProfileLink = (props) => {
    const className =
      props.active === props.name
        ? `${styles.profileLink} ${styles.active}`
        : `${styles.profileLink}`;
    return <li className={className}>{props.name}</li>;
}

export default ProfileLink;