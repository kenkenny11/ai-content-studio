import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Lightbulb,
  Search,
  CalendarDays,
  Library,
  Settings,
  Menu,
  X,
  Copy,
  RefreshCw,
  Save,
  ChevronDown,
  Check,
} from "lucide-react";

const formats = [
  "Facebook Post",
  "Carousel",
  "Reel Script",
  "Facebook Story",
];

const contentTypes = [
  "AI Tools",
  "Tech Hacks",
  "Digital Productivity",
  "AI News",
  "Creator Tools",
  "Business Tech",
  "AI Comparisons",
];

const starterIdeas = [
  "5 AI tools that can save a US remote worker hours every week",
  "AI tools every content creator should test",
  "7 free productivity tools hiding in plain sight",
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("Facebook Post");
  const [contentType, setContentType] = useState("AI Tools");
  const [tone, setTone] = useState("Conversational");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [saved, setSaved] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateDemo = () => {
    if (!topic.trim()) {
      setTopic("5 AI tools that can save you time every week");
    }

    setLoading(true);

    setTimeout(() => {
      const selectedTopic =
        topic.trim() || "5 AI tools that can save you time every week";

      setGenerated({
        hook: `You're probably spending too much time on tasks that AI can handle.`,
        post: `If you work online, study, create content or run a small business, there are simple AI tools that can remove repetitive work from your day.\n\nFor this post, focus on: ${selectedTopic}.\n\nThe best approach isn't to use AI for everything. Pick one repetitive task, test one tool and measure the time you save.\n\nStart small. Build a workflow that actually fits the way you work.`,
        cta: "Which task would you automate first?",
        image:
          "Create a realistic modern US home-office scene with a laptop showing an AI productivity dashboard, smartphone beside the laptop, natural lighting, clean professional environment, no visible brand logos, vertical Facebook composition.",
        reel: `HOOK: Stop doing repetitive work manually.\n\nBODY: There are AI tools that can handle research, writing, organization and other repetitive tasks in minutes.\n\nVALUE: Pick one task you repeat every week and find an AI tool that can reduce the manual work.\n\nCTA: Follow for practical AI and productivity tools.`,
        carousel: [
          "STOP WASTING HOURS ON REPETITIVE WORK",
          "The problem: too many small tasks eat your day.",
          "AI can help with research, writing and organization.",
          "Pick one repetitive task and automate part of it.",
          "Test the workflow for one week.",
          "Keep what saves you time. Drop what doesn't.",
          "Which task would you automate first?",
        ],
      });

      setLoading(false);
    }, 900);
  };

  const copyPost = async () => {
    if (!generated) return;

    const text = `${generated.hook}\n\n${generated.post}\n\n${generated.cta}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const saveContent = () => {
    if (!generated) return;

    setSaved((items) => [
      {
        id: Date.now(),
        topic: topic || "AI productivity",
        format,
        created: new Date().toLocaleDateString(),
        content: generated,
      },
      ...items,
    ]);
  };

  const generateIdeas = () => {
    setActivePage("Ideas");
    setSidebarOpen(false);
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Generate", icon: Sparkles },
    { name: "Ideas", icon: Lightbulb },
    { name: "Research", icon: Search },
    { name: "Calendar", icon: CalendarDays },
    { name: "Content Library", icon: Library },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={19} />
          </div>

          <div>
            <div className="brand-name">AI Content</div>
            <div className="brand-subtitle">STUDIO</div>
          </div>

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "nav-active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="plan-card">
            <div className="plan-label">CONTENT ENGINE</div>
            <p>US audience mode</p>
            <span>AI Tools · Tech · Productivity</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="topbar-title">
            <span>{activePage}</span>
          </div>

          <div className="audience-pill">
            <span className="status-dot" />
            US Audience
          </div>
        </header>

        <div className="page">
          {activePage === "Dashboard" && (
            <>
              <section className="hero">
                <div>
                  <p className="eyebrow">AI CONTENT ENGINE</p>
                  <h1>Create content people want to save and share.</h1>
                  <p className="hero-copy">
                    Generate original Facebook posts, carousels, reels and
                    stories for your US-focused technology page.
                  </p>
                </div>

                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => setActivePage("Generate")}
                  >
                    <Sparkles size={18} />
                    Create Content
                  </button>

                  <button className="secondary-button" onClick={generateIdeas}>
                    <Lightbulb size={18} />
                    Find Ideas
                  </button>
                </div>
              </section>

              <section className="stats-grid">
                <div className="stat-card">
                  <span>NICHE</span>
                  <strong>AI + Tech</strong>
                  <small>Productivity focused</small>
                </div>

                <div className="stat-card">
                  <span>AUDIENCE</span>
                  <strong>United States</strong>
                  <small>Professionals & creators</small>
                </div>

                <div className="stat-card">
                  <span>SAVED</span>
                  <strong>{saved.length}</strong>
                  <small>Content pieces</small>
                </div>

                <div className="stat-card">
                  <span>FORMATS</span>
                  <strong>4</strong>
                  <small>Post · Reel · Story · Carousel</small>
                </div>
              </section>

              <section className="dashboard-grid">
                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">QUICK CREATE</p>
                      <h2>Start with an idea</h2>
                    </div>
                  </div>

                  <div className="quick-list">
                    {starterIdeas.map((idea) => (
                      <button
                        key={idea}
                        onClick={() => {
                          setTopic(idea);
                          setActivePage("Generate");
                        }}
                      >
                        <span>{idea}</span>
                        <ChevronDown size={17} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">CONTENT MIX</p>
                      <h2>What you can create</h2>
                    </div>
                  </div>

                  <div className="mix-list">
                    {contentTypes.slice(0, 6).map((item, index) => (
                      <div className="mix-row" key={item}>
                        <span>{item}</span>
                        <div className="mix-bar">
                          <div
                            style={{
                              width: `${75 - index * 7}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {activePage === "Generate" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">CONTENT GENERATOR</p>
                  <h1>Turn an idea into a content package.</h1>
                </div>
              </div>

              <div className="generator-layout">
                <div className="panel generator-panel">
                  <label>Topic or idea</label>

                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Example: 5 AI tools that save remote workers time..."
                    rows="5"
                  />

                  <div className="form-grid">
                    <div>
                      <label>Format</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                      >
                        {formats.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label>Content type</label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                      >
                        {contentTypes.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label>Audience</label>
                      <select defaultValue="US Audience">
                        <option>US Audience</option>
                        <option>US Professionals</option>
                        <option>US Creators</option>
                        <option>US Students</option>
                        <option>US Small Business</option>
                      </select>
                    </div>

                    <div>
                      <label>Tone</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                      >
                        <option>Conversational</option>
                        <option>Professional</option>
                        <option>Educational</option>
                        <option>Bold</option>
                        <option>Friendly</option>
                      </select>
                    </div>
                  </div>

                  <div className="checks">
                    <span>
                      <Check size={15} /> Original angle
                    </span>
                    <span>
                      <Check size={15} /> US examples
                    </span>
                    <span>
                      <Check size={15} /> Strong CTA
                    </span>
                    <span>
                      <Check size={15} /> Image prompt
                    </span>
                  </div>

                  <button
                    className="primary-button full-button"
                    onClick={generateDemo}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="spin" size={18} />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>

                <div className="panel tips-panel">
                  <p className="eyebrow">EDITORIAL RULES</p>
                  <h2>Built for original content</h2>

                  <ul>
                    <li>Useful information before promotion.</li>
                    <li>No invented statistics or fake claims.</li>
                    <li>No copied creator posts.</li>
                    <li>Natural US audience language.</li>
                    <li>Clear reason to comment or save.</li>
                  </ul>
                </div>
              </div>

              {generated && (
                <div className="results">
                  <div className="result-header">
                    <div>
                      <p className="eyebrow">GENERATED PACKAGE</p>
                      <h2>{topic || "AI productivity content"}</h2>
                    </div>

                    <div className="result-actions">
                      <button className="secondary-button" onClick={saveContent}>
                        <Save size={17} />
                        Save
                      </button>

                      <button className="secondary-button" onClick={copyPost}>
                        {copied ? <Check size={17} /> : <Copy size={17} />}
                        {copied ? "Copied" : "Copy Post"}
                      </button>

                      <button className="secondary-button" onClick={generateDemo}>
                        <RefreshCw size={17} />
                        Regenerate
                      </button>
                    </div>
                  </div>

                  <div className="content-grid">
                    <article className="content-card hook-card">
                      <span className="content-label">HOOK</span>
                      <h3>{generated.hook}</h3>
                    </article>

                    <article className="content-card">
                      <span className="content-label">FACEBOOK POST</span>
                      <p className="preformatted">{generated.post}</p>
                    </article>

                    <article className="content-card">
                      <span className="content-label">CTA</span>
                      <h3>{generated.cta}</h3>
                    </article>

                    <article className="content-card">
                      <span className="content-label">IMAGE PROMPT</span>
                      <p>{generated.image}</p>
                    </article>

                    <article className="content-card">
                      <span className="content-label">REEL SCRIPT</span>
                      <p className="preformatted">{generated.reel}</p>
                    </article>

                    <article className="content-card">
                      <span className="content-label">CAROUSEL</span>

                      <div className="carousel-slides">
                        {generated.carousel.map((slide, index) => (
                          <div className="slide" key={slide}>
                            <span>{index + 1}</span>
                            <p>{slide}</p>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              )}
            </section>
          )}

          {activePage === "Ideas" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">IDEA GENERATOR</p>
                  <h1>Find your next content ideas.</h1>
                  <p>
                    Generate topics around AI, technology and digital
                    productivity.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Generate")}
                >
                  <Sparkles size={18} />
                  Create From Idea
                </button>
              </div>

              <div className="idea-grid">
                {[
                  "7 AI tools that can save a small business hours every week",
                  "AI tools for people working from home",
                  "5 free tools every college student should know",
                  "The easiest repetitive task to automate this week",
                  "AI tools for creators who make Facebook content",
                  "5 digital habits that waste your time",
                  "AI tools for freelancers",
                  "What AI can automate for a small business",
                  "Useful browser extensions for productivity",
                  "AI mistakes beginners should avoid",
                ].map((idea, index) => (
                  <button
                    className="idea-card"
                    key={idea}
                    onClick={() => {
                      setTopic(idea);
                      setActivePage("Generate");
                    }}
                  >
                    <span>0{index + 1}</span>
                    <strong>{idea}</strong>
                    <small>Use this idea →</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activePage === "Content Library" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">YOUR CONTENT</p>
                  <h1>Content Library</h1>
                  <p>Saved content from this browser.</p>
                </div>
              </div>

              {saved.length === 0 ? (
                <div className="empty-state">
                  <Library size={35} />
                  <h2>No saved content yet</h2>
                  <p>Generate something and tap Save.</p>
                  <button
                    className="primary-button"
                    onClick={() => setActivePage("Generate")}
                  >
                    Create Content
                  </button>
             </
