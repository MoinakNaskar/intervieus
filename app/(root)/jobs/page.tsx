import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Building2, Clock, DollarSign } from "lucide-react";

async function JobsPage() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Find Your Perfect Job Match</h2>
          <p className="text-lg">
            Discover opportunities tailored to your skills and experience with AI-powered job matching
          </p>

          <div className="flex gap-4 max-sm:flex-col">
            <Button className="btn-primary">
              <Search className="w-4 h-4 mr-2" />
              Search Jobs
            </Button>
            <Button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              AI Match
            </Button>
          </div>
        </div>

        <div className="max-sm:hidden">
          <Building2 className="w-32 h-32 text-primary-200" />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <div className="flex items-center justify-between">
          <h2>Recommended Jobs</h2>
          <Button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="jobs-grid">
          {/* Sample Job Cards */}
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <div key={job} className="job-card">
              <div className="job-card-header">
                <div className="job-company">
                  <Building2 className="w-8 h-8 text-primary-200" />
                  <div>
                    <h3 className="job-title">Senior Software Engineer</h3>
                    <p className="job-company-name">TechCorp Inc.</p>
                  </div>
                </div>
                <div className="job-match-badge">
                  <span>95% Match</span>
                </div>
              </div>

              <div className="job-details">
                <div className="job-detail">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="job-detail">
                  <Clock className="w-4 h-4" />
                  <span>Full-time</span>
                </div>
                <div className="job-detail">
                  <DollarSign className="w-4 h-4" />
                  <span>$120k - $180k</span>
                </div>
              </div>

              <div className="job-skills">
                <span className="job-skill">React</span>
                <span className="job-skill">TypeScript</span>
                <span className="job-skill">Node.js</span>
              </div>

              <div className="job-actions">
                <Button className="btn-primary">Apply Now</Button>
                <Button className="btn-secondary">Save Job</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>AI Job Insights</h2>
        <div className="ai-insights-grid">
          <div className="ai-insight-card">
            <h3>Skills Gap Analysis</h3>
            <p>Based on your profile, consider learning:</p>
            <ul className="mt-2">
              <li>• Docker & Kubernetes</li>
              <li>• AWS/Azure Cloud</li>
              <li>• System Design</li>
            </ul>
          </div>
          <div className="ai-insight-card">
            <h3>Salary Insights</h3>
            <p>For your experience level in this region:</p>
            <div className="salary-range">
              <span className="text-2xl font-bold text-primary-200">$130k - $160k</span>
              <span className="text-sm text-light-100">Average Range</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobsPage; 