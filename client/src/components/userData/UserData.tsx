import React from 'react';
import styles from './UserData.module.scss';
import useUserStore from '../../stores/userStore';
import { FaCubes, FaHeart, FaCircleCheck, FaBookmark } from 'react-icons/fa6';

interface IProps {
    tests: number,
    followers: number,
    followings: number,
    likes: number,
    savedPosts?: number,
    likedPosts?: number,
    passedPosts?: number,
    id?: string,
    setState: (val: string) => void,
    state: string,
}

export default function UserData({ tests, followers, followings, likes, savedPosts, likedPosts, passedPosts, setState, state, id }: IProps) {
    const getLikedPosts = useUserStore(state => state.getLikedPosts);
    const getSavedPosts = useUserStore(state => state.getSavedPosts);
    const getUserPosts = useUserStore(state => state.getUserPosts);
    const getFollowers = useUserStore(state => state.getFollowers);
    const getFollowings = useUserStore(state => state.getFollowings);
    const getPassedPosts = useUserStore(state => state.getPassedPosts);

    function handleSetTests() {
        setState('Tests');
        if (id) {
            getUserPosts(id);
        }
    }

    function handleSetSaves() {
        setState('Saves');
        getSavedPosts();
    }

    function handleSetLikes() {
        setState('Likes');
        if (id) {
            getLikedPosts(id);
        } else {
            getLikedPosts();
        }
    }

    function handleSetFollowers() {
        setState('Followers');
        if (id) {
            getFollowers(id);
        } else {
            getFollowers();
        }
    }

    function handleSetFollowings() {
        setState('Followings');
        if (id) {
            getFollowings(id);
        } else {
            getFollowings();
        }
    }

    function handleSetPassed() {
        setState('Passed');
        if (id) {
            getPassedPosts(id);
        } else {
            getPassedPosts();
        }
    }

    return (
        <div className={styles.stats}>
            <div className={styles.firstLine}>
                <div className={styles.firstLineItem}>
                    <span className={styles.number}>{likes}</span><br />Likes
                </div>
                <div className={styles.firstLineItem} onClick={() => handleSetFollowers()}>
                <span className={styles.number}>{followers}</span> <br />Followers
                </div>
                <div className={styles.firstLineItem} onClick={() => handleSetFollowings()}>
                <span className={styles.number}>{followings}</span> <br />Followings
                </div>
                <div className={styles.firstLineItem} onClick={() => handleSetTests()}>
                <span className={styles.number}>{tests}</span> <br />Posts
                </div>
            </div>

            <div className={styles.secondLine}>
                <div className={state === 'Tests' ? `${styles.secondLineItem} ${styles.active}` : styles.secondLineItem} onClick={() => handleSetTests()}>
                    <FaCubes />
                </div>
                {Number(likedPosts) >= 0 &&
                    <div onClick={() => handleSetLikes()}
                        className={state === 'Likes' ? `${styles.secondLineItem} ${styles.active}` : styles.secondLineItem}
                    >
                        <FaHeart />
                    </div>}
                {Number(passedPosts) >= 0 &&
                    <div onClick={() => handleSetPassed()}
                        className={state === 'Passed' ? `${styles.secondLineItem} ${styles.active}` : styles.secondLineItem}
                    >
                        <FaCircleCheck />
                    </div>}
                {Number(savedPosts) >= 0 &&
                    <div onClick={() => handleSetSaves()}
                        className={state === 'Saves' ? `${styles.secondLineItem} ${styles.active}` : styles.secondLineItem}
                    >
                        <FaBookmark />
                    </div>}
            </div>

        </div>
    );
}