import React, { useState } from 'react';
import { Bell, X, MessageSquare, AlertTriangle, CheckCircle, Send } from 'lucide-react';

interface CitizenAlertsModuleProps {
  alerts: string[];
  setAlerts: React.Dispatch<React.SetStateAction<string[]>>;
}

export function CitizenAlertsModule({ alerts, setAlerts }: CitizenAlertsModuleProps) {
  const [feedback, setFeedback] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const handleDismissAlert = (index: number) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      // In a real app, this would be sent to a server
      console.log('Citizen feedback submitted:', feedback);
      setFeedback('');
      // Show confirmation
      alert('Thank you for your feedback! Your message has been received.');
    }
  };

  const citizenReports = [
    {
      id: '1',
      type: 'traffic',
      title: 'Traffic Light Malfunction',
      location: 'Main St & 5th Ave',
      status: 'investigating',
      timestamp: '2 hours ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'waste',
      title: 'Overflowing Garbage Bin',
      location: 'Central Park North',
      status: 'resolved',
      timestamp: '4 hours ago',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'air-quality',
      title: 'Unusual Odor Reported',
      location: 'Industrial District',
      status: 'pending',
      timestamp: '1 day ago',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Bell className="w-8 h-8 text-blue-400" />
            <span>Citizen Alerts & Engagement</span>
          </h2>
          <p className="text-blue-200 mt-1">Real-time alerts and citizen feedback system</p>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{alerts.length} Active Alerts</span>
          </div>
        </div>
      </div>

      {/* Active System Alerts */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <span>System Alerts</span>
        </h3>
        
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-green-300 font-medium">All systems operating normally</p>
            <p className="text-blue-200 text-sm">No active alerts at this time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{alert}</p>
                    <p className="text-orange-200 text-sm">Just now</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDismissAlert(index)}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Citizen Reports */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <span>Citizen Reports</span>
        </h3>
        
        <div className="space-y-4">
          {citizenReports.map((report) => (
            <div 
              key={report.id} 
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedAlert === report.id
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
              onClick={() => setSelectedAlert(selectedAlert === report.id ? null : report.id)}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-white">{report.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      report.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-blue-200 text-sm">📍 {report.location}</p>
                  <p className="text-blue-300 text-xs">{report.timestamp}</p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  report.status === 'resolved' ? 'bg-green-500/20 text-green-300' :
                  report.status === 'investigating' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {report.status}
                </div>
              </div>
              
              {selectedAlert === report.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-blue-200 text-sm mb-3">Report details and actions taken:</p>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white text-sm">
                      {report.status === 'resolved' ? 
                        'Issue has been resolved. Maintenance team completed repairs and verified system functionality.' :
                        report.status === 'investigating' ?
                        'Investigation in progress. Field team dispatched to assess the situation.' :
                        'Report received and queued for review. Expected response within 24 hours.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Citizen Feedback Form */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <Send className="w-5 h-5 text-purple-400" />
          <span>Submit Feedback</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Report an issue or provide feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe the issue, location, and any relevant details..."
              className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/20 bg-white/10 text-blue-500" />
                <span className="text-sm text-blue-200">Anonymous report</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-white/20 bg-white/10 text-blue-500" />
                <span className="text-sm text-blue-200">Request follow-up</span>
              </label>
            </div>
            
            <button
              onClick={handleSubmitFeedback}
              disabled={!feedback.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Engagement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-blue-300 mb-2">Reports This Month</h4>
          <p className="text-2xl font-bold text-white">147</p>
          <p className="text-sm text-blue-200">+23% from last month</p>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-green-300 mb-2">Resolved Issues</h4>
          <p className="text-2xl font-bold text-white">134</p>
          <p className="text-sm text-green-200">91% resolution rate</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-purple-300 mb-2">Avg Response Time</h4>
          <p className="text-2xl font-bold text-white">4.2h</p>
          <p className="text-sm text-purple-200">-1.3h improvement</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-orange-300 mb-2">Citizen Satisfaction</h4>
          <p className="text-2xl font-bold text-white">4.7/5</p>
          <p className="text-sm text-orange-200">Based on 89 ratings</p>
        </div>
      </div>
    </div>
  );
}