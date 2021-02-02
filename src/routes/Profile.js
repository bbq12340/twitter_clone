import { authService, dbService } from "myBase";
import React, { useEffect, useState } from "react"; 
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDistplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();   
        history.push("/");
        refreshUser();
    }
    const getMyTweets = async() => {
        const tweets = await dbService
            .collection("tweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
        console.log(tweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyTweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName});
            refreshUser();
            setNewDistplayName("");
        }
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDistplayName(value);
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}/>
            <input type="submit" value="Update Profile"/>
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    ) 
}
export default Profile;