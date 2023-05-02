async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];

    const response = await fetch(`/api/blog/${blog_id}`, {
      method: 'DELETE'
    });

    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-blog-form').addEventListener('click', deleteFormHandler);