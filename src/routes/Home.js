import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [dbTweets, setDbTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    
    
    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setDbTweets(tweetsArray);
        });
    },[]);
    const onSubmit = async(event) => {
        event.preventDefault();
        // if there is photo -> upload photo -> save url into the tweet
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setTweet(value);
    };
    const onFileChange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment();
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on yur mind?" maxLength={120} onChange={onChange} value={tweet}/>
                <input type="file" accept="image/*" onChange={onFileChange} value={attachment}/>
                <input type="submit" value="tweet!"/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {dbTweets.map((dbTweet) => (
                    <Tweet key={dbTweet.id} tweetObj={dbTweet} isOwner={dbTweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;