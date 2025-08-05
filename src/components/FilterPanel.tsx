import React, { useState } from 'react';
import { Offcanvas, Button, Form, Badge, Alert, Accordion } from 'react-bootstrap';
import { X, Calendar, Tag, TrendingUp, Search } from 'lucide-react';

const newsSources = [
  'Reuters', 'BBC News', 'CNN', 'The Guardian', 'Associated Press',
  'New York Times', 'Washington Post', 'Wall Street Journal', 'Financial Times'
];

const categories = [
  'Technology', 'Politics', 'Business', 'Health', 'Sports',
  'Science', 'Entertainment', 'Environment', 'Education'
];

const keywords = [
  'AI', 'Climate Change', 'Healthcare', 'Economy', 'Innovation',
  'Policy', 'Research', 'Markets', 'Security', 'Energy'
];

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
}

export function FilterPanel({ open, onClose }: FilterPanelProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('week');
  const [sentimentScore, setSentimentScore] = useState(0);
  const [customKeyword, setCustomKeyword] = useState('');

  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSelectedSources(prev => [...prev, source]);
    } else {
      setSelectedSources(prev => prev.filter(s => s !== source));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(prev => prev.filter(k => k !== keyword));
    } else {
      setSelectedKeywords(prev => [...prev, keyword]);
    }
  };

  const addCustomKeyword = () => {
    if (customKeyword.trim() && !selectedKeywords.includes(customKeyword.trim())) {
      setSelectedKeywords(prev => [...prev, customKeyword.trim()]);
      setCustomKeyword('');
    }
  };

  const clearAllFilters = () => {
    setSelectedSources([]);
    setSelectedCategories([]);
    setSelectedKeywords([]);
    setSentimentFilter('all');
    setDateRange('week');
    setSentimentScore(0);
    setCustomKeyword('');
  };

  const activeFiltersCount = selectedSources.length + selectedCategories.length + selectedKeywords.length + 
    (sentimentFilter !== 'all' ? 1 : 0) + (dateRange !== 'week' ? 1 : 0);

  return (
    <Offcanvas 
      show={open} 
      onHide={onClose} 
      placement="end"
      style={{ width: '400px' }}
      aria-labelledby="filter-panel-title"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="filter-panel-title" className="d-flex align-items-center justify-content-between w-100">
          <h2 className="h5 mb-0">Advanced Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge bg="primary">{activeFiltersCount} active</Badge>
          )}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Quick Actions */}
        <div className="d-flex gap-2 mb-4">
          <Button variant="outline-secondary" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Apply Filters
          </Button>
        </div>

        <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
          {/* Date Range */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Calendar size={16} className="me-2" aria-hidden="true" />
              Date Range
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id="today"
                    name="dateRange"
                    label="Today"
                    checked={dateRange === 'today'}
                    onChange={() => setDateRange('today')}
                  />
                </div>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id="week"
                    name="dateRange"
                    label="Past Week"
                    checked={dateRange === 'week'}
                    onChange={() => setDateRange('week')}
                  />
                </div>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id="month"
                    name="dateRange"
                    label="Past Month"
                    checked={dateRange === 'month'}
                    onChange={() => setDateRange('month')}
                  />
                </div>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id="custom"
                    name="dateRange"
                    label="Custom Range"
                    checked={dateRange === 'custom'}
                    onChange={() => setDateRange('custom')}
                  />
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Sentiment Filter */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <TrendingUp size={16} className="me-2" aria-hidden="true" />
              Sentiment Analysis
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="sentiment-select">Sentiment Type</Form.Label>
                <Form.Select 
                  id="sentiment-select"
                  value={sentimentFilter} 
                  onChange={(e) => setSentimentFilter(e.target.value)}
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive Only</option>
                  <option value="negative">Negative Only</option>
                  <option value="neutral">Neutral Only</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label htmlFor="sentiment-threshold">
                  Minimum Sentiment Score: {sentimentScore}%
                </Form.Label>
                <Form.Range
                  id="sentiment-threshold"
                  min={0}
                  max={100}
                  step={5}
                  value={sentimentScore}
                  onChange={(e) => setSentimentScore(Number(e.target.value))}
                  aria-describedby="sentiment-score-help"
                />
                <Form.Text id="sentiment-score-help" className="text-muted">
                  Filter articles with sentiment score above this threshold
                </Form.Text>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          {/* Keywords */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <Tag size={16} className="me-2" aria-hidden="true" />
              Keywords & Topics
            </Accordion.Header>
            <Accordion.Body>
              {/* Add Custom Keyword */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="custom-keyword">Add Custom Keyword</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    id="custom-keyword"
                    type="text"
                    placeholder="Enter keyword..."
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomKeyword();
                      }
                    }}
                  />
                  <Button variant="outline-primary" onClick={addCustomKeyword}>
                    <Search size={16} aria-hidden="true" />
                    <span className="visually-hidden">Add keyword</span>
                  </Button>
                </div>
              </Form.Group>
              
              {/* Predefined Keywords */}
              <Form.Group className="mb-3">
                <Form.Label>Popular Keywords</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      bg={selectedKeywords.includes(keyword) ? "primary" : "outline-secondary"}
                      className="cursor-pointer user-select-none"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleKeywordToggle(keyword)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleKeywordToggle(keyword);
                        }
                      }}
                      aria-label={`${selectedKeywords.includes(keyword) ? 'Remove' : 'Add'} ${keyword} filter`}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </Form.Group>
              
              {/* Selected Keywords */}
              {selectedKeywords.length > 0 && (
                <Form.Group>
                  <Form.Label>Selected Keywords</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedKeywords.map((keyword) => (
                      <Badge key={keyword} bg="secondary" className="d-flex align-items-center gap-1">
                        {keyword}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-white"
                          onClick={() => handleKeywordToggle(keyword)}
                          aria-label={`Remove ${keyword} filter`}
                        >
                          <X size={12} />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </Form.Group>
              )}
            </Accordion.Body>
          </Accordion.Item>

          {/* Categories */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <fieldset>
                <legend className="visually-hidden">Select news categories</legend>
                {categories.map((category) => (
                  <div key={category} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={`category-${category}`}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    />
                  </div>
                ))}
              </fieldset>
            </Accordion.Body>
          </Accordion.Item>

          {/* News Sources */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>News Sources</Accordion.Header>
            <Accordion.Body>
              <fieldset>
                <legend className="visually-hidden">Select news sources</legend>
                {newsSources.map((source) => (
                  <div key={source} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={`source-${source}`}
                      label={source}
                      checked={selectedSources.includes(source)}
                      onChange={(e) => handleSourceChange(source, e.target.checked)}
                    />
                  </div>
                ))}
              </fieldset>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Filter Summary */}
        {activeFiltersCount > 0 && (
          <Alert variant="info" className="mt-4">
            <h4 className="h6 mb-2">Active Filters</h4>
            <p className="mb-0 small">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied. 
              Click "Apply Filters" to update results.
            </p>
          </Alert>
        )}
      </Offcanvas.Body>

      <div className="border-top p-3">
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" className="flex-fill" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-fill" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Offcanvas>
  );
}