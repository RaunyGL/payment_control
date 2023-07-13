function Cabecalho() {
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark" >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <h2>
            <img src="./logo.png" alt="Logo" width="50" height="40"
              className="d-inline-block align-text-top me-3" />
            Payment Control
          </h2>
        </a>
      </div>
    </nav>
  )
}

export default Cabecalho