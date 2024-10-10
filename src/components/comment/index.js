import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import treeToList from '../../utils/tree-to-list';
import './style.css';
import InnerComment from '../inner-comment';
import AddComment from '../add-comment';

function Comment(props) {
  const { name, date, text } = props;
  const cn = bem('Comment');

  // const gap = (props.children.level + 1) * 30

  const arr = treeToList(props.item.children, (item, level) => ({...item, gap: (level + 1)*30}))


  return (
    <div className={cn()} >
      <InnerComment id={props.item._id} 
                    curId={props.item._id} 
                    name={name} 
                    date={date} 
                    text={text} 
                    body={props.item} 
                    send={props.send} 
                    waiting={props.waiting} 
                    session={props.session}
                    commentOpen={props.commentOpen}
                    />
      {props.commentId === props.item._id && <AddComment  id={props.item._id} 
                                                          answer={true} 
                                                          send={props.send} 
                                                          waiting={props.waiting} 
                                                          session={props.session}
                                                          name={name}
                                                          commentCancel={props.commentCancel}
                                                          onSignIn={props.onSignIn}/>
}
      {arr.length > 0 && arr.map(children => (
        <>
          <InnerComment key={children._id} 
                        id={children._id} 
                        name={children.author.profile.name} 
                        date={children.dateCreate} 
                        text={children.text} 
                        body={children} 
                        gap={children.gap} 
                        send={props.send} 
                        waiting={props.waiting} 
                        session={props.session}
                        commentOpen={props.commentOpen}
                        commentCancel={props.commentCancel}
                        />
          {props.commentId === children._id &&  <AddComment id={children._id} 
                                                            answer={true} 
                                                            send={props.send} 
                                                            gap={children.gap} 
                                                            waiting={props.waiting} 
                                                            session={props.session}
                                                            name={children.author.profile.name}
                                                            commentCancel={props.commentCancel}
                                                            onSignIn={props.onSignIn}/>
}
        </>
      ))}


    </div>
  );
}



export default memo(Comment);
