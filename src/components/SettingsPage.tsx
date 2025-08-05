import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Tab, Alert, Breadcrumb, Badge } from 'react-bootstrap';
import { User, Bell, Shield, Palette, Monitor, Moon, Sun, Eye, Volume2, Keyboard } from 'lucide-react';
import { toast } from 'react-toastify';

export function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    timezone: 'UTC-5',
    language: 'en'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    browserNotifications: false,
    weeklyDigest: true,
    breakingNews: true,
    sentimentAlerts: false
  });

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    reducedMotion: false,
    fontSize: 16,
    keyboardNavigation: true,
    screenReader: false,
    soundAlerts: false
  });

  const [appearance, setAppearance] = useState({
    theme: 'system',
    accentColor: 'blue',
    density: 'comfortable'
  });

  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analyticsTracking: false,
    marketingEmails: false,
    thirdPartySharing: false
  });

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  return (
    <Container fluid className="py-4">
      {/* Breadcrumb Navigation */}
      <Row>
        <Col>
          <Breadcrumb aria-label="Breadcrumb navigation">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Settings</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">Settings & Preferences</h1>
          <p className="text-muted mb-0">
            Manage your account preferences, notifications, and accessibility options
          </p>
        </Col>
      </Row>

      {/* Settings Tabs */}
      <Tab.Container defaultActiveKey="profile">
        <Row>
          <Col md={3} className="mb-4">
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="mb-2">
                <Nav.Link eventKey="profile" className="d-flex align-items-center gap-2">
                  <User size={16} aria-hidden="true" />
                  Profile Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-2">
                <Nav.Link eventKey="notifications" className="d-flex align-items-center gap-2">
                  <Bell size={16} aria-hidden="true" />
                  Notifications
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-2">
                <Nav.Link eventKey="accessibility" className="d-flex align-items-center gap-2">
                  <Eye size={16} aria-hidden="true" />
                  Accessibility
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-2">
                <Nav.Link eventKey="appearance" className="d-flex align-items-center gap-2">
                  <Palette size={16} aria-hidden="true" />
                  Appearance
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-2">
                <Nav.Link eventKey="privacy" className="d-flex align-items-center gap-2">
                  <Shield size={16} aria-hidden="true" />
                  Privacy & Security
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Profile Settings */}
              <Tab.Pane eventKey="profile" role="tabpanel">
                <Card>
                  <Card.Header>
                    <h2 className="h4 mb-0">Profile Information</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row className="mb-4">
                        <Col md={6}>
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '80px', height: '80px' }}
                              aria-hidden="true"
                            >
                              <span className="h4 mb-0">JD</span>
                            </div>
                            <div>
                              <Button variant="outline-primary" size="sm" className="mb-2">
                                Change Avatar
                              </Button>
                              <p className="small text-muted mb-0">
                                JPG, PNG or GIF. Max size 2MB.
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="profile-name">Full Name</Form.Label>
                            <Form.Control
                              id="profile-name"
                              type="text"
                              value={profile.name}
                              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="profile-email">Email Address</Form.Label>
                            <Form.Control
                              id="profile-email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="profile-timezone">Timezone</Form.Label>
                            <Form.Select 
                              id="profile-timezone"
                              value={profile.timezone} 
                              onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                            >
                              <option value="UTC-8">Pacific Time (UTC-8)</option>
                              <option value="UTC-5">Eastern Time (UTC-5)</option>
                              <option value="UTC+0">GMT (UTC+0)</option>
                              <option value="UTC+1">Central European Time (UTC+1)</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="profile-language">Language</Form.Label>
                            <Form.Select 
                              id="profile-language"
                              value={profile.language} 
                              onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button 
                        variant="primary" 
                        onClick={() => handleSave('Profile')}
                      >
                        Save Profile Changes
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Notification Settings */}
              <Tab.Pane eventKey="notifications" role="tabpanel">
                <Card>
                  <Card.Header>
                    <h2 className="h4 mb-0">Notification Preferences</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <h3 className="h5 mb-3">Delivery Methods</h3>
                      
                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Email Alerts</h4>
                            <p className="text-muted small mb-0">
                              Receive news alerts and updates via email
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="email-alerts"
                            checked={notifications.emailAlerts}
                            onChange={(e) => setNotifications(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                            aria-describedby="email-alerts-help"
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Push Notifications</h4>
                            <p className="text-muted small mb-0">
                              Get push notifications on your mobile device
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="push-notifications"
                            checked={notifications.pushNotifications}
                            onChange={(e) => setNotifications(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-4 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Browser Notifications</h4>
                            <p className="text-muted small mb-0">
                              Show notifications in your browser
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="browser-notifications"
                            checked={notifications.browserNotifications}
                            onChange={(e) => setNotifications(prev => ({ ...prev, browserNotifications: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <h3 className="h5 mb-3">Content Preferences</h3>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Weekly Digest</h4>
                            <p className="text-muted small mb-0">
                              Get a summary of the week's top stories
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="weekly-digest"
                            checked={notifications.weeklyDigest}
                            onChange={(e) => setNotifications(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Breaking News</h4>
                            <p className="text-muted small mb-0">
                              Immediate alerts for urgent news
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="breaking-news"
                            checked={notifications.breakingNews}
                            onChange={(e) => setNotifications(prev => ({ ...prev, breakingNews: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-4 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Sentiment Alerts</h4>
                            <p className="text-muted small mb-0">
                              Notify when sentiment changes significantly
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="sentiment-alerts"
                            checked={notifications.sentimentAlerts}
                            onChange={(e) => setNotifications(prev => ({ ...prev, sentimentAlerts: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <Button 
                        variant="primary" 
                        onClick={() => handleSave('Notification')}
                      >
                        Save Notification Settings
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Accessibility Settings */}
              <Tab.Pane eventKey="accessibility" role="tabpanel">
                <Alert variant="info" className="mb-4">
                  <Eye size={20} className="me-2" aria-hidden="true" />
                  <strong>Accessibility Features</strong>
                  <br />
                  These settings help make the application more accessible. Changes will apply immediately.
                </Alert>

                <Card className="mb-4">
                  <Card.Header>
                    <h2 className="h4 mb-0">Visual Accessibility</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h3 className="h6 mb-1">High Contrast Mode</h3>
                            <p className="text-muted small mb-0">
                              Increase contrast for better visibility (WCAG AA compliant)
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="high-contrast"
                            checked={accessibility.highContrast}
                            onChange={(e) => setAccessibility(prev => ({ ...prev, highContrast: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h3 className="h6 mb-1">Reduced Motion</h3>
                            <p className="text-muted small mb-0">
                              Minimize animations and transitions
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="reduced-motion"
                            checked={accessibility.reducedMotion}
                            onChange={(e) => setAccessibility(prev => ({ ...prev, reducedMotion: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="font-size-range">
                          Font Size: {accessibility.fontSize}px
                        </Form.Label>
                        <Form.Range
                          id="font-size-range"
                          min={12}
                          max={24}
                          step={1}
                          value={accessibility.fontSize}
                          onChange={(e) => setAccessibility(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                          aria-describedby="font-size-help"
                        />
                        <Form.Text id="font-size-help" className="text-muted">
                          Adjust text size for better readability
                        </Form.Text>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Header>
                    <h2 className="h4 mb-0">Interaction Accessibility</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <Keyboard size={16} aria-hidden="true" />
                            <div>
                              <h3 className="h6 mb-1">Enhanced Keyboard Navigation</h3>
                              <p className="text-muted small mb-0">
                                Improved focus indicators and tab order
                              </p>
                            </div>
                          </div>
                          <Form.Check
                            type="switch"
                            id="keyboard-navigation"
                            checked={accessibility.keyboardNavigation}
                            onChange={(e) => setAccessibility(prev => ({ ...prev, keyboardNavigation: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h3 className="h6 mb-1">Screen Reader Optimizations</h3>
                            <p className="text-muted small mb-0">
                              Enhanced compatibility with screen readers
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="screen-reader"
                            checked={accessibility.screenReader}
                            onChange={(e) => setAccessibility(prev => ({ ...prev, screenReader: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <Volume2 size={16} aria-hidden="true" />
                            <div>
                              <h3 className="h6 mb-1">Sound Alerts</h3>
                              <p className="text-muted small mb-0">
                                Audio cues for important notifications
                              </p>
                            </div>
                          </div>
                          <Form.Check
                            type="switch"
                            id="sound-alerts"
                            checked={accessibility.soundAlerts}
                            onChange={(e) => setAccessibility(prev => ({ ...prev, soundAlerts: e.target.checked }))}
                          />
                        </div>
                      </div>
                    </Form>

                    <Button 
                      variant="primary" 
                      onClick={() => handleSave('Accessibility')}
                    >
                      Save Accessibility Settings
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Appearance Settings */}
              <Tab.Pane eventKey="appearance" role="tabpanel">
                <Card>
                  <Card.Header>
                    <h2 className="h4 mb-0">Theme & Appearance</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-4">
                        <Form.Label>Theme Selection</Form.Label>
                        <div className="d-flex gap-3">
                          <Form.Check
                            type="radio"
                            id="theme-light"
                            name="theme"
                            label={
                              <div className="d-flex align-items-center gap-2">
                                <Sun size={16} aria-hidden="true" />
                                Light Mode
                              </div>
                            }
                            checked={appearance.theme === 'light'}
                            onChange={() => setAppearance(prev => ({ ...prev, theme: 'light' }))}
                          />
                          <Form.Check
                            type="radio"
                            id="theme-dark"
                            name="theme"
                            label={
                              <div className="d-flex align-items-center gap-2">
                                <Moon size={16} aria-hidden="true" />
                                Dark Mode
                              </div>
                            }
                            checked={appearance.theme === 'dark'}
                            onChange={() => setAppearance(prev => ({ ...prev, theme: 'dark' }))}
                          />
                          <Form.Check
                            type="radio"
                            id="theme-system"
                            name="theme"
                            label={
                              <div className="d-flex align-items-center gap-2">
                                <Monitor size={16} aria-hidden="true" />
                                System Default
                              </div>
                            }
                            checked={appearance.theme === 'system'}
                            onChange={() => setAppearance(prev => ({ ...prev, theme: 'system' }))}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Interface Density</Form.Label>
                        <div className="d-flex gap-3">
                          <Form.Check
                            type="radio"
                            id="density-compact"
                            name="density"
                            label="Compact"
                            checked={appearance.density === 'compact'}
                            onChange={() => setAppearance(prev => ({ ...prev, density: 'compact' }))}
                          />
                          <Form.Check
                            type="radio"
                            id="density-comfortable"
                            name="density"
                            label="Comfortable"
                            checked={appearance.density === 'comfortable'}
                            onChange={() => setAppearance(prev => ({ ...prev, density: 'comfortable' }))}
                          />
                          <Form.Check
                            type="radio"
                            id="density-spacious"
                            name="density"
                            label="Spacious"
                            checked={appearance.density === 'spacious'}
                            onChange={() => setAppearance(prev => ({ ...prev, density: 'spacious' }))}
                          />
                        </div>
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        onClick={() => handleSave('Appearance')}
                      >
                        Save Appearance Settings
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Privacy Settings */}
              <Tab.Pane eventKey="privacy" role="tabpanel">
                <Card>
                  <Card.Header>
                    <h2 className="h4 mb-0">Privacy & Data Management</h2>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="warning" className="mb-4">
                      <strong>Data Protection Notice:</strong> This AI news platform is designed to protect your privacy while providing personalized news insights. We do not collect personally identifiable information (PII) without your explicit consent.
                    </Alert>

                    <Form>
                      <h3 className="h5 mb-3">Data Collection Preferences</h3>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Usage Analytics</h4>
                            <p className="text-muted small mb-0">
                              Allow collection of anonymized usage data to improve the service
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="data-collection"
                            checked={privacy.dataCollection}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, dataCollection: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-3 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Performance Tracking</h4>
                            <p className="text-muted small mb-0">
                              Help us understand application performance and usage patterns
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="analytics-tracking"
                            checked={privacy.analyticsTracking}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, analyticsTracking: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <div className="mb-4 p-3 border rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4 className="h6 mb-1">Marketing Communications</h4>
                            <p className="text-muted small mb-0">
                              Receive promotional content and feature updates
                            </p>
                          </div>
                          <Form.Check
                            type="switch"
                            id="marketing-emails"
                            checked={privacy.marketingEmails}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                          />
                        </div>
                      </div>

                      <h3 className="h5 mb-3">Data Management</h3>
                      <div className="d-flex gap-2 mb-4">
                        <Button variant="outline-primary" size="sm">
                          Download My Data
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Request Account Deletion
                        </Button>
                      </div>

                      <Button 
                        variant="primary" 
                        onClick={() => handleSave('Privacy')}
                      >
                        Save Privacy Settings
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}