import ProjectHeader from '../components/ProjectHeader.jsx'

export default function ProjectHinge() {
  return (
    <section className="cs">
      <div className="cs-inner">
        <div className="cs-top">
          <ProjectHeader title="I Put Hinge on Trial" slug="i-puthinge-on-trial" year="2025" />
          <div className="cs-hero"><img src="/media/k6NBXruewwWqpa9nPR7gWJX7BOk.png" alt="" /></div>
        </div>
        <div className="rt" style={{ paddingBottom: 88 }}>
          <p>
            Hinge calls itself "designed to be deleted" built for authentic relationships, not endless swipes. I wanted to know if
            that authenticity holds up for everyone, so I audited it against WCAG 2.2, alongside real user feedback and reporting on
            bias in dating apps.
          </p>
          <p>The audit's done. The redesign actually fixing what I found is next.</p>
          <p>Full case study, with redesign, coming soon.</p>
        </div>
      </div>
    </section>
  )
}
