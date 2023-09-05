import React from 'react';
import MyButton from "./UI/Button/MyButton";

const PostItem = (props) => {
    // console.log(props);
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={()=>props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;