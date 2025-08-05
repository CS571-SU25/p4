import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, Alert, Nav, Tab, Breadcrumb } from 'react-bootstrap';
import { Plus, GripVertical, Edit, Trash2, Bell, TrendingUp, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

interface WatchlistItem {
  id: string;
  name: string;
  keywords: string[];
  sources: string[];
  alertEnabled: boolean;
  alertFrequency: string;
  sentimentThreshold: number;
  articleCount: number;
  lastUpdate: string;
  priority: 'high' | 'medium' | 'low';
}

const initialWatchlists: WatchlistItem[] = [
  {
    id: '1',
    name: 'AI & Technology',
    keywords: ['artificial intelligence', 'machine learning', 'AI', 'technology'],
    sources: ['TechCrunch', 'Wired', 'MIT Technology Review'],
    alertEnabled: true,
    alertFrequency: 'immediate',
    sentimentThreshold: 70,
    articleCount: 156,
    lastUpdate: '2 minutes ago',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Climate & Environment',
    keywords: ['climate change', 'renewable energy', 'sustainability', 'carbon'],
    sources: ['Environmental News', 'Nature', 'Scientific American'],
    alertEnabled: true,
    alertFrequency: 'daily',
    sentimentThreshold: 50,
    articleCount: 89,
    lastUpdate: '1 hour ago',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Financial Markets',
    keywords: ['stock market', 'cryptocurrency', 'trading', 'economy'],
    sources: ['Financial Times', 'Bloomberg', 'Reuters'],
    alertEnabled: false,
    alertFrequency: 'weekly',
    sentimentThreshold: 60,
    articleCount: 234,
    lastUpdate: '3 hours ago',
    priority: 'low'
  }
];

export function WatchlistPage() {
  const [watchlists, setWatchlists] = useState(initialWatchlists);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState<WatchlistItem | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = watchlists.findIndex(item => item.id === draggedItem);
    const targetIndex = watchlists.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newWatchlists = [...watchlists];
    const [removed] = newWatchlists.splice(draggedIndex, 1);
    newWatchlists.splice(targetIndex, 0, removed);

    setWatchlists(newWatchlists);
    setDraggedItem(null);
    toast.success('Watchlist order updated');
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const toggleAlert = (id: string) => {
    setWatchlists(prev => 
      prev.map(item => 
        item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item
      )
    );
    const watchlist = watchlists.find(w => w.id === id);
    toast.success(`Alerts ${watchlist?.alertEnabled ? 'disabled' : 'enabled'} for ${watchlist?.name}`);
  };

  const deleteWatchlist = (id: string) => {
    const watchlist = watchlists.find(w => w.id === id);
    if (window.confirm(`Are you sure you want to delete "${watchlist?.name}"?`)) {
      setWatchlists(prev => prev.filter(item => item.id !== id));
      toast.success('Watchlist deleted');
    }
  };

  const openEditModal = (watchlist?: WatchlistItem) => {
    setEditingWatchlist(watchlist || null);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      {/* Breadcrumb Navigation */}
      <Row>
        <Col>
          <Breadcrumb aria-label="Breadcrumb navigation">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Watchlist Management</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Page Header */}
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="mb-2">Watchlist Management</h1>
          <p className="text-muted mb-0">
            Create and manage custom news monitoring lists with AI-powered alerts
          </p>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-md-end">
          <Button 
            variant="primary"
            onClick={() => openEditModal()}
            className="d-flex align-items-center gap-2"
          >
            <Plus size={16} aria-hidden="true" />
            Create Watchlist
          </Button>
        </Col>
      </Row>

      {/* Info Alert */}
      <Row className="mb-4">
        <Col>
          <Alert variant="info" className="d-flex align-items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="h6 mb-1">Drag and Drop to Reorder</h3>
              <p className="mb-0 small">
                Drag watchlists to reorder them by priority. Active alerts will notify you based on your preferences.
              </p>
            </div>
          </Alert>
        </Col>
      </Row>

      {/* Watchlist Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'active')}>
        <Nav variant="tabs" className="mb-4" role="tablist">
          <Nav.Item>
            <Nav.Link eventKey="active" role="tab">
              Active Watchlists ({watchlists.filter(w => w.alertEnabled).length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="all" role="tab">
              All Watchlists ({watchlists.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="analytics" role="tab">
              Analytics
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="active" role="tabpanel">
            <Row>
              {watchlists.filter(w => w.alertEnabled).map((watchlist) => (
                <Col xs={12} md={6} lg={4} key={watchlist.id} className="mb-4">
                  <WatchlistCard
                    watchlist={watchlist}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onToggleAlert={toggleAlert}
                    onEdit={() => openEditModal(watchlist)}
                    onDelete={deleteWatchlist}
                  />
                </Col>
              ))}
              {watchlists.filter(w => w.alertEnabled).length === 0 && (
                <Col>
                  <Alert variant="light" className="text-center">
                    <h3 className="h5">No Active Watchlists</h3>
                    <p className="mb-3">Enable alerts on your watchlists to monitor news in real-time.</p>
                    <Button variant="primary" onClick={() => openEditModal()}>
                      Create Your First Watchlist
                    </Button>
                  </Alert>
                </Col>
              )}
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="all" role="tabpanel">
            <Row>
              {watchlists.map((watchlist) => (
                <Col xs={12} md={6} lg={4} key={watchlist.id} className="mb-4">
                  <WatchlistCard
                    watchlist={watchlist}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onToggleAlert={toggleAlert}
                    onEdit={() => openEditModal(watchlist)}
                    onDelete={deleteWatchlist}
                  />
                </Col>
              ))}
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="analytics" role="tabpanel">
            <Row>
              <Col xs={12}>
                <h2 className="h4 mb-4">Analytics Overview</h2>
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <Card className="text-center">
                  <Card.Body>
                    <h3 className="h6 text-muted mb-2">Total Articles</h3>
                    <div className="h3 mb-1">
                      {watchlists.reduce((sum, w) => sum + w.articleCount, 0).toLocaleString()}
                    </div>
                    <small className="text-muted">Across all watchlists</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4} className="mb-3">
                <Card className="text-center">
                  <Card.Body>
                    <h3 className="h6 text-muted mb-2">Active Alerts</h3>
                    <div className="h3 mb-1">
                      {watchlists.filter(w => w.alertEnabled).length}
                    </div>
                    <small className="text-muted">Monitoring in real-time</small>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4} className="mb-3">
                <Card className="text-center">
                  <Card.Body>
                    <h3 className="h6 text-muted mb-2">High Priority</h3>
                    <div className="h3 mb-1">
                      {watchlists.filter(w => w.priority === 'high').length}
                    </div>
                    <small className="text-muted">Watchlists marked urgent</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Edit/Create Modal */}
      <WatchlistModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        watchlist={editingWatchlist}
        onSave={(data) => {
          // Handle save logic here
          setShowModal(false);
          toast.success(editingWatchlist ? 'Watchlist updated' : 'Watchlist created');
        }}
      />
    </Container>
  );
}

interface WatchlistCardProps {
  watchlist: WatchlistItem;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
  onToggleAlert: (id: string) => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

function WatchlistCard({ 
  watchlist, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  onToggleAlert, 
  onEdit, 
  onDelete 
}: WatchlistCardProps) {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, watchlist.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, watchlist.id)}
      className="h-100 shadow-sm"
      style={{ cursor: 'move' }}
    >
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <GripVertical size={16} className="text-muted" aria-hidden="true" />
          <h3 className="h6 mb-0">{watchlist.name}</h3>
        </div>
        <Badge bg={getPriorityVariant(watchlist.priority)}>
          {watchlist.priority}
        </Badge>
      </Card.Header>

      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <TrendingUp size={16} className="text-muted" aria-hidden="true" />
            <span className="small">{watchlist.articleCount} articles</span>
          </div>
          <span className="small text-muted">{watchlist.lastUpdate}</span>
        </div>

        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1 mb-2">
            {watchlist.keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} bg="secondary" className="small">
                {keyword}
              </Badge>
            ))}
            {watchlist.keywords.length > 3 && (
              <Badge bg="light" text="dark" className="small">
                +{watchlist.keywords.length - 3} more
              </Badge>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <Bell size={16} className="text-muted" aria-hidden="true" />
              <span className="small">Alerts</span>
            </div>
            <Form.Check
              type="switch"
              id={`alert-${watchlist.id}`}
              checked={watchlist.alertEnabled}
              onChange={() => onToggleAlert(watchlist.id)}
              aria-label={`Toggle alerts for ${watchlist.name}`}
            />
          </div>
        </div>

        <div className="d-flex gap-2 pt-2 border-top">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={onEdit}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <Edit size={14} aria-hidden="true" />
            Edit
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => onDelete(watchlist.id)}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

interface WatchlistModalProps {
  show: boolean;
  onHide: () => void;
  watchlist: WatchlistItem | null;
  onSave: (data: any) => void;
}

function WatchlistModal({ show, onHide, watchlist, onSave }: WatchlistModalProps) {
  const [formData, setFormData] = useState({
    name: watchlist?.name || '',
    keywords: watchlist?.keywords.join(', ') || '',
    sources: watchlist?.sources.join(', ') || '',
    alertFrequency: watchlist?.alertFrequency || 'daily',
    priority: watchlist?.priority || 'medium',
    sentimentThreshold: watchlist?.sentimentThreshold || 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      keywords: '',
      sources: '',
      alertFrequency: 'daily',
      priority: 'medium',
      sentimentThreshold: 50
    });
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      aria-labelledby="watchlist-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="watchlist-modal-title">
          {watchlist ? 'Edit Watchlist' : 'Create New Watchlist'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="watchlist-name">Watchlist Name</Form.Label>
            <Form.Control
              id="watchlist-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., AI Technology News"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="watchlist-keywords">Keywords (comma-separated)</Form.Label>
            <Form.Control
              id="watchlist-keywords"
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="artificial intelligence, AI, machine learning"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="watchlist-sources">Preferred Sources (comma-separated)</Form.Label>
            <Form.Control
              id="watchlist-sources"
              type="text"
              value={formData.sources}
              onChange={(e) => setFormData(prev => ({ ...prev, sources: e.target.value }))}
              placeholder="TechCrunch, Wired, MIT Technology Review"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="watchlist-priority">Priority</Form.Label>
                <Form.Select 
                  id="watchlist-priority"
                  value={formData.priority} 
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="watchlist-frequency">Alert Frequency</Form.Label>
                <Form.Select 
                  id="watchlist-frequency"
                  value={formData.alertFrequency} 
                  onChange={(e) => setFormData(prev => ({ ...prev, alertFrequency: e.target.value }))}
                >
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {watchlist ? 'Update' : 'Create'} Watchlist
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}