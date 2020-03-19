import React from "react"


const Comment=(props)=>(
    <div>
        {props.comment.content} by <a>{props.comment.user.username}</a>
    </div>
)

export default Comment 