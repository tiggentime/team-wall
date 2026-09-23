export default function MemberCard({ member }) {
  return (
    <article className="card" style={{ "--accent": member.color }}>
      <div className="card-emoji" aria-hidden="true">
        {member.emoji}
      </div>
      <h2 className="card-name">{member.name}</h2>
      <p className="card-role">{member.role}</p>
      <p className="card-fact">{member.funFact}</p>
      <p className="card-handle">@{member.github}</p>
    </article>
  );
}
