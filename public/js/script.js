document.addEventListener('DOMContentLoaded', () => {
    // Function to create a new post
    const createPost = async (title, content) => {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    };

    // Event listener for the create post form
    const createPostForm = document.querySelector('#create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.querySelector('#title').value.trim();
            const content = document.querySelector('#content').value.trim();

            if (title && content) {
                createPost(title, content);
            }
        });
    }

    // Function to update a post
    const updatePost = async (title, content, postId) => {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    };

    // Event listener for the edit post form
    const editPostForm = document.querySelector('#edit-post-form');
    if (editPostForm) {
        editPostForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.querySelector('#title').value.trim();
            const content = document.querySelector('#content').value.trim();
            const postId = editPostForm.dataset.postid;

            if (title && content) {
                updatePost(title, content, postId);
            }
        });
    }

    // Function to delete a post
    const deletePost = async (postId) => {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    };

    // Event listener for the delete post button
    const deletePostButton = document.querySelector('#delete-post-button');
    if (deletePostButton) {
        deletePostButton.addEventListener('click', (event) => {
            if (confirm("Are you sure you want to delete post?")) {
                console.log(deletePostButton.dataset)
                const postId = deletePostButton.dataset.postid;
            deletePost(postId);
            }
        });
    }
});
