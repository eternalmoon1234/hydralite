import React, { ReactElement, useState } from "react";
import FirestoreManager from "~/util/firestoreManager";
import sleep from "~/util/sleep";
import styles from "~/styles/Index.module.scss";
import Icon from "../Icon";
import toast, { Toaster } from "react-hot-toast";

const error = (msg) => toast.error(msg);
const success = () => toast.success("Successfully Waitlisted Email");

const firestoreManager = new FirestoreManager();

const WaitlistCard = () => {
    const [email, setEmail] = useState("");
    const [submitValue, setSubmitValue] =
        useState<ReactElement | string>("Submit");

    async function handleSubmit(e: any) {
        e.preventDefault();
        firestoreManager.validateEmail(email).then((status) => {
            if (status == "Success") {
                firestoreManager.setEmail(email);
                success();
            } else {
                error(status);
            }
        });
    }
    return (
        <div className={styles.waitlistCard}>
            <Toaster />
            <h3>{"What are you waiting for?".toUpperCase()}</h3>
            <h1>Sign Up For The Waitlist!</h1>
            <div className={styles.waitlistCard__textbox}>
                <Icon name="at" />
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder={"email".toUpperCase()}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button
                        type="submit"
                        className={styles.waitlistCard__submit}
                    >
                        {submitValue}
                    </button>
                </form>
            </div>
            <span className={styles.waitlistCard__subText}>
                We promise to never spam you.
            </span>
        </div>
    );
};

export default WaitlistCard;
