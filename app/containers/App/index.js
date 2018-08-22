/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import 'primereact/resources/themes/start/theme.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { UserPage, EditUserPage } from 'containers/Core/Users/Loadable';

import classNames from 'classnames';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';


import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppInlineProfile } from './AppInlineProfile';
import './App.css';
import 'layout/layout.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'light',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === 'overlay') {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
        });
      } else if (this.state.layoutMode === 'static') {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
      });

      if (mobileMenuActive)
        this.removeClass(document.body, 'body-overflow-hidden');
      else this.addClass(document.body, 'body-overflow-hidden');
    }

    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
    setTimeout(() => {
      this.layoutMenuScroller.moveBar();
    }, 500);
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = [
      {
        label: 'Dashboard',
        icon: 'fa fa-fw fa-home',
        command: () => {
          window.location = '#/';
        },
      },
      {
        label: 'Menu Modes',
        icon: 'fa fa-fw fa-cog',
        items: [
          {
            label: 'Static Menu',
            icon: 'fa fa-fw fa-bars',
            command: () => this.setState({ layoutMode: 'static' }),
          },
          {
            label: 'Overlay Menu',
            icon: 'fa fa-fw fa-bars',
            command: () => this.setState({ layoutMode: 'overlay' }),
          },
        ],
      },
      {
        label: 'Layout Options',
        icon: 'fa fa-fw fa-diamond',
        items: [
          {
            label: 'Dark',
            icon: 'fa fa-fw fa-bars',
            command: () => this.setState({ layoutColorMode: 'dark' }),
          },
          {
            label: 'Light',
            icon: 'fa fa-fw fa-bars',
            command: () => this.setState({ layoutColorMode: 'light' }),
          },
        ],
      },
      {
        label: 'Components',
        icon: 'fa fa-fw fa-bars',
        badge: '2',
        badgeStyleClass: 'teal-badge',
        items: [
          {
            label: 'Sample Page',
            icon: 'fa fa-fw fa-columns',
            command: () => {
              window.location = '#/sample';
            },
          },
          {
            label: 'Forms',
            icon: 'fa fa-fw fa-code',
            command: () => {
              window.location = '#/forms';
            },
          },
          {
            label: 'Data',
            icon: 'fa fa-fw fa-table',
            command: () => {
              window.location = '#/data';
            },
          },
          {
            label: 'Panels',
            icon: 'fa fa-fw fa-list-alt',
            command: () => {
              window.location = '#/panels';
            },
          },
          {
            label: 'Overlays',
            icon: 'fa fa-fw fa-square',
            command: () => {
              window.location = '#/overlays';
            },
          },
          {
            label: 'Menus',
            icon: 'fa fa-fw fa-minus-square-o',
            command: () => {
              window.location = '#/menus';
            },
          },
          {
            label: 'Messages',
            icon: 'fa fa-fw fa-circle-o-notch',
            command: () => {
              window.location = '#/messages';
            },
          },
          {
            label: 'Charts',
            icon: 'fa fa-fw fa-area-chart',
            command: () => {
              window.location = '#/charts';
            },
          },
          {
            label: 'Misc',
            icon: 'fa fa-fw fa-user-secret',
            command: () => {
              window.location = '#/misc';
            },
          },
        ],
      },
      {
        label: 'Template Pages',
        icon: 'fa fa-fw fa-life-saver',
        items: [
          {
            label: 'Empty Page',
            icon: 'fa fa-fw fa-square-o',
            command: () => {
              window.location = '#/empty';
            },
          },
          {
            label: 'Login',
            icon: 'fa fa-fw fa-sign-in',
            url: 'assets/pages/login.html',
            target: '_blank',
          },
          {
            label: 'Error',
            icon: 'fa fa-fw fa-exclamation-circle',
            url: 'assets/pages/error.html',
            target: '_blank',
          },
          {
            label: '404 Page',
            icon: 'fa fa-fw fa-times',
            url: 'assets/pages/404.html',
            target: '_blank',
          },
          {
            label: 'Access Denied',
            icon: 'fa fa-fw fa-exclamation-triangle',
            url: 'assets/pages/access.html',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Menu Hierarchy',
        icon: 'fa fa-fw fa-sitemap',
        items: [
          {
            label: 'Submenu 1',
            icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in' },
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in' },
                ],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in' },
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in' },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Documentation',
        icon: 'fa fa-fw fa-book',
        command: () => {
          window.location = '#/documentation';
        },
      },
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += ` ${className}`;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else {
      element.className = element.className.replace(
        new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
        ' ',
      );
    }
  }
  isDesktop() {
    return window.innerWidth > 1024;
  }

  render() {
    const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive':
        this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active':
        this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
    });

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <AppTopbar onToggleMenu={this.onToggleMenu} />

        <div
          ref={el => (this.sidebar = el)}
          className={sidebarClassName}
          onClick={this.onSidebarClick}
        >
          <ScrollPanel
            ref={el => (this.layoutMenuScroller = el)}
            style={{ height: '100%' }}
          >
            <div className="layout-sidebar-scroll-content">
              <div className="logo" />
              <AppInlineProfile />
              <AppMenu
                model={this.menu}
                onMenuItemClick={this.onMenuItemClick}
              />
            </div>
          </ScrollPanel>
        </div>

        <div className="layout-main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/User" component={UserPage} />
            <Route exact path="/EditUser" component={EditUserPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>

        <AppFooter />

        <div className="layout-mask" />
      </div>
    );
  }
}

export default App;
