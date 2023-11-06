
export const renderComms = (commEl, commentsArr) => {
    const renderComments = () => {
        return (commEl.innerHTML = commentsArr.map((user, i) => {
          return `<li class="comment"data-text="${user.comment}" data-username="${user.name}">
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${user.comment}
            </div>
          </div>
          <div class="comment-footer">
            <button data-index="${i}" class="delete-comment">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${user.like}</span>
              <button data-index="${i}" class="like-button ${user.isLiked ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`
      })
      .join(''));
    }
   
    const deleteCommentButton = () => {
        const deleteComments = document.querySelectorAll('.delete-comment');
      
        for (const deleteComment of deleteComments) {
          deleteComment.addEventListener("click", (event) => {
            event.stopPropagation();
      
            const index = deleteComment.dataset.index;
            comments.splice(index, 1);
            renderComments();
          });
        }
      };
      const initEventListener = () => {
        const likesButton = document.querySelectorAll('.like-button');
      
        for (const likeButtonEl of likesButton) {
      
          likeButtonEl.addEventListener ('click', (event) => {
            event.stopPropagation();
          const index = likeButtonEl.dataset.index;
      
            if (comments[index].isLiked === false) {
              commentsArr[index].isLiked = true;
              commentsArr[index].like++;
            } else {
              commentsArr[index].isLiked = false;
              commentsArr[index].like--;
            }
            //console.log(comments[index].isLiked)
            renderComments();
            replyToComment();
          });
        }
      };

    deleteCommentButton();
    initEventListener();
    renderComments();
}