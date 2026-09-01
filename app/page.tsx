'use client';

import { useEffect, useMemo, useState } from 'react';
import { FULL_FILM_ID, scenes, TEXT_URL } from './data';

type Answers = Record<number, string>;

const TOTAL = scenes.reduce((sum, scene) => sum + scene.questions.length, 0);

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${minutes}:${String(secs).padStart(2, '0')}`;
}

function classify(question: string) {
  const lower = question.toLowerCase();
  if (/persönlich|kennen sie|was halten sie|recherchieren|faktencheck|aktuell/.test(lower)) return 'Transfer';
  if (/interpretieren|analysieren|erläutern|erklären|vergleichen|kommentieren/.test(lower)) return 'Analyse';
  return 'Erschließen';
}

function downloadWork(answers: Answers, done: number[]) {
  const lines = [
    '# Faust Leseraum – Arbeitsstand',
    '',
    `Exportiert am ${new Date().toLocaleString('de-CH')}`,
    '',
  ];
  for (const scene of scenes) {
    lines.push(`## ${scene.title}`, '');
    for (const question of scene.questions) {
      lines.push(`### Frage ${question.id} · Quelle ${question.source}`, question.text, '', answers[question.id] || '_Noch keine Antwort_', done.includes(question.id) ? '\n✓ Bearbeitet' : '', '');
    }
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'faust-leseraum-antworten.md';
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(2);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all');
  const [overview, setOverview] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydration from browser-only storage */
    try {
      setAnswers(JSON.parse(localStorage.getItem('faust-answers') || '{}'));
      setDone(JSON.parse(localStorage.getItem('faust-done') || '[]'));
    } catch { /* A fresh start is safer than blocking the lesson. */ }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('faust-answers', JSON.stringify(answers));
    localStorage.setItem('faust-done', JSON.stringify(done));
  }, [answers, done, hydrated]);

  const scene = scenes[sceneIndex];
  const question = scene.questions[questionIndex] || scene.questions[0];
  const progress = Math.round((done.length / TOTAL) * 100);

  const filteredScenes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return scenes.map((item, index) => {
      const matching = item.questions.filter((itemQuestion) => {
        const textMatch = !needle || `${item.title} ${itemQuestion.text}`.toLowerCase().includes(needle);
        const statusMatch = filter === 'all' || (filter === 'done' ? done.includes(itemQuestion.id) : !done.includes(itemQuestion.id));
        return textMatch && statusMatch;
      });
      return { item, index, matching };
    }).filter((entry) => entry.matching.length > 0);
  }, [done, filter, query]);

  function selectScene(index: number, targetQuestionId?: number) {
    const target = scenes[index];
    setSceneIndex(index);
    const nextIndex = targetQuestionId ? Math.max(0, target.questions.findIndex((item) => item.id === targetQuestionId)) : 0;
    setQuestionIndex(nextIndex);
    setOverview(false);
    requestAnimationFrame(() => document.getElementById('lesson')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function toggleDone(id: number) {
    setDone((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }

  function nextQuestion(direction: -1 | 1) {
    const next = questionIndex + direction;
    if (next >= 0 && next < scene.questions.length) {
      setQuestionIndex(next);
      return;
    }
    const nextScene = sceneIndex + direction;
    if (nextScene >= 0 && nextScene < scenes.length) {
      setSceneIndex(nextScene);
      setQuestionIndex(direction === 1 ? 0 : scenes[nextScene].questions.length - 1);
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Faust Leseraum – Startseite">
          <span className="brandMark">F·I</span>
          <span>Faust Leseraum</span>
        </a>
        <nav className="areaNav" aria-label="Hauptbereiche">
          <a className="active" href="#top" aria-current="page"><span>01</span> Leseraum</a>
          <a href="./wissenswelten/"><span>02</span> Wissenswelten</a>
        </nav>
        <nav className="topnav" aria-label="Werkzeuge">
          <button className={overview ? 'navButton active' : 'navButton'} onClick={() => setOverview(!overview)}>Szenenplan</button>
          <button className="navButton" onClick={() => downloadWork(answers, done)}>Exportieren</button>
          <a className="navButton" href={TEXT_URL} target="_blank" rel="noreferrer">Volltext ↗</a>
        </nav>
        <div className="progressPill" aria-label={`${done.length} von ${TOTAL} Fragen bearbeitet`}><span>{done.length}</span> / {TOTAL}</div>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Interaktive Lektüre · Goethe × Gründgens</p>
        <h1>Lesen.<br /><em>Sehen.</em> Denken.</h1>
        <div className="heroAside">
          <p className="heroCopy">Goethes Text trifft auf die legendäre Inszenierung von 1960. Szene für Szene, Frage für Frage.</p>
          <a href="#lesson" className="startLink">Lektüre beginnen <span>↓</span></a>
          <a href="./wissenswelten/" className="worldsLink"><small>Danach weiterdenken</small><strong>Fausts Wissenswelten</strong><span>→</span></a>
        </div>
      </section>

      <section className="controlStrip" aria-label="Fragen filtern">
        <label className="searchBox">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szenen und Fragen durchsuchen" />
        </label>
        <div className="filters">
          {(['all', 'open', 'done'] as const).map((value) => <button key={value} className={filter === value ? 'filter active' : 'filter'} onClick={() => setFilter(value)}>{value === 'all' ? 'Alle' : value === 'open' ? 'Offen' : 'Bearbeitet'}</button>)}
        </div>
        <div className="progressTrack" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        <strong>{progress}%</strong>
      </section>

      {overview && (
        <section className="overviewPanel" aria-label="Szenenplan">
          <div className="overviewHeading"><div><p className="eyebrow">Dramaturgie</p><h2>28 Szenen. Ein Weg.</h2></div><button onClick={() => setOverview(false)} aria-label="Szenenplan schließen">×</button></div>
          <div className="overviewGrid">
            {filteredScenes.map(({ item, index, matching }) => (
              <button key={item.slug} onClick={() => selectScene(index, matching[0]?.id)}>
                <span>{String(index + 1).padStart(2, '0')} · {formatTime(item.start)}</span>
                <strong>{item.title}</strong>
                <small>{matching.length} {matching.length === 1 ? 'Frage' : 'Fragen'}</small>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="workspace" id="lesson">
        <aside className="sceneRail" aria-label="Szenen">
          <p className="railLabel">Szenen · {filteredScenes.length} Treffer</p>
          {filteredScenes.map(({ item, index, matching }) => (
            <button key={item.slug} className={index === sceneIndex ? 'sceneButton active' : 'sceneButton'} onClick={() => selectScene(index, matching[0]?.id)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="sceneName">{item.title}<small>{matching.length} {matching.length === 1 ? 'Frage' : 'Fragen'}</small></span>
            </button>
          ))}
          {!filteredScenes.length && <p className="emptyState">Keine passende Frage gefunden.</p>}
        </aside>

        <section className="stage" aria-label={`Filmsequenz: ${scene.title}`}>
          <div className="stageMeta">
            <div><span className="liveDot" /> Filmsequenz</div>
            <div>{formatTime(scene.start)}–{formatTime(scene.end)}</div>
          </div>
          <div className="sceneHeading">
            <span>Szene {String(sceneIndex + 1).padStart(2, '0')}</span>
            <h2>{scene.title}</h2>
          </div>
          <div className="videoFrame">
            <iframe
              key={scene.slug}
              src={`https://www.youtube-nocookie.com/embed/${FULL_FILM_ID}?start=${scene.start}&end=${scene.end}&rel=0`}
              title={`Faust (1960): ${scene.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {scene.note && <p className="filmNote"><strong>Schnittnotiz</strong>{scene.note}</p>}
          <div className="stageCaption">
            <span>Gründgens / Quadflieg</span>
            <span>Gorski · 1960</span>
          </div>
          <div className="stageLinks">
            <a href={`https://www.youtube.com/watch?v=${FULL_FILM_ID}&t=${scene.start}s`} target="_blank" rel="noreferrer">Sequenz auf YouTube ↗</a>
            {scene.extraVideoId && <a href={`https://www.youtube.com/watch?v=${scene.extraVideoId}`} target="_blank" rel="noreferrer">Einzelclip öffnen ↗</a>}
            {scene.resource && <a href={scene.resource.url} target="_blank" rel="noreferrer">{scene.resource.label} ↗</a>}
          </div>
        </section>

        <article className="questionCard">
          <div className="questionTop">
            <span>Frage {String(question.id).padStart(2, '0')}</span>
            <span className="sourceNumber">Vorlage: {question.source}</span>
            <span className={`difficulty ${classify(question.text).toLowerCase()}`}>{classify(question.text)}</span>
          </div>
          <div className="questionDots" aria-label="Fragen dieser Szene">
            {scene.questions.map((item, index) => <button key={item.id} className={`${index === questionIndex ? 'active' : ''} ${done.includes(item.id) ? 'done' : ''}`} onClick={() => setQuestionIndex(index)} aria-label={`Frage ${item.id}${done.includes(item.id) ? ', bearbeitet' : ''}`} />)}
          </div>
          <h2>{question.text}</h2>
          <div className="promptHint"><span>⌁</span><p><strong>Filmspur</strong>Achte darauf, wie Raum, Stimme, Körper und Rhythmus die Textaussage verändern.</p></div>
          <label htmlFor="answer">Deine Beobachtung</label>
          <textarea id="answer" value={answers[question.id] || ''} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} placeholder="These · Beleg aus dem Text · Beobachtung im Film …" />
          <div className="answerFooter">
            <span>{(answers[question.id] || '').length} Zeichen · lokal gespeichert</span>
            <button className={done.includes(question.id) ? 'complete active' : 'complete'} onClick={() => toggleDone(question.id)}>{done.includes(question.id) ? '✓ Bearbeitet' : 'Als bearbeitet markieren'}</button>
          </div>
          <div className="questionNav">
            <button onClick={() => nextQuestion(-1)} disabled={sceneIndex === 0 && questionIndex === 0}>← Zurück</button>
            <span>{questionIndex + 1} / {scene.questions.length} in dieser Szene</span>
            <button onClick={() => nextQuestion(1)} disabled={sceneIndex === scenes.length - 1 && questionIndex === scene.questions.length - 1}>Weiter →</button>
          </div>
        </article>
      </div>

      <footer>
        <div><span className="brandMark">F·I</span><p>Eine interaktive Lernumgebung zu Johann Wolfgang von Goethes <em>Faust I</em>.</p></div>
        <div className="footerLinks"><a href="./wissenswelten/">Fausts Wissenswelten</a><a href={TEXT_URL} target="_blank" rel="noreferrer">Projekt Gutenberg</a><a href={`https://www.youtube.com/watch?v=${FULL_FILM_ID}`} target="_blank" rel="noreferrer">Filmfassung 1960</a><button onClick={() => { if (window.confirm('Alle lokalen Antworten und Markierungen löschen?')) { setAnswers({}); setDone([]); } }}>Fortschritt löschen</button></div>
      </footer>
    </main>
  );
}
