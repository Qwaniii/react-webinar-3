import { memo } from 'react';
import './style.css';
import Comment from '../comment';
import AddComment from '../add-comment';


function Comments({ data, count, send, waiting, session, commentId, commentOpen, commentCancel, showForm, id, onSignIn }) {


  return (
    <div className="Comments">
      <div className='Comments-head'>Комментарии ({count ? count : 0})</div>
      {data.map(item => (
          <Comment  key={item._id}  
                    item={item} 
                    name={item.author.profile.name} 
                    date={item.dateCreate} 
                    text={item.text} send={send} 
                    waiting={waiting} 
                    session={session}
                    commentId={commentId}
                    commentOpen={commentOpen}
                    commentCancel={commentCancel}
                    onSignIn={onSignIn}
                    />
      ))}
      {showForm && <AddComment session={session} send={send} waiting={waiting} id={id} onSignIn={onSignIn}/>}
    </div>
  );
}


export default memo(Comments);
