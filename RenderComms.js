
export const renderComms = ({commEl, commentsArr, replyToComment, initEventListener, deleteCommentButton}) => {
    const htmlLikes = commentsArr.map((user, i) => {
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
      .join('');
      commEl.innerHTML = htmlLikes;
      deleteCommentButton();
      initEventListener();
      replyToComment();
    }
   