const modules = [
  { route: '/app/today', name: 'Today', desc: 'Assigned leads, overdue tasks, missed calls, at-risk opportunities, agent recommendations, integration alerts.' },
  { route: '/app/accounts', name: 'Accounts', desc: 'Companies, people, pipeline value, activity recency, source, and health.' },
  { route: '/app/leads/:id', name: 'Leads', desc: 'Qualification, score, full touch history, conversion timeline, Open-in-Close handoff.' },
  { route: '/app/opportunities', name: 'Opportunities', desc: 'Pipeline board, stage history, risk signals, provider sync state.' },
  { route: '/app/calls', name: 'Calls', desc: 'Normalized call intelligence: dispositions, recordings, transcripts, QA, source journey.' },
  { route: '/app/campaigns', name: 'Campaigns & Attribution', desc: 'Campaign hierarchy, touches, conversions, model comparison, data completeness.' },
  { route: '/app/agents', name: 'Agents', desc: 'Agent catalog, runs, evaluations, and versions — typed tools with approval gates.' },
  { route: '/app/approvals', name: 'Approvals', desc: 'High-impact actions with evidence, proposed change, approve / reject / edit.' },
  { route: '/app/assets', name: 'Assets', desc: 'TNAS-backed assets: metadata, checksums, retention, authorized preview.' },
  { route: '/app/admin/integrations', name: 'Integrations', desc: 'Close, n8n, Asana, Slack, ad platforms, model gateway — status, lag, backlog.' },
  { route: '/app/admin/system', name: 'System health', desc: 'Queues, dead letters, webhook lag, backups, vector ingestion, deploy version.' },
];

const waves = [
  ['Wave 0', 'Foundation: repos, CI/CD, OIDC, tenancy, secrets, observability'],
  ['Wave 1', 'Canonical CRM: schema, tracking & attribution, Close adapter'],
  ['Wave 2', 'Operator app: MAIOS application + Phase 1 call intelligence'],
  ['Wave 3', 'Intelligence: vector ingestion, agents, approvals, n8n workflows'],
  ['Wave 4', 'Migration: GHL retirement, hardening, production launch'],
  ['Wave 5', 'Owned communications: SIP lab, softphone, messaging, DNI'],
  ['Wave 6', 'Optional owned CRM: Close becomes replaceable'],
];

export default function Home() {
  return (
    <main>
      <header>
        <p className="kicker">Marketing Powered</p>
        <h1>MAIOS</h1>
        <p className="lede">
          The company control plane: canonical CRM context, journey and attribution
          evidence, normalized communications, agent recommendations, approvals, assets,
          and integration health — with Close as the Phase&nbsp;1 execution surface.
        </p>
        <p className="badge">Wave 0 — engineering foundation scaffold</p>
      </header>

      <section>
        <h2>Application modules <span className="muted">(plan §7.2)</span></h2>
        <div className="grid">
          {modules.map((m) => (
            <article key={m.route}>
              <h3>{m.name}</h3>
              <code>{m.route}</code>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Delivery waves <span className="muted">(plan §17)</span></h2>
        <ol>
          {waves.map(([w, d]) => (
            <li key={w}>
              <strong>{w}</strong> — {d}
            </li>
          ))}
        </ol>
      </section>

      <footer>
        <p>
          MAIOS owns the canonical database, attribution history, agent runtime, and
          business rules. Every integration sits behind provider interfaces so the current
          provider stays easy to remove and the next one easy to add.
        </p>
      </footer>
    </main>
  );
}
