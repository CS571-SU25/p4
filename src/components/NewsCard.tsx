import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Row, Col, ButtonGroup } from 'react-bootstrap';
import { Bookmark, Share2, ExternalLink, ThumbsUp, ThumbsDown, Clock, Tag, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'react-toastify';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  tags: string[];
  bookmarked: boolean;
  readTime: number;
}

const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough Transforms Healthcare Diagnostics',
    summary: 'AI-generated summary: New machine learning algorithms demonstrate 95% accuracy in early disease detection, potentially saving millions of lives through preventive healthcare measures.',
    content: 'A groundbreaking study published today reveals that advanced artificial intelligence systems can now detect early signs of various diseases with unprecedented accuracy. The research, conducted by leading institutions worldwide, shows promising results for preventive healthcare. Medical professionals are calling this development a game-changer that could revolutionize how we approach early diagnosis and treatment. The AI system uses advanced neural networks to analyze medical imaging data with precision that exceeds human capabilities in many cases.',
    source: 'TechHealth News',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2024-12-10T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
    category: 'Healthcare',
    sentiment: 'positive',
    sentimentScore: 0.87,
    tags: ['AI', 'Healthcare', 'Innovation', 'Research'],
    bookmarked: false,
    readTime: 4
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Reduction',
    summary: 'AI-generated summary: World leaders commit to aggressive carbon reduction targets, with new funding mechanisms for developing nations and breakthrough renewable energy initiatives.',
    content: 'In a landmark decision that could reshape global environmental policy, representatives from 195 countries have reached a comprehensive agreement on carbon emission reduction targets. The summit, held over five intensive days, resulted in unprecedented commitments to renewable energy funding and technology transfer. Developing nations will receive substantial financial support to transition to clean energy infrastructure, while developed countries pledge to achieve net-zero emissions by 2035.',
    source: 'Global Environmental Report',
    author: 'Michael Chen',
    publishedAt: '2024-12-10T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=200&fit=crop',
    category: 'Environment',
    sentiment: 'positive',
    sentimentScore: 0.73,
    tags: ['Climate', 'Policy', 'Global', 'Sustainability'],
    bookmarked: true,
    readTime: 6
  },
  {
    id: '3',
    title: 'Market Volatility Concerns Rise Amid Economic Uncertainty',
    summary: 'AI-generated summary: Financial markets show increased volatility as investors react to mixed economic indicators and geopolitical tensions, prompting expert analysis of potential impacts.',
    content: 'Stock markets experienced significant fluctuations this week as investors grapple with conflicting economic signals. The uncertainty has prompted renewed discussions about market stability and the potential for a broader economic downturn. Financial analysts are closely monitoring inflation rates, employment figures, and central bank policies as key indicators of future market direction. Some experts suggest this volatility may continue for several months as markets adjust to changing global conditions.',
    source: 'Financial Times',
    author: 'Emma Rodriguez',
    publishedAt: '2024-12-10T06:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
    category: 'Finance',
    sentiment: 'negative',
    sentimentScore: -0.65,
    tags: ['Markets', 'Economy', 'Finance', 'Analysis'],
    bookmarked: false,
    readTime: 5
  }
];

export function NewsCard() {
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleBookmark = (id: string) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === id 
          ? { ...article, bookmarked: !article.bookmarked }
          : article
      )
    );
    const article = articles.find(a => a.id === id);
    if (article) {
      toast.success(
        article.bookmarked ? 'Bookmark removed' : 'Article bookmarked',
        { position: 'bottom-right' }
      );
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={16} className="text-success" aria-hidden="true" />;
      case 'negative':
        return <TrendingDown size={16} className="text-danger" aria-hidden="true" />;
      default:
        return <div className="bg-secondary rounded-circle" style={{ width: '16px', height: '16px' }} aria-hidden="true" />;
    }
  };

  const getSentimentVariant = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="shadow-sm">
            <Card.Body>
              <Row>
                <Col md={3} className="mb-3 mb-md-0">
                  <img
                    src={article.imageUrl}
                    alt={`Article image: ${article.title}`}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={9}>
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <h3 className="h5 mb-0 flex-grow-1 pe-2">{article.title}</h3>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => toggleBookmark(article.id)}
                      aria-label={article.bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                      className="flex-shrink-0"
                    >
                      <Bookmark 
                        size={16} 
                        className={article.bookmarked ? 'text-primary' : ''}
                        fill={article.bookmarked ? 'currentColor' : 'none'}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>

                  <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.source}</span>
                    <span>•</span>
                    <Clock size={12} aria-hidden="true" />
                    <time dateTime={article.publishedAt}>
                      {formatTimeAgo(article.publishedAt)}
                    </time>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <Badge bg="secondary">{article.category}</Badge>
                    <Badge 
                      bg={getSentimentVariant(article.sentiment)}
                      className="d-flex align-items-center gap-1"
                    >
                      {getSentimentIcon(article.sentiment)}
                      <span className="text-capitalize">{article.sentiment}</span>
                      <span>({Math.abs(article.sentimentScore * 100).toFixed(0)}%)</span>
                    </Badge>
                    <small className="text-muted">{article.readTime} min read</small>
                  </div>

                  <p className="text-muted small mb-3 lh-sm">
                    {article.summary}
                  </p>

                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="d-flex align-items-center gap-1">
                        <Tag size={10} aria-hidden="true" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleArticleClick(article)}
                    >
                      Read Full Article
                    </Button>

                    <ButtonGroup size="sm">
                      <Button variant="outline-secondary" aria-label="Like article">
                        <ThumbsUp size={16} aria-hidden="true" />
                      </Button>
                      <Button variant="outline-secondary" aria-label="Dislike article">
                        <ThumbsDown size={16} aria-hidden="true" />
                      </Button>
                      <Button variant="outline-secondary" aria-label="Share article">
                        <Share2 size={16} aria-hidden="true" />
                      </Button>
                      <Button variant="outline-secondary" aria-label="Open in new tab">
                        <ExternalLink size={16} aria-hidden="true" />
                      </Button>
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Article Detail Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg"
        aria-labelledby="article-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="article-modal-title" className="h4">
            {selectedArticle?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <div>
              <img
                src={selectedArticle.imageUrl}
                alt={`Article image: ${selectedArticle.title}`}
                className="img-fluid rounded mb-3 w-100"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.source}</span>
                <span>•</span>
                <time dateTime={selectedArticle.publishedAt}>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                </time>
              </div>
              <div className="lh-lg">
                {selectedArticle.content}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Share Article
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}