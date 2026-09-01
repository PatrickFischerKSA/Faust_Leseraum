'use client';

import { useEffect, useMemo, useState } from 'react';
import { glossary, modules, sources, type Task } from './data';
import { evaluateResponse, TextFeedback } from '../feedback';
import './wissenswelten.css';

type Saved = Record<string, { note: string; checks: boolean[]; done: boolean }>;

export default function Wissenswelten() {
  const [active, setActive] = useState(0);
  const [depth, setDepth] = useState<'Basis'|'Vertiefung'|'Forschung'>('Basis');
  const [teacher, setTeacher] = useState(false);
  const [filter, setFilter] = useState<'Alle'|Task['form']>('Alle');
  const [saved, setSaved] = useState<Saved>({});
  const [ready, setReady] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState('');
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydration from browser-only storage */
    try { setSaved(JSON.parse(localStorage.getItem('faust-wissenswelten') || '{}')); } catch {}
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('faust-wissenswelten', JSON.stringify(saved)); }, [saved, ready]);
  const activeModule = modules[active];
  const facts = depth === 'Basis' ? activeModule.basis : depth === 'Vertiefung' ? activeModule.deeper : activeModule.research;
  const tasks = activeModule.tasks.filter(t => filter === 'Alle' || t.form === filter);
  const completed = Object.values(saved).filter(v => v.done).length;
  const words = useMemo(() => glossary.filter(([term, definition]) => `${term} ${definition}`.toLowerCase().includes(glossaryQuery.toLowerCase())), [glossaryQuery]);

  function change(id: string, patch: Partial<Saved[string]>) {
    setSaved(current => {
      const existing = current[id] ?? { note:'', checks:[], done:false };
      return { ...current, [id]: { ...existing, ...patch } };
    });
  }
  function canFinish(task: Task) {
    const value = saved[task.id];
    return (value?.note.trim().length || 0) >= (task.form === 'Selbst' ? 80 : 140) && (task.form === 'Selbst' || task.steps.every((_, i) => value?.checks[i]));
  }
  function exportNotes() {
    const lines = ['# Fausts Wissenswelten – Erkenntniskarte','',`Export: ${new Date().toLocaleString('de-CH')}`,''];
    modules.forEach(m => { lines.push(`## ${m.number} ${m.title}`,''); m.tasks.forEach(t => lines.push(`### ${t.form}: ${t.title}`, saved[t.id]?.note || '_Noch keine Notiz_', saved[t.id]?.done ? '\n✓ abgeschlossen' : '', '')); });
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([lines.join('\n')], {type:'text/markdown'})); link.download='faust-erkenntniskarte.md'; link.click(); URL.revokeObjectURL(link.href);
  }

  return <main className="worlds">
    <header className="worldTop"><a className="worldBrand" href="../"><span>F·I</span> Faust Leseraum</a><nav className="worldAreaNav" aria-label="Hauptbereiche"><a href="../"><span>01</span> Leseraum</a><a className="active" href="#top" aria-current="page"><span>02</span> Wissenswelten</a></nav><nav className="worldTools"><a href="#module">Module</a><a href="#glossar">Glossar</a><button onClick={exportNotes}>Export</button></nav><div className="worldProgress">{completed}/18</div></header>
    <section className="worldHero" id="top"><div><p className="worldEyebrow">Interaktive Lernwerkstatt</p><h1>Fausts<br/><em>Wissenswelten</em></h1></div><div className="worldIntro"><a className="backToReading" href="../"><span>←</span><small>Zurück zu Film & Text</small><strong>Leseraum öffnen</strong></a><p>Sechs Zugänge zu Erkenntnis, Natur, Philosophie und Verantwortung. Erst selbst erfahren, dann im Gegenüber prüfen.</p><div className="socialLegend"><span>● Selbst</span><span>● Tandem</span><span>● Trio</span></div><p className="privacy">Deine Notizen bleiben auf diesem Gerät. Du entscheidest, was du teilst.</p></div></section>
    <section className="moduleMap" aria-label="Module">{modules.map((m,i)=><button key={m.id} className={i===active?'active':''} onClick={()=>{setActive(i); setFilter('Alle'); document.getElementById('module')?.scrollIntoView({behavior:'smooth'});}}><span>{m.number}</span><strong>{m.title}</strong><small>{m.question}</small></button>)}</section>
    <section className="moduleArea" id="module">
      <aside className="moduleAside"><p className="worldEyebrow">Modul {activeModule.number}</p><h2>{activeModule.title}</h2><p>{activeModule.intro}</p><dl><dt>Primärtexte</dt><dd>{activeModule.texts}</dd><dt>Arbeitszeit</dt><dd>ca. 70–90 Minuten</dd></dl><label className="teacher"><input type="checkbox" checked={teacher} onChange={e=>setTeacher(e.target.checked)}/> Lehrpersonenmodus</label>{teacher&&<div className="teacherNote"><strong>Didaktischer Fokus</strong> Selbsterfahrung bleibt freiwillig teilbar. Gruppenprodukte sind erst abschliessbar, wenn jeder Arbeitsschritt bestätigt und ein gemeinsames Ergebnis dokumentiert ist.</div>}</aside>
      <div className="moduleContent">
        <div className="questionLead"><span>Leitfrage</span><h2>{activeModule.question}</h2></div>
        <div className="depthTabs">{(['Basis','Vertiefung','Forschung'] as const).map(d=><button className={depth===d?'active':''} onClick={()=>setDepth(d)} key={d}>{d}</button>)}</div>
        <div className="factGrid">{facts.map((fact,i)=><article key={fact}><span>0{i+1}</span><p>{fact}</p></article>)}</div>
        <div className="taskHeading"><div><p className="worldEyebrow">Erfahrung → Austausch → Urteil</p><h2>Aufträge</h2></div><div className="taskFilters">{(['Alle','Selbst','Tandem','Trio'] as const).map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
        <div className="tasks">{tasks.map(task => {
          const value=saved[task.id] || {note:'',checks:[],done:false}; const eligible=canFinish(task);
          const textReady=evaluateResponse(task.prompt, value.note, '', task.form==='Selbst'?'reflection':'group').ready;
          return <article className={`task ${task.form.toLowerCase()} ${value.done?'done':''}`} key={task.id}>
            <div className="taskMeta"><span>{task.form}</span><span>{task.minutes} Min.</span></div><h3>{task.title}</h3><p className="taskPrompt">{task.prompt}</p>
            {task.roles&&<div className="roles">{task.roles.map((r,i)=><span key={r}>Rolle {i+1}<strong>{r}</strong></span>)}</div>}
            <ol>{task.steps.map((step,i)=><li key={step}><label><input type="checkbox" disabled={task.form==='Selbst'} checked={!!value.checks[i]} onChange={e=>change(task.id,{checks:Object.assign([],value.checks,{[i]:e.target.checked})})}/><span>{step}</span></label></li>)}</ol>
            <label className="protocol"><span>{task.form==='Selbst'?'Deine private Reflexion':'Gemeinsames Protokoll'} · {task.product}</span><textarea value={value.note} onChange={e=>change(task.id,{note:e.target.value})} placeholder={task.form==='Selbst'?'Was hast du über dein eigenes Denken bemerkt?':'Haltet Beiträge aller Beteiligten, Belege und euren gemeinsamen Entscheid fest …'}/><small>{value.note.length} Zeichen · {task.form==='Selbst'?'mind. 80':'mind. 140'}</small></label>
            <TextFeedback prompt={`${task.prompt} ${task.product}`} answer={value.note} mode={task.form==='Selbst'?'reflection':'group'} />
            <button className="finish" disabled={(!eligible||!textReady)&&!value.done} onClick={()=>change(task.id,{done:!value.done})}>{value.done?'✓ Abgeschlossen':eligible&&textReady?'Auftrag abschliessen':'Feedback noch umsetzen'}</button>
          </article>})}</div>
      </div>
    </section>
    <section className="glossary" id="glossar"><div><p className="worldEyebrow">Begriffe prüfen</p><h2>Glossar</h2><p>Kurze Arbeitsdefinitionen – als Ausgangspunkt, nicht als letzte Antwort.</p><input value={glossaryQuery} onChange={e=>setGlossaryQuery(e.target.value)} placeholder="Begriff suchen …"/></div><div className="glossaryGrid">{words.map(([term,definition])=><article key={term}><strong>{term}</strong><p>{definition}</p></article>)}</div></section>
    <section className="sources"><div><p className="worldEyebrow">Wissenschaftlich weiterarbeiten</p><h2>Quellen & Editionen</h2><p>Direkte Einstiege in Primärtext, historisch-kritische Edition und fachlich verantwortete Materialien. Linkcheck: 01.09.2026.</p></div><div>{sources.map(([label,url])=><a href={url} target="_blank" rel="noreferrer" key={url}>{label}<span>↗</span></a>)}</div></section>
    <footer className="worldFooter"><a href="../">← Zur filmischen Lektüre</a><p>Faust Leseraum · Lernstände werden nur lokal gespeichert.</p></footer>
  </main>;
}
