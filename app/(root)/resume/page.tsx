import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileText, 
  Star, 
  Sparkles, 
  Download, 
  Eye,
  TrendingUp,
  MessageSquare
} from "lucide-react";

async function ResumePage() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>AI-Powered Resume Builder & Analyzer</h2>
          <p className="text-lg">
            Upload your CV, get instant feedback, scores, and generate AI-optimized resumes
          </p>

          <div className="flex gap-4 max-sm:flex-col">
            <Button className="btn-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload CV
            </Button>
            <Button className="btn-secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI CV
            </Button>
          </div>
        </div>

        <div className="max-sm:hidden">
          <FileText className="w-32 h-32 text-primary-200" />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Resume</h2>
        
        <div className="resume-overview">
          <div className="resume-card">
            <div className="resume-card-header">
              <FileText className="w-8 h-8 text-primary-200" />
              <div>
                <h3>Current Resume</h3>
                <p>Last updated: 2 days ago</p>
              </div>
              <div className="resume-score">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold">8.5/10</span>
              </div>
            </div>
            
            <div className="resume-actions">
              <Button className="btn-primary">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="btn-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Update
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>AI Analysis & Feedback</h2>
        
        <div className="analysis-grid">
          <div className="analysis-card">
            <div className="analysis-header">
              <TrendingUp className="w-6 h-6 text-success-100" />
              <h3>Overall Score</h3>
            </div>
            <div className="score-breakdown">
              <div className="score-item">
                <span>Content Quality</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: '85%' }}></div>
                </div>
                <span>8.5/10</span>
              </div>
              <div className="score-item">
                <span>Formatting</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: '90%' }}></div>
                </div>
                <span>9.0/10</span>
              </div>
              <div className="score-item">
                <span>Keywords</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: '75%' }}></div>
                </div>
                <span>7.5/10</span>
              </div>
            </div>
          </div>

          <div className="analysis-card">
            <div className="analysis-header">
              <MessageSquare className="w-6 h-6 text-primary-200" />
              <h3>AI Feedback</h3>
            </div>
            <div className="feedback-content">
              <div className="feedback-item positive">
                <h4>✅ Strengths</h4>
                <ul>
                  <li>Clear project descriptions</li>
                  <li>Good use of action verbs</li>
                  <li>Consistent formatting</li>
                </ul>
              </div>
              <div className="feedback-item improvement">
                <h4>🔧 Improvements</h4>
                <ul>
                  <li>Add more quantifiable achievements</li>
                  <li>Include relevant certifications</li>
                  <li>Optimize for ATS keywords</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>AI Resume Generator</h2>
        
        <div className="ai-generator">
          <div className="generator-card">
            <div className="generator-header">
              <Sparkles className="w-8 h-8 text-primary-200" />
              <div>
                <h3>Generate AI-Optimized Resume</h3>
                <p>Create a professional resume tailored to your target role</p>
              </div>
            </div>
            
            <div className="generator-form">
              <div className="form-group">
                <label>Target Role</label>
                <input 
                  type="text" 
                  placeholder="e.g., Senior Software Engineer"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select className="form-input">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                  <option>Lead/Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label>Industry</label>
                <select className="form-input">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              
              <Button className="btn-primary w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResumePage; 