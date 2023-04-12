const  commentFormHandler = async (event) => {

    event.preventDefault();
    
     const  comment_text = document.querySelector('#comment-body').value.trim();
     const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
     if  (comment_text) {
         const  response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
            'Content-Type': 'application/json',
        },
        });
    
         if  (response.ok) {
        document.location.replace('/dashboard');
        }  else  {
        alert('Failed to create comment');
        document.querySelector('#comment-body').style.display = 'block';
        }
    }
    };

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);



// Path: public/js/dashboard.js
