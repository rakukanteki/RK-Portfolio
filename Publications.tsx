"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, ArrowUpRight, FileText, RotateCcw } from "lucide-react";
import { publications, filterPublications } from "@/content/publications";
import { profile, asset } from "@/content/profile";
import { SectionHeading } from "./Shared";
const initial = {
  query: "",
  status: "All",
  type: "All",
  year: "All",
  area: "All",
};
export function Publications() {
  const [filters, setFilters] = useState(initial);
  const visible = filterPublications(publications, filters);
  const update = (key: keyof typeof initial, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));
  return (
    <section id="publications" className="section publications-section">
      <div className="container">
        <SectionHeading
          number="04"
          kicker="PUBLICATIONS & MANUSCRIPTS"
          title="A growing body of work."
          description="Multimodal intelligence, physical understanding, and reliable autonomous systems."
        />
        <div className="publication-toolbar">
          <label className="search-box">
            <Search size={18} />
            <span className="sr-only">Search publications</span>
            <input
              value={filters.query}
              onChange={(e) => update("query", e.target.value)}
              placeholder="Search titles, authors, or research areas…"
              type="search"
            />
          </label>
          <div className="filter-selects">
            {(
              [
                {
                  key: "type",
                  label: "Publication type",
                  values: ["All", ...new Set(publications.map((p) => p.type))],
                },
                {
                  key: "year",
                  label: "Year",
                  values: [
                    "All",
                    ...new Set(
                      publications.map((p) =>
                        String(p.year ?? "Not specified"),
                      ),
                    ),
                  ],
                },
                {
                  key: "area",
                  label: "Research area",
                  values: ["All", ...new Set(publications.map((p) => p.area))],
                },
              ] as const
            ).map((f) => (
              <label key={f.key}>
                <span className="sr-only">{f.label}</span>
                <select
                  value={filters[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                >
                  {f.values.map((v) => (
                    <option key={v} value={v}>
                      {v === "All"
                        ? `All ${f.key === "type" ? "types" : f.key === "year" ? "years" : "areas"}`
                        : v}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
        <div
          className="publication-status"
          role="group"
          aria-label="Filter by publication status"
        >
          {[
            "All",
            "Published",
            "Accepted",
            "Minor Revision",
            "Under Review",
            "Not specified",
          ].map((s) => (
            <button
              key={s}
              aria-pressed={filters.status === s}
              onClick={() => update("status", s)}
            >
              {s === "All" ? "All work" : s}
              <span>
                {s === "All"
                  ? publications.length
                  : publications.filter((p) => p.status === s).length}
              </span>
            </button>
          ))}
        </div>
        <div className="results-meta">
          <span role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? "entry" : "entries"}
          </span>
          <span>Publication status follows the supplied CV.</span>
        </div>
        <div className="publication-list">
          {visible.map((p) => (
            <article className="publication" key={p.id}>
              <div
                className={`publication-art ${p.image ? "" : "abstract-art"}`}
              >
                {p.image ? (
                  <Image
                    src={asset(p.image)}
                    alt={`Supplied research figure for ${p.title}`}
                    fill
                    sizes="160px"
                  />
                ) : (
                  <>
                    <FileText size={30} />
                    <span>
                      {p.type === "Journal Articles"
                        ? "RESEARCH"
                        : p.type === "Conference Papers"
                          ? "CONFERENCE"
                          : p.type === "Book Chapters"
                            ? "CHAPTER"
                            : "DESIGN REPORT"}
                    </span>
                  </>
                )}
              </div>
              <div className="publication-content">
                <div className="publication-meta">
                  <span
                    className={`status-pill status-${p.status.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {p.status === "Not specified"
                      ? "Status not specified"
                      : p.status}
                  </span>
                  <span>
                    {p.type} {p.year ? `· ${p.year}` : ""}
                  </span>
                </div>
                <h3>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="authors">
                  {p.authors.map((a, i) => (
                    <span key={`${a}-${i}`}>
                      {i > 0 ? "; " : ""}
                      {a === profile.name ? <strong>{a}</strong> : a}
                    </span>
                  ))}
                </p>
                <p className="venue">
                  {p.venue}
                  {p.details ? ` · ${p.details}` : ""}
                </p>
                {!p.authorsComplete && (
                  <p className="source-note">
                    Author list abbreviated in the supplied CV.
                  </p>
                )}
                {p.url && (
                  <a
                    className="paper-link"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read paper <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <Search size={28} />
            <h3>No matching publications</h3>
            <p>Try a broader search or reset your filters.</p>
            <button
              className="button secondary"
              onClick={() => setFilters(initial)}
            >
              <RotateCcw size={16} /> Reset filters
            </button>
          </div>
        )}
        <p className="library-note">
          Accepted papers are listed separately from published work. Reports and
          the book chapter have no explicit publication status in the CV.
        </p>
      </div>
    </section>
  );
}
