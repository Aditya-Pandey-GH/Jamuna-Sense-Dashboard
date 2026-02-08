import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Clock, AlertCircle, Filter, Search, Download, Calendar } from 'lucide-react';
import './AdminDashboard.css';
import logo from "../assets/Jamuna_Sense_Logo.png"

// Mock data - Replace with your actual database fetch
const mockIssues = [
    {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=450&fit=crop',
        issueType: 'Sewage discharge',
        description: 'Untreated sewage being directly discharged into the river from residential area',
        reporterName: 'Wazirabad - Delhi',
        location: { latitude: 28.7041, longitude: 77.2025 },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=450&fit=crop',
        issueType: 'Toxic foam formation',
        description: 'White toxic foam covering large sections of the river surface near drain',
        reporterName: 'Najafgarh Drain',
        location: { latitude: 28.6139, longitude: 77.2090 },
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=450&fit=crop',
        issueType: 'Plastic & garbage dumping',
        description: 'Large amounts of plastic waste and garbage dumped near riverbank',
        reporterName: 'Kalindi Kunj',
        location: { latitude: 28.5355, longitude: 77.3910 },
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'resolved'
    },
    {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&h=450&fit=crop',
        issueType: 'Industrial effluent',
        description: 'Colored effluent discharge from nearby industrial zone',
        reporterName: 'Okhla Barrage',
        location: { latitude: 28.5494, longitude: 77.3103 },
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '5',
        imageUrl: 'https://images.unsplash.com/photo-1583932358792-5a191e89e89b?w=800&h=450&fit=crop',
        issueType: 'Chemical contamination',
        description: 'Heavy metal contamination detected in water samples',
        reporterName: 'Yamuna Ghat',
        location: { latitude: 28.6692, longitude: 77.2506 },
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '6',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop',
        issueType: 'Illegal sand mining',
        description: 'Unauthorized sand extraction damaging river ecosystem',
        reporterName: 'Palwal Sector',
        location: { latitude: 28.1445, longitude: 77.3262 },
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'resolved'
    },
    {
        id: '7',
        imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=450&fit=crop',
        issueType: 'Oil spill',
        description: 'Oil leakage from industrial plant contaminating water',
        reporterName: 'Panipat Industrial Area',
        location: { latitude: 29.3909, longitude: 76.9635 },
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '8',
        imageUrl: 'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=800&h=450&fit=crop',
        issueType: 'Agricultural runoff',
        description: 'Pesticide contamination from nearby farmlands',
        reporterName: 'Sonipat Region',
        location: { latitude: 28.9931, longitude: 77.0151 },
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'resolved'
    },
    {
        id: '9',
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=450&fit=crop',
        issueType: 'Dead fish spotted',
        description: 'Large number of dead fish found floating in river section',
        reporterName: 'Mathura Ghat',
        location: { latitude: 27.4924, longitude: 77.6737 },
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '10',
        imageUrl: 'https://images.unsplash.com/photo-1586796676480-0ec72c928770?w=800&h=450&fit=crop',
        issueType: 'Construction debris',
        description: 'Building materials dumped directly into river',
        reporterName: 'Noida Sector 62',
        location: { latitude: 28.6271, longitude: 77.3651 },
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'resolved'
    },
    {
        id: '11',
        imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=450&fit=crop',
        issueType: 'Untreated hospital waste',
        description: 'Medical waste disposal near river bank',
        reporterName: 'Faridabad Medical District',
        location: { latitude: 28.4089, longitude: 77.3178 },
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    },
    {
        id: '12',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=450&fit=crop',
        issueType: 'Textile dye discharge',
        description: 'Colored water from textile factory entering river',
        reporterName: 'Panipat Textile Hub',
        location: { latitude: 29.3878, longitude: 76.9682 },
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
    }
];

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    useEffect(() => {
        fetchIssues();
    }, []);

    useEffect(() => {
        applyFilters();
        setCurrentPage(1); // Reset to first page when filters change
    }, [issues, filterStatus, searchQuery]);

    const fetchIssues = async () => {
        setIssues(mockIssues);
        calculateStats(mockIssues);
    };

    const calculateStats = (data) => {
        setStats({
            total: data.length,
            pending: data.filter(i => i.status === 'pending').length,
            resolved: data.filter(i => i.status === 'resolved').length
        });
    };

    const applyFilters = () => {
        let filtered = [...issues];

        if (filterStatus !== 'all') {
            filtered = filtered.filter(issue => issue.status === filterStatus);
        }

        if (searchQuery) {
            filtered = filtered.filter(issue =>
                issue.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                issue.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredIssues(filtered);
    };

    const updateIssueStatus = async (issueId, newStatus) => {
        // TODO: Replace with your actual API call to update status
        // await fetch(`YOUR_API_ENDPOINT/${issueId}`, {
        //   method: 'PATCH',
        //   body: JSON.stringify({ status: newStatus })
        // });

        const updatedIssues = issues.map(issue =>
            issue.id === issueId ? { ...issue, status: newStatus } : issue
        );
        setIssues(updatedIssues);
        calculateStats(updatedIssues);
        setSelectedIssue(prev => prev?.id === issueId ? { ...prev, status: newStatus } : prev);
    };

    const exportData = () => {
        const csvContent = [
            ['ID', 'Issue Type', 'Location', 'Coordinates', 'Status', 'Timestamp'],
            ...filteredIssues.map(issue => [
                issue.id,
                issue.issueType,
                issue.reporterName,
                `${issue.location.latitude}, ${issue.location.longitude}`,
                issue.status,
                new Date(issue.timestamp).toLocaleString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yamuna-pollution-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'critical': return '#EF4444';
            case 'high': return '#F59E0B';
            case 'medium': return '#FCD34D';
            default: return '#6B7280';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'critical': return <AlertCircle size={16} />;
            case 'high': return <AlertCircle size={16} />;
            case 'medium': return <Clock size={16} />;
            default: return <CheckCircle size={16} />;
        }
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return '1 day ago';
        return `${diffInDays} days ago`;
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredIssues.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedIssue(null); // Clear selection when changing pages
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setSelectedIssue(null);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSelectedIssue(null);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    {/* LEFT */}
                    <div className="header-left">
                        <div className="logo-wrap">
                            <img src={logo} alt="Yamuna Sense Logo" />
                        </div>

                        <div className="title-wrap">
                            <h1 className="dashboard-title">Yamuna Pollution Monitoring</h1>
                            <p className="dashboard-subtitle">
                                Real-time citizen-powered environmental dashboard
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="header-actions">
                        <button onClick={exportData} className="btn-export">
                            <Download size={18} />
                            <span>Export Report</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card stat-total">
                        {/* <div className="stat-icon">📊</div> */}
                        <div className="stat-content">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">Total Reports</div>
                        </div>
                    </div>
                    <div className="stat-card stat-pending">
                        {/* <div className="stat-icon">⏳</div> */}
                        <div className="stat-content">
                            <div className="stat-value">{stats.pending}</div>
                            <div className="stat-label">Pending</div>
                        </div>
                    </div>
                    <div className="stat-card stat-resolved">
                        {/* <div className="stat-icon">✅</div> */}
                        <div className="stat-content">
                            <div className="stat-value">{stats.resolved}</div>
                            <div className="stat-label">Resolved</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="controls-section">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by issue type, location, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <Filter size={18} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Issues List */}
                <div className="issues-section">
                    <h2 className="section-title">Recent Reports</h2>
                    <div className="issues-list">
                        {currentItems.map(issue => (
                            <div
                                key={issue.id}
                                className={`issue-card ${selectedIssue?.id === issue.id ? 'issue-card-active' : ''}`}
                                onClick={() => setSelectedIssue(issue)}
                            >
                                <div className="issue-main">
                                    <div className="issue-header-row">
                                        <h3 className="issue-title">{issue.issueType}</h3>
                                        <span className="issue-time">{getTimeAgo(issue.timestamp)}</span>
                                    </div>
                                    <p className="issue-location">
                                        <MapPin size={14} />
                                        {issue.reporterName}
                                    </p>
                                    <div className={`status-badge status-${issue.status}`}>
                                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredIssues.length === 0 && (
                            <div className="empty-state">
                                <AlertCircle size={48} />
                                <p>No pollution reports found matching your criteria</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {filteredIssues.length > 0 && totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                ← Previous
                            </button>

                            <div className="pagination-info">
                                <span className="pagination-text">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <span className="pagination-count">
                                    ({filteredIssues.length} total reports)
                                </span>
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                {selectedIssue && (
                    <div className="detail-panel">
                        <div className="detail-header">
                            <h2 className="detail-title">Issue Details</h2>
                            <button
                                onClick={() => setSelectedIssue(null)}
                                className="close-button"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="detail-content">
                            <img
                                src={selectedIssue.imageUrl}
                                alt={selectedIssue.issueType}
                                className="detail-image"
                            />

                            <div className="detail-section">
                                <label className="detail-label">Issue Type</label>
                                <p className="detail-value">{selectedIssue.issueType}</p>
                            </div>

                            <div className="detail-section">
                                <label className="detail-label">Description</label>
                                <p className="detail-value">
                                    {selectedIssue.description || 'No description provided'}
                                </p>
                            </div>

                            <div className="detail-section">
                                <label className="detail-label">Location</label>
                                <p className="detail-value">{selectedIssue.reporterName}</p>
                            </div>

                            <div className="detail-section">
                                <label className="detail-label">Coordinates</label>
                                <p className="detail-value">
                                    Lat: {selectedIssue.location.latitude}, Long: {selectedIssue.location.longitude}
                                </p>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedIssue.location.latitude},${selectedIssue.location.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="map-link"
                                >
                                    <MapPin size={16} />
                                    View on Map
                                </a>
                            </div>

                            <div className="detail-section">
                                <label className="detail-label">Reported On</label>
                                <p className="detail-value">
                                    {new Date(selectedIssue.timestamp).toLocaleString()}
                                </p>
                            </div>

                            <div className="detail-section">
                                <label className="detail-label">Status</label>
                                <div className="status-action-buttons">
                                    <button
                                        onClick={() => updateIssueStatus(selectedIssue.id, 'pending')}
                                        className={`status-action-btn btn-pending ${selectedIssue.status === 'pending' ? 'active' : ''}`}
                                        disabled={selectedIssue.status === 'pending'}
                                    >
                                        <Clock size={18} />
                                        Mark as Pending
                                    </button>
                                    <button
                                        onClick={() => updateIssueStatus(selectedIssue.id, 'resolved')}
                                        className={`status-action-btn btn-resolved ${selectedIssue.status === 'resolved' ? 'active' : ''}`}
                                        disabled={selectedIssue.status === 'resolved'}
                                    >
                                        <CheckCircle size={18} />
                                        Mark as Resolved
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;