const NewBlogForm = ({
    handleTitleChange,
    handleUrlChange, 
    handleAuthorChange, 
    addBlog, 
    newTitle, 
    newAuthor, 
    newUrl, 
    setNewBlogFormVisible
  }) => {
  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit" >create</button>
    </form>
  )

}

export default NewBlogForm