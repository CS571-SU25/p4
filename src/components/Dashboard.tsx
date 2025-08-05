import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Nav, Tab, Breadcrumb, Alert, Dropdown } from 'react-bootstrap';
import { TrendingUp, TrendingDown, Filter, Calendar, BarChart3, RefreshCw } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { SentimentChart } from './SentimentChart';
import { FilterPanel } from './FilterPanel';

const mockMetrics = {
  totalArticles: 1247,
  sentimentScore: 68,
  trendingTopics: 8,
  aiProcessingProgress: 92
};

const mockTrendingTopics = [
  { topic: 'AI Technology', sentiment: 'positive', articles: 156, change: '+12%' },
  { topic: 'Climate Policy', sentiment: 'neutral', articles: 89, change: '+5%' },
  { topic: 'Market Analysis', sentiment: 'negative', articles: 134, change: '-8%' },
  { topic: 'Healthcare Innovation', sentiment: 'positive', articles: 67, change: '+18%' }
];

export function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <Container fluid className="py-4">
      {/* Breadcrumb Navigation */}
      <Row>
        <Col>
          <Breadcrumb aria-label="Breadcrumb navigation">
            <Breadcrumb.Item linkAs="span" linkProps={{ 'aria-current': 'page' }}>
              <span className="text-muted">Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Page Header */}
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="mb-2">AI News Dashboard</h1>
          <p className="text-muted mb-0">
            AI-powered news aggregation and sentiment analysis
          </p>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-md-end gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setFilterOpen(true)}
            className="d-flex align-items-center gap-2"
            aria-label="Open advanced filters"
          >
            <Filter size={16} aria-hidden="true" />
            Filters
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="d-flex align-items-center gap-2"
            aria-label={isRefreshing ? "Refreshing data, please wait" : "Refresh dashboard data"}
          >
            <RefreshCw 
              size={16} 
              className={isRefreshing ? 'spin' : ''}
              aria-hidden="true"
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Col>
      </Row>

      {/* AI Processing Status Alert */}
      {mockMetrics.aiProcessingProgress < 100 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6 mb-1">AI Processing in Progress</h3>
                <p className="mb-0 small">Analyzing latest news articles for sentiment and trends...</p>
              </div>
              <div style={{ minWidth: '120px' }}>
                <ProgressBar 
                  now={mockMetrics.aiProcessingProgress} 
                  label={`${mockMetrics.aiProcessingProgress}%`}
                  aria-label={`AI processing progress: ${mockMetrics.aiProcessingProgress} percent complete`}
                />
              </div>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Overview Metrics */}
      <Row className="mb-4">
        <Col xs={12}>
          <h2 className="h4 mb-3">Overview</h2>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6 text-muted mb-1">Total Articles</h3>
                <div className="h4 mb-1">{mockMetrics.totalArticles.toLocaleString()}</div>
                <small className="text-success">+12% from yesterday</small>
              </div>
              <div className="text-muted">
                <BarChart3 size={32} aria-hidden="true" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6 text-muted mb-1">Sentiment Score</h3>
                <div className="h4 mb-1">{mockMetrics.sentimentScore}%</div>
                <small className="text-success">+5% from yesterday</small>
              </div>
              <div className="text-success">
                <TrendingUp size={32} aria-hidden="true" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6 text-muted mb-1">Trending Topics</h3>
                <div className="h4 mb-1">{mockMetrics.trendingTopics}</div>
                <small className="text-muted">2 new this hour</small>
              </div>
              <div className="text-muted">
                <TrendingUp size={32} aria-hidden="true" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="h6 text-muted mb-1">AI Processing</h3>
                <div className="h4 mb-1">{mockMetrics.aiProcessingProgress}%</div>
                <ProgressBar 
                  now={mockMetrics.aiProcessingProgress} 
                  size="sm" 
                  className="mt-2"
                  aria-label={`AI processing: ${mockMetrics.aiProcessingProgress}% complete`}
                />
              </div>
              <div className="text-muted">
                <RefreshCw size={32} aria-hidden="true" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Row>
        <Col>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'feed')}>
            <Nav variant="tabs" className="mb-4" role="tablist">
              <Nav.Item>
                <Nav.Link eventKey="feed" role="tab" aria-controls="feed-content">
                  News Feed
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sentiment" role="tab" aria-controls="sentiment-content">
                  Sentiment Analysis
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="trending" role="tab" aria-controls="trending-content">
                  Trending Topics
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="feed" role="tabpanel" id="feed-content">
                <Row>
                  <Col lg={8}>
                    <h2 className="h4 mb-3">Latest News</h2>
                    <NewsCard />
                  </Col>
                  <Col lg={4}>
                    <Card>
                      <Card.Header>
                        <h3 className="h5 mb-0">Quick Actions</h3>
                      </Card.Header>
                      <Card.Body className="d-grid gap-2">
                        <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                          <Calendar size={16} aria-hidden="true" />
                          Schedule Alert
                        </Button>
                        <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                          <Filter size={16} aria-hidden="true" />
                          Create Filter
                        </Button>
                        <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                          <BarChart3 size={16} aria-hidden="true" />
                          Export Data
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="sentiment" role="tabpanel" id="sentiment-content">
                <h2 className="h4 mb-3">Sentiment Analysis</h2>
                <SentimentChart />
              </Tab.Pane>

              <Tab.Pane eventKey="trending" role="tabpanel" id="trending-content">
                <h2 className="h4 mb-3">Trending Topics</h2>
                <Row>
                  {mockTrendingTopics.map((topic, index) => (
                    <Col xs={12} md={6} key={index} className="mb-3">
                      <Card className="h-100">
                        <Card.Header className="d-flex align-items-center justify-content-between">
                          <h3 className="h6 mb-0">{topic.topic}</h3>
                          <Badge 
                            bg={topic.sentiment === 'positive' ? 'success' : topic.sentiment === 'negative' ? 'danger' : 'secondary'}
                          >
                            {topic.sentiment}
                          </Badge>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-flex align-items-center justify-content-between small text-muted">
                            <span>{topic.articles} articles</span>
                            <span className={topic.change.startsWith('+') ? 'text-success' : 'text-danger'}>
                              {topic.change}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </Container>
  );
}