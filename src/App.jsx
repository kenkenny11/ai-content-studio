          {activePage === "Ideas" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">
                    IDEA GENERATOR
                  </p>

                  <h1>
                    Find your next content ideas.
                  </h1>

                  <p>
                    Generate topics around AI,
                    technology and digital
                    productivity.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() =>
                    setActivePage("Generate")
                  }
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
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <strong>{idea}</strong>

                    <small>Use this idea →</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activePage === "Research" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">
                    RESEARCH ENGINE
                  </p>

                  <h1>
                    Research Mode
                  </h1>

                  <p>
                    Current web research and source
                    checking will be connected here.
                  </p>
                </div>
              </div>

              <div className="coming-soon">
                <Search size={35} />

                <h2>Research Coming Next</h2>

                <p>
                  This section will research current AI,
                  technology and productivity topics
                  before content generation.
                </p>
              </div>
            </section>
          )}

          {activePage === "Calendar" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">
                    CONTENT PLANNER
                  </p>

                  <h1>
                    Content Calendar
                  </h1>

                  <p>
                    Plan and organize your upcoming
                    Facebook content.
                  </p>
                </div>
              </div>

              <div className="coming-soon">
                <CalendarDays size={35} />

                <h2>Calendar Coming Next</h2>

                <p>
                  Scheduling and content planning will
                  be added here.
                </p>
              </div>
            </section>
          )}

          {activePage === "Content Library" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">
                    YOUR CONTENT
                  </p>

                  <h1>
                    Content Library
                  </h1>

                  <p>
                    Saved content from this browser.
                  </p>
                </div>
              </div>

              {saved.length === 0 ? (
                <div className="empty-state">
                  <Library size={35} />

                  <h2>
                    No saved content yet
                  </h2>

                  <p>
                    Generate something and tap Save.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() =>
                      setActivePage("Generate")
                    }
                  >
                    <Sparkles size={18} />
                    Create Content
                  </button>
                </div>
              ) : (
                <div className="library-grid">
                  {saved.map((item) => (
                    <article
                      className="library-card"
                      key={item.id}
                    >
                      <div className="library-card-top">
                        <span className="content-label">
                          {item.format}
                        </span>

                        <small>
                          {item.created}
                        </small>
                      </div>

                      <h3>{item.topic}</h3>

                      <p>
                        {item.content?.hook}
                      </p>

                      <button
                        className="secondary-button"
                        onClick={async () => {
                          try {
                            const text = [
                              item.content?.hook,
                              item.content?.post,
                              item.content?.cta,
                            ]
                              .filter(Boolean)
                              .join("\n\n");

                            await navigator.clipboard.writeText(
                              text
                            );

                            alert(
                              "Content copied."
                            );
                          } catch {
                            alert(
                              "Could not copy content."
                            );
                          }
                        }}
                      >
                        <Copy size={16} />
                        Copy
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {activePage === "Settings" && (
            <section>
              <div className="section-header">
                <div>
                  <p className="eyebrow">
                    APP SETTINGS
                  </p>

                  <h1>Settings</h1>

                  <p>
                    AI Content Studio configuration.
                  </p>
                </div>
              </div>

              <div className="settings-grid">
                <div className="panel">
                  <p className="eyebrow">
                    TARGET AUDIENCE
                  </p>

                  <h2>United States</h2>

                  <p>
                    Content is currently configured
                    for a US-focused audience.
                  </p>
                </div>

                <div className="panel">
                  <p className="eyebrow">
                    CONTENT NICHE
                  </p>

                  <h2>AI Tools + Tech</h2>

                  <p>
                    AI tools, technology, productivity,
                    creator tools and business tech.
                  </p>
                </div>

                <div className="panel">
                  <p className="eyebrow">
                    AI CONNECTION
                  </p>

                  <h2>OpenRouter</h2>

                  <p>
                    AI generation is handled through
                    the secure server-side API endpoint.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
