const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav_container">
        <div className="nav_container_text">
          <h1 className="nav_container_text--h1">Where in the world?</h1>
        </div>
        <div id="mode-toggle" className="nav_container_button">
          <div className="nav_container_button--icon">🌙</div>
          <p className="nav_container_button--p">Dark Mode</p>
        </div>
      </div>
    </nav>
  )
}

export default Nav