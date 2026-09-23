import MemberCard from "../components/MemberCard";
import { getMembers, getShoutouts } from "../lib/members";

// Re-read the data files on every request so `npm run dev` always shows the latest.
export const dynamic = "force-dynamic";

export default function Home() {
  const members = getMembers();
  const shoutouts = getShoutouts();

  return (
    <main className="wall">
      <header className="wall-header">
        <h1>Team Wall</h1>
        <p className="wall-sub">Every card here arrived through a pull request.</p>
      </header>

      <section className="cards" aria-label="Team members">
        {members.map((member) => (
          <MemberCard key={member.file} member={member} />
        ))}
      </section>

      <section className="shoutouts" aria-labelledby="shoutouts-title">
        <h2 id="shoutouts-title">Shoutouts</h2>
        <ul>
          {shoutouts.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
