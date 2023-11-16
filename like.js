import { renderComms } from "./renderComments.js";

export const likeEventButton = ({ comments }) => {
    const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) =>{
      event.stopPropagation();
      const index = likeButton.dataset.index;

    if (index !== null) {
      const comment = comments[index];
      if (!comment.isLiked) {
        comment.isLiked = true;
        comment.likes++;
      } else {
        comment.isLiked = false;
        comment.likes--;
      }
      
      renderComms({ comments }); 
      }
    });  
  }
}

//export const deleteCommentButton = () => {
//    const deleteComments = document.querySelectorAll('.delete-comment');
//  
//    for (const deleteComment of deleteComments) {
//      deleteComment.addEventListener("click", (event) => {
//        event.stopPropagation();
//  
//        const index = deleteComment.dataset.index;
//        comments.splice(index, 1);
//        
//      });
//      renderComms({ comments });
//    }
//  };