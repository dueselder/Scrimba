import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { handleLikeClick, handleRetweetClick, handleReplyClick, handleTweetBtnClick, handleReplyBtnClick, render } from './handlers.js';

/* Stretch Goal 1: Add the ability to reply to a specific tweet.
- Adding the ability to like a reply.
- Adding the ability to retweet a reply.
- Adding the ability to reply to a reply.
Stretch Goal 2: Save tweets, likes and retweets to local storage.
Stretch Goal 3: Add the ability to delete a tweet.
Stretch Goal 4: Add the ability to edit a tweet.
Stretch Goal 5: Add the ability to upload an image with a tweet.
Stretch Goal 6: Add the ability to add a gif to a tweet.
 */



document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       const isReply = e.target.closest('.tweet-reply') !== null;
       handleLikeClick(e.target.dataset.like, isReply) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    } 
    else if(e.target.dataset.replybtn){
        handleReplyBtnClick(e.target.dataset.replybtn)
    } 
})

export function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                let likeIconClass = '';
                if (reply.isLiked){
                    likeIconClass = 'liked';
                }
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic" />
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots"
                                    data-reply="${reply.uuid}"
                                    ></i>
                                    ${reply.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}"
                                    data-like="${reply.uuid}"
                                    ></i>
                                    ${reply.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                                    data-retweet="${reply.uuid}"
                                    ></i>
                                    ${reply.retweets}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                `
            })
        }
        
          
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="${tweet.isHidden ? 'hidden' : ''}" id="replies-${tweet.uuid}">
                <div class="tweet-reply">
                    <div class="tweet-input-area inner-reply-area">
                        <textarea placeholder="Tweet your reply" class="reply-input" id="reply-${tweet.uuid}"></textarea>
                    </div>
                    <button id="tweet-reply-btn" data-replyBtn="${tweet.uuid}">Reply</button>
                </div>
                ${repliesHtml} 
            </div>  
        </div>
        </div>
        `
   })
   return feedHtml 
}



render()

