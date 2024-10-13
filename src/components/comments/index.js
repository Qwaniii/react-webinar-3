import { memo } from 'react';
import './style.css';
import Comment from '../comment';
import AddComment from '../add-comment';


function Comments({ data, count, send, waiting, session, commentId, commentOpen, commentCancel, showForm, id, onSignIn, nameSession }) {

  return (
    <div className="Comments">
      <div className='Comments-head'>Комментарии ({count ? count : 0})</div>
      {data.map(item => (
        <div key={item._id}>
          <Comment   
                    item={item}
                    name={item.author.profile.name} 
                    date={item.dateCreate} 
                    text={item.text} 
                    send={send} 
                    commentOpen={commentOpen}
                    gap={item.gap}
                    nameSession={nameSession}
                    />
            {commentId.id === item._id && <AddComment  
                                              id={item._id} 
                                              answer={true} 
                                              send={send} 
                                              waiting={waiting} 
                                              session={session}
                                              name={commentId.name} 
                                              item={item}
                                              gap={commentId.gap}
                                              commentCancel={commentCancel}
                                              onSignIn={onSignIn}/>}
          </div>
      ))}
      {showForm && <AddComment session={session} send={send} waiting={waiting} id={id} onSignIn={onSignIn}
      />}
    </div>
  );
}


export default memo(Comments);
