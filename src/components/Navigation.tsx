import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form, InputGroup, Badge, Dropdown, Offcanvas, Button } from 'react-bootstrap';
import { Bell, Settings, BookmarkCheck, Home, Search, User } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

export function Navigation() {
  const location = useLocation();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/watchlist', label: 'Watchlist', icon: BookmarkCheck },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Navbar 
        bg="primary" 
        variant="dark" 
        expand="lg" 
        className="shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="d-flex align-items-center gap-2"
            aria-label="AI NewsAlert - Go to dashboard"
          >
            <div 
              className="bg-white text-primary rounded d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px' }}
              aria-hidden="true"
            >
              <span className="fw-bold small">AI</span>
            </div>
            <span className="fw-semibold">NewsAlert</span>
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Nav className="me-auto d-none d-lg-flex" role="menubar">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Nav.Link
                  key={item.href}
                  as={Link}
                  to={item.href}
                  className={`d-flex align-items-center gap-2 px-3 py-2 rounded me-2 ${
                    isActive(item.href) ? 'bg-white text-primary' : 'text-white'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  role="menuitem"
                >
                  <IconComponent size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                </Nav.Link>
              );
            })}
          </Nav>

          {/* Search Bar */}
          <Form className="d-none d-lg-flex me-3" style={{ maxWidth: '400px', width: '100%' }}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={16} className="text-muted" aria-hidden="true" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search news, sources, keywords..."
                className="border-start-0"
                aria-label="Search news articles"
              />
            </InputGroup>
          </Form>

          {/* Right Side Actions */}
          <div className="d-flex align-items-center gap-2">
            {/* Notifications */}
            <Button
              variant="outline-light"
              size="sm"
              className="position-relative"
              onClick={() => setNotificationOpen(true)}
              aria-label="Open notifications, 3 unread messages"
            >
              <Bell size={16} aria-hidden="true" />
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.6rem' }}
              >
                3
                <span className="visually-hidden">unread notifications</span>
              </Badge>
            </Button>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="outline-light" 
                size="sm" 
                className="d-flex align-items-center gap-2"
                aria-label="Open user menu"
              >
                <div 
                  className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '24px', height: '24px' }}
                  aria-hidden="true"
                >
                  <span className="small fw-bold">JD</span>
                </div>
                <span className="d-none d-md-inline">John Doe</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="fw-semibold">John Doe</div>
                  <div className="text-muted small">john.doe@example.com</div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/settings" className="d-flex align-items-center gap-2">
                  <User size={16} aria-hidden="true" />
                  Profile Settings
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings" className="d-flex align-items-center gap-2">
                  <Settings size={16} aria-hidden="true" />
                  Preferences
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline-light"
              size="sm"
              className="d-lg-none"
              onClick={() => setShowOffcanvas(true)}
              aria-label="Open mobile menu"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        placement="end"
        aria-labelledby="mobile-menu-title"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="mobile-menu-title">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Mobile Search */}
          <Form className="mb-4">
            <Form.Label htmlFor="mobile-search" className="visually-hidden">Search</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Search size={16} aria-hidden="true" />
              </InputGroup.Text>
              <Form.Control
                id="mobile-search"
                type="search"
                placeholder="Search news..."
                aria-label="Search news articles"
              />
            </InputGroup>
          </Form>

          {/* Mobile Navigation */}
          <Nav className="flex-column">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Nav.Link
                  key={item.href}
                  as={Link}
                  to={item.href}
                  className={`d-flex align-items-center gap-3 p-3 rounded mb-2 ${
                    isActive(item.href) ? 'bg-primary text-white' : 'text-dark'
                  }`}
                  onClick={() => setShowOffcanvas(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <IconComponent size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                </Nav.Link>
              );
            })}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <NotificationCenter open={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </>
  );
}