import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/paper-dashboard.scss';
import './assets/css/themify-icons.css';
import './assets/css/common.css';

function App() {
  return (
    <div className="wrapper">
      <div className="notifications-wrapper"></div>
      <div
        data-background-color="black"
        data-active-color="success"
        className="sidebar"
      >
        <div id="style-3" className="sidebar-wrapper">
          <div className="logo">
            <a href="#" className="simple-text">
              <div className="logo-img">
                <img
                  src="/vue-paper-dashboard/img/vue-logo.c2a605fb.png"
                  alt=""
                />
                >
              </div>
              Paper Dashboard
            </a>
          </div>
          <ul className="nav navbar-nav nav-mobile-menu">
            <li className="nav-item">
              <a className="nav-link">
                <i className="ti-panel"></i>
                <p>Stats</p>
              </a>
            </li>
            <li className="dropdown nav-item">
              <a
                data-toggle="dropdown"
                className="dropdown-toggle btn-rotate nav-link"
              >
                <i className="ti-bell"></i>
                <span className="notification">
                  5 Notifications
                  <b className="caret"></b>
                </span>
              </a>
              <ul className="dropdown-menu">
                <a className="dropdown-item">Notification 1</a>
                <a className="dropdown-item">Notification 2</a>
                <a className="dropdown-item">Notification 3</a>
                <a className="dropdown-item">Notification 4</a>
                <a className="dropdown-item">Another notification</a>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="ti-settings"></i>
                <p>Settings</p>
              </a>
            </li>
            <li className="divider"></li>
          </ul>
          <ul className="nav">
            <li className="nav-item router-link-exact-active active">
              <a href="#/dashboard" className="nav-link">
                <i className="ti-panel"></i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#/stats" className="nav-link">
                <i className="ti-user"></i>
                <p>User Profile</p>
              </a>
            </li>
          </ul>
          <div className="moving-arrow" ></div>
        </div>
      </div>
      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a href="#" className="navbar-brand">
              Dashboard
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              className="navbar-toggler navbar-burger"
            >
              <span className="navbar-toggler-bar"></span>
              <span className="navbar-toggler-bar"></span>
              <span className="navbar-toggler-bar"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="ti-panel"></i>
                    <p>Stats</p>
                  </a>
                </li>
                <li className="dropdown nav-item">
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle btn-rotate nav-link"
                  >
                    <i className="ti-bell"></i>
                    <span className="notification">
                      5 Notifications
                      <b className="caret"></b>
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      Notification 1
                    </a>
                    <a href="#" className="dropdown-item">
                      Notification 2
                    </a>
                    <a href="#" className="dropdown-item">
                      Notification 3
                    </a>
                    <a href="#" className="dropdown-item">
                      Notification 4
                    </a>
                    <a href="#" className="dropdown-item">
                      Another notification
                    </a>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="ti-settings"></i>
                    <p>Settings</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="content">
          <div className="container-fluid">
            <div>
              <div className="row"></div>
            </div>
          </div>
        </div>
        {/* <footer className="footer">
          <div className="container-fluid d-flex flex-wrap justify-content-between">
            <nav>
              <ul>
                <li>
                  <a href="#/admin" className="">
                    Dashboard
                  </a>
                </li>
              </ul>
            </nav>
            <div className="copyright d-flex flex-wrap">
              © Coded with
              <i className="fa fa-heart heart"></i> by
              <a href="https://github.com/cristijora" target="_blank">
                {' '}
                &nbsp; Cristi Jora.
              </a>
              &nbsp; Designed by{' '}
              <a
                href="https://www.creative-tim.com/?ref=pdf-vuejs"
                target="_blank"
              >
                &nbsp; Creative Tim.
              </a>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
