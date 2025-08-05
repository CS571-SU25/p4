import React from 'react';
import { Offcanvas, Button, Badge, ListGroup, Alert } from 'react-bootstrap';
import { X, AlertCircle, TrendingUp, TrendingDown, Calendar, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'sentiment' | 'breaking' | 'watchlist';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity?: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'breaking',
    title: 'Breaking News Alert',
    message: 'Major market movement detected in tech sector following AI announcement',
    timestamp: '2 minutes ago',
    read: false,
    severity: 'high'
  },
  {
    id: '2',
    type: 'sentiment',
    title: 'Sentiment Change Alert',
    message: 'Negative sentiment spike detected for "Apple Inc" (+15% in last hour)',
    timestamp: '15 minutes ago',
    read: false,
    severity: 'medium'
  },
  {
    id: '3',
    type: 'watchlist',
    title: 'Watchlist Update',
    message: 'New articles available for "Climate Change" - 5 new sources',
    timestamp: '1 hour ago',
    read: true,
    severity: 'low'
  },
  {
    id: '4',
    type: 'alert',
    title: 'AI Processing Complete',
    message: 'Daily sentiment analysis completed for all tracked keywords',
    timestamp: '2 hours ago',
    read: true,
    severity: 'low'
  }
];

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationCenter({ open, onClose }: NotificationCenterProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'breaking':
        return <AlertCircle size={16} className="text-danger" aria-hidden="true" />;
      case 'sentiment':
        return <TrendingDown size={16} className="text-warning" aria-hidden="true" />;
      case 'watchlist':
        return <TrendingUp size={16} className="text-info" aria-hidden="true" />;
      default:
        return <Calendar size={16} className="text-muted" aria-hidden="true" />;
    }
  };

  const getSeverityVariant = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Offcanvas 
      show={open} 
      onHide={onClose} 
      placement="end"
      style={{ width: '400px' }}
      aria-labelledby="notification-center-title"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="notification-center-title" className="d-flex align-items-center justify-content-between w-100">
          <h2 className="h5 mb-0">Notifications</h2>
          <Button variant="outline-secondary" size="sm">
            Mark all read
          </Button>
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-0">
        {unreadCount > 0 && (
          <Alert variant="info" className="m-3 mb-0">
            <Alert.Heading className="h6">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Alert.Heading>
          </Alert>
        )}

        <ListGroup variant="flush" role="list">
          {mockNotifications.map((notification, index) => (
            <ListGroup.Item 
              key={notification.id}
              className={`border-0 ${!notification.read ? 'bg-light' : ''}`}
              role="listitem"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle notification click
                }
              }}
              aria-label={`Notification: ${notification.title}. ${notification.read ? 'Read' : 'Unread'}`}
            >
              <div className="d-flex align-items-start gap-3 p-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                    <h3 className="h6 mb-0 text-truncate">{notification.title}</h3>
                    {notification.severity && (
                      <Badge bg={getSeverityVariant(notification.severity)} className="text-uppercase">
                        {notification.severity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted small mb-2 lh-sm">
                    {notification.message}
                  </p>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Clock size={12} aria-hidden="true" />
                    <time dateTime={new Date().toISOString()}>{notification.timestamp}</time>
                  </div>
                </div>
                {!notification.read && (
                  <div 
                    className="bg-primary rounded-circle flex-shrink-0 mt-2"
                    style={{ width: '8px', height: '8px' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="p-3 border-top">
          <Button variant="outline-primary" className="w-100">
            View All Notifications
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}