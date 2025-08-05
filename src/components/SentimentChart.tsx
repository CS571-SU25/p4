import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const sentimentData = [
  { time: '00:00', positive: 65, negative: 20, neutral: 15 },
  { time: '04:00', positive: 72, negative: 18, neutral: 10 },
  { time: '08:00', positive: 58, negative: 25, neutral: 17 },
  { time: '12:00', positive: 68, negative: 22, neutral: 10 },
  { time: '16:00', positive: 75, negative: 15, neutral: 10 },
  { time: '20:00', positive: 69, negative: 19, neutral: 12 },
];

const sourceData = [
  { source: 'Reuters', positive: 145, negative: 32, neutral: 23 },
  { source: 'BBC News', positive: 128, negative: 28, neutral: 19 },
  { source: 'CNN', positive: 98, negative: 45, neutral: 27 },
  { source: 'The Guardian', positive: 112, negative: 38, neutral: 25 },
  { source: 'Associated Press', positive: 134, negative: 22, neutral: 18 },
];

const categoryData = [
  { name: 'Technology', value: 35, color: '#0d6efd' },
  { name: 'Politics', value: 25, color: '#dc3545' },
  { name: 'Business', value: 20, color: '#198754' },
  { name: 'Health', value: 12, color: '#ffc107' },
  { name: 'Sports', value: 8, color: '#6f42c1' },
];

export function SentimentChart() {
  const totalSentiment = sentimentData[sentimentData.length - 1];
  const overallScore = totalSentiment.positive - totalSentiment.negative;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="h4 mb-1">Sentiment Analysis Dashboard</h2>
          <p className="text-muted mb-0">Real-time sentiment tracking across news sources</p>
        </div>
        <Badge 
          bg={overallScore > 0 ? 'success' : 'danger'}
          className="fs-6"
        >
          Overall: {overallScore > 0 ? '+' : ''}{overallScore}%
        </Badge>
      </div>

      <Row className="mb-4">
        {/* Sentiment Trend Over Time */}
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h3 className="h5 mb-0">Sentiment Trend (24h)</h3>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                  data={sentimentData}
                  aria-label="Line chart showing sentiment trends over 24 hours"
                  role="img"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6c757d"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6c757d"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #dee2e6',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="positive" 
                    stroke="#198754" 
                    strokeWidth={2}
                    name="Positive"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="negative" 
                    stroke="#dc3545" 
                    strokeWidth={2}
                    name="Negative"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="neutral" 
                    stroke="#6c757d" 
                    strokeWidth={2}
                    name="Neutral"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="visually-hidden">
                Chart showing sentiment trends over 24 hours. Positive sentiment ranges from 58% to 75%, 
                negative sentiment from 15% to 25%, and neutral from 10% to 17%.
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Category Distribution */}
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h3 className="h5 mb-0">Article Categories</h3>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart
                  aria-label="Pie chart showing distribution of article categories"
                  role="img"
                >
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #dee2e6',
                      borderRadius: '0.375rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="visually-hidden">
                Chart showing article category distribution: Technology 35%, Politics 25%, 
                Business 20%, Health 12%, Sports 8%.
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sentiment by Source */}
        <Col xs={12} className="mb-4">
          <Card>
            <Card.Header>
              <h3 className="h5 mb-0">Sentiment by News Source</h3>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={sourceData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  aria-label="Bar chart showing sentiment distribution by news source"
                  role="img"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
                  <XAxis 
                    dataKey="source" 
                    stroke="#6c757d"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6c757d"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #dee2e6',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="positive" stackId="a" fill="#198754" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="#6c757d" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="#dc3545" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
              <div className="visually-hidden">
                Chart showing sentiment distribution across news sources. Reuters has the highest 
                positive sentiment at 145 articles, while CNN shows more negative sentiment at 45 articles.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Statistics */}
      <Row>
        <Col xs={12}>
          <h3 className="h5 mb-3">Summary Statistics</h3>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h4 className="h6 text-muted mb-2">Average Positive Sentiment</h4>
              <div className="h3 text-success mb-1">68.2%</div>
              <small className="text-muted">+2.1% from yesterday</small>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h4 className="h6 text-muted mb-2">Most Active Source</h4>
              <div className="h3 mb-1">Reuters</div>
              <small className="text-muted">200 articles today</small>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h4 className="h6 text-muted mb-2">Trending Category</h4>
              <div className="h3 mb-1">Technology</div>
              <small className="text-muted">35% of all articles</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}