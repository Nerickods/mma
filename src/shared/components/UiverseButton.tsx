import React from 'react';
import styles from './UiverseButton.module.css';

interface UiverseButtonProps {
    text: string;
    onClick?: () => void;
}

const UiverseButton: React.FC<UiverseButtonProps> = ({ text, onClick }) => {
    return (
        <div className={styles.btnWrapper} onClick={onClick}>
            <button className={styles.btn} type="button">
                <span className={styles.btnTxt}>{text}</span>
            </button>
            <div className={`${styles.dot} ${styles.pulse}`}></div>
        </div>
    );
};

export default UiverseButton;
