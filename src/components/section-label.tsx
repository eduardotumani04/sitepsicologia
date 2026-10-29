export function SectionLabel({ number, children }: { number?: string; children: React.ReactNode }) {
  return <p className="section-label">{number && <><span aria-hidden="true">{number}</span><span className="label-line" aria-hidden="true" /></>}{children}</p>;
}
