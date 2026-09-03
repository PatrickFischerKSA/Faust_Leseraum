'use client';

import { useEffect, useMemo, useState } from 'react';
import { glossary, modules, sources, taskGuides, type Task } from './data';
import { evaluateResponse, TextFeedback } from '../feedback';
import LifeLab from './LifeLab';
import Studienwahllabor from './Studienwahllabor';
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
  const [dialog, setDialog] = useState<{kind:'fact'; index:number}|{kind:'task'; id:string}|null>(null);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydration from browser-only storage */
    try { setSaved(JSON.parse(localStorage.getItem('faust-wissenswelten') || '{}')); } catch {}
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('faust-wissenswelten', JSON.stringify(saved)); }, [saved, ready]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setDialog(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const activeModule = modules[active];
  const facts = depth === 'Basis' ? activeModule.basis : depth === 'Vertiefung' ? activeModule.deeper : activeModule.research;
  const tasks = activeModule.tasks.filter(t => filter === 'Alle' || t.form === filter);
  const completed = Object.values(saved).filter(v => v.done).length;
  const words = useMemo(() => glossary.filter(([term, definition]) => `${term} ${definition}`.toLowerCase().includes(glossaryQuery.toLowerCase())), [glossaryQuery]);
  const dialogTask = dialog?.kind === 'task' ? activeModule.tasks.find(task => task.id === dialog.id) : undefined;

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
    <header className="worldTop"><a className="worldBrand" href="../"><span>F·I</span> Am Anfang war der Text</a><nav className="worldAreaNav" aria-label="Hauptbereiche"><a href="../"><span>01</span> Am Anfang war der Text</a><a className="active" href="#top" aria-current="page"><span>02</span> Wissenswelten</a></nav><nav className="worldTools"><a href="#studienwahl">Studienwahl</a><a href="#module">Module</a><a href="#glossar">Glossar</a><button onClick={exportNotes}>Export</button></nav><div className="worldProgress">{completed}/18</div></header>
    <section className="worldHero studyRoomHero" id="top"><div className="roomSet" aria-hidden="true"><div className="roomWindow"><i/></div><div className="roomShelves"><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="deskLamp"><i/><b/></div><div className="deskEdge"/></div><div className="roomTitle"><p className="worldEyebrow">Goethes digitales Studierzimmer · Faust I</p><h1>Fausts<br/><em>Wissenswelten</em></h1><p className="roomQuote">Faust I fragt nach den Grenzen des Wissens, nach Sprache, Freiheit und Verantwortung.</p></div><div className="worldIntro deskPaper"><span className="paperClip" aria-hidden="true">F·I</span><a className="backToReading" href="../"><span>←</span><small>Zurück zu Film & Text</small><strong>Am Anfang war der Text</strong></a><p>Hier untersuchst du Fragen aus Faust I durch Beobachtung, begründete Urteile und den Vergleich verschiedener Perspektiven.</p><div className="socialLegend"><span>● ALLEIN</span><span>● ZU ZWEIT</span><span>● ZU DRITT</span></div><p className="privacy">Alles bleibt lokal. Teile nur, was für dich okay ist.</p></div></section>
    <section className="library" aria-label="Module"><div className="libraryIntro"><p className="worldEyebrow">Sechs Untersuchungen zu Faust I</p><h2>Welche Frage möchtest du untersuchen?</h2><p>Jeder Bereich beginnt mit einer konkreten Beobachtung und führt zu ausgewählten Szenen des ersten Teils.</p></div><div className="moduleMap">{modules.map((m,i)=><button key={m.id} className={i===active?'active':''} onClick={()=>{setActive(i); setFilter('Alle'); document.getElementById('module')?.scrollIntoView({behavior:'smooth'});}}><span>{m.number}</span><strong>{m.title}</strong><small>{m.question}</small><b>{i===active?'Gerade geöffnet':'Untersuchung öffnen'} →</b></button>)}</div></section>
    <Studienwahllabor/>
    <section className="moduleArea" id="module">
      <aside className="moduleAside"><p className="worldEyebrow">Thema {activeModule.number}</p><h2>{activeModule.title}</h2><p>{activeModule.intro}</p><dl><dt>Faust-I-Stellen dazu</dt><dd>{activeModule.texts}</dd><dt>Schnelleinstieg</dt><dd>5–10 Minuten für die interaktive Untersuchung</dd></dl><label className="teacher"><input type="checkbox" checked={teacher} onChange={e=>setTeacher(e.target.checked)}/> Hinweise für Lehrpersonen</label>{teacher&&<div className="teacherNote"><strong>Didaktischer Fokus</strong> Persönliche Beispiele bleiben freiwillig teilbar. Gruppenprodukte sind erst abgeschlossen, wenn jede Person sichtbar beigetragen hat.</div>}</aside>
      <div className="moduleContent">
        <div className="questionLead"><span>Leitfrage</span><h2>{activeModule.question}</h2></div>
        <LifeLab moduleId={activeModule.id}/>
        <div className="depthTabs">{(['Basis','Vertiefung','Forschung'] as const).map(d=><button className={depth===d?'active':''} onClick={()=>setDepth(d)} key={d}>{d}</button>)}</div>
        <div className="factGrid">{facts.map((fact,i)=><article key={fact}><span>0{i+1}</span><p>{fact}</p><button onClick={()=>setDialog({kind:'fact',index:i})}>{depth === 'Forschung' ? 'Forschungsfenster öffnen' : 'Denkfenster öffnen'} <b>↗</b></button></article>)}</div>
        <div className="workbenchStrip"><div><span>01</span><p><strong>Beobachten</strong>Eine konkrete Frage selbst untersuchen</p></div><div><span>02</span><p><strong>Am Text prüfen</strong>Das Urteil mit einer Szene begründen</p></div><div><span>03</span><p><strong>Perspektiven vergleichen</strong>Andere Deutungen ernsthaft prüfen</p></div></div>
        <div className="taskHeading"><div><p className="worldEyebrow">Weiterführende Arbeit</p><h2>Aufträge allein, zu zweit oder zu dritt</h2></div><div className="taskFilters">{(['Alle','Selbst','Tandem','Trio'] as const).map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f==='Selbst'?'Allein':f==='Tandem'?'Zu zweit':f==='Trio'?'Zu dritt':'Alle'}</button>)}</div></div>
        <div className="tasks">{tasks.map(task => {
          const value=saved[task.id] || {note:'',checks:[],done:false};
          const guide=taskGuides[task.id];
          return <article className={`task ${task.form.toLowerCase()} ${value.done?'done':''}`} key={task.id}>
            <div className="taskMeta"><span>{task.form==='Selbst'?'Allein':task.form==='Tandem'?'Zu zweit':'Zu dritt'}</span><span>{task.minutes} Min.</span></div><h3>{task.title}</h3><p className="taskPrompt">{task.prompt}</p><div className="challengePreview"><span>Du brauchst</span><p>{guide.material}</p><small>{guide.criteria.length} klare Erfolgskriterien · Textfeedback inklusive</small></div><button className="taskOpen" onClick={()=>setDialog({kind:'task',id:task.id})}><span>{value.done?'Auftrag wieder öffnen':'Auftrag öffnen'}</span><b>→</b></button>
          </article>})}</div>
      </div>
    </section>
    <section className="glossary" id="glossar"><div><p className="worldEyebrow">Der Karteikasten</p><h2>Begriffe nachschlagen</h2><p>Kurze Arbeitsdefinitionen – als Ausgangspunkt, nicht als letzte Antwort.</p><input value={glossaryQuery} onChange={e=>setGlossaryQuery(e.target.value)} placeholder="Karte suchen …"/></div><div className="glossaryGrid">{words.map(([term,definition])=><article key={term}><span className="cardNotch"/><strong>{term}</strong><p>{definition}</p></article>)}</div></section>
    <section className="sources"><div><p className="worldEyebrow">Der Handapparat</p><h2>Quellen & Editionen</h2><p>Direkte Einstiege in Primärtext, historisch-kritische Edition und fachlich verantwortete Materialien. Linkcheck: 01.09.2026.</p></div><div>{sources.map(([label,url],index)=><a href={url} target="_blank" rel="noreferrer" key={url}><b>{String(index+1).padStart(2,'0')}</b>{label}<span>↗</span></a>)}</div></section>
    {dialog?.kind==='fact'&&<div className="dialogBackdrop" role="presentation" onMouseDown={()=>setDialog(null)}><section className="learningDialog factDialog" role="dialog" aria-modal="true" aria-labelledby="fact-dialog-title" onMouseDown={event=>event.stopPropagation()}>
      <header><div><span>{activeModule.number} · {depth}</span><h2 id="fact-dialog-title">Denkfenster</h2></div><button onClick={()=>setDialog(null)} aria-label="Dialog schliessen">×</button></header>
      <div className="dialogBody"><div className="dialogStatement"><span>Ausgangspunkt {String(dialog.index+1).padStart(2,'0')}</span><p>{facts[dialog.index]}</p></div><div className="thinkingSteps"><article><span>1</span><div><strong>Beobachten</strong><p>Formuliere den Gedanken in einem eigenen Satz. Welche zwei Schlüsselbegriffe dürfen nicht fehlen?</p></div></article><article><span>2</span><div><strong>Prüfen</strong><p>Woran im Primärtext oder in der Edition lässt sich diese Aussage überprüfen? Notiere einen konkreten Anhaltspunkt.</p></div></article><article><span>3</span><div><strong>Weiterdenken</strong><p>Welche Grenze, Gegenposition oder offene Frage entsteht daraus?</p></div></article></div><label className="dialogWriting"><span>Deine Forschungsnotiz</span><textarea autoFocus value={saved[`fact-${activeModule.id}-${depth}-${dialog.index}`]?.note||''} onChange={e=>change(`fact-${activeModule.id}-${depth}-${dialog.index}`,{note:e.target.value})} placeholder="Eigene Formulierung – Textbezug – offene Frage …"/></label><TextFeedback prompt={facts[dialog.index]} answer={saved[`fact-${activeModule.id}-${depth}-${dialog.index}`]?.note||''}/></div>
      <footer><button onClick={()=>setDialog(null)}>Notiz sichern & schliessen</button></footer>
    </section></div>}
    {dialogTask&&<div className="dialogBackdrop" role="presentation" onMouseDown={()=>setDialog(null)}><section className="learningDialog taskDialog" role="dialog" aria-modal="true" aria-labelledby="task-dialog-title" onMouseDown={event=>event.stopPropagation()}>
      <header><div><span>{activeModule.number} · {dialogTask.form} · {dialogTask.minutes} Minuten</span><h2 id="task-dialog-title">{dialogTask.title}</h2></div><button onClick={()=>setDialog(null)} aria-label="Dialog schliessen">×</button></header>
      <div className="dialogBody"><p className="dialogPrompt">{dialogTask.prompt}</p>{dialogTask.roles&&<div className="dialogRoles">{dialogTask.roles.map((role,index)=><div key={role}><span>Person {index+1}</span><strong>{role}</strong><small>{index===0?'Startet mit Beobachtung und erstem Beleg.':index===1?'Prüft, widerspricht und ergänzt einen Beleg.':'Hält Konsens, Dissens und Schluss fest.'}</small></div>)}</div>}
      <div className="dialogTwoCols"><article><span>Material</span><p>{taskGuides[dialogTask.id].material}</p></article><article><span>Abgabeformat</span><p>{taskGuides[dialogTask.id].format}</p></article></div><div className="dialogExample"><span>Satzstarter</span><p>{taskGuides[dialogTask.id].example}</p></div>
      <div className="dialogWorkflow"><span>Schritt für Schritt</span>{dialogTask.steps.map((step,index)=><label key={step}>{dialogTask.form==='Selbst'?<b>{index+1}</b>:<input type="checkbox" checked={!!saved[dialogTask.id]?.checks[index]} onChange={e=>change(dialogTask.id,{checks:Object.assign([],saved[dialogTask.id]?.checks||[],{[index]:e.target.checked})})}/>}<p><strong>Schritt {index+1}</strong>{step}</p></label>)}</div>
      <label className="dialogWriting"><span>{dialogTask.form==='Selbst'?'Deine Reflexion':'Euer gemeinsames Ergebnis'} · {dialogTask.product}</span><textarea value={saved[dialogTask.id]?.note||''} onChange={e=>change(dialogTask.id,{note:e.target.value})} placeholder={dialogTask.form==='Selbst'?'Ich habe beobachtet … Das bedeutet für mich …':'Person 1: … / Person 2: … / Gemeinsamer Entscheid: …'}/></label><TextFeedback prompt={`${dialogTask.prompt} ${dialogTask.product}`} answer={saved[dialogTask.id]?.note||''} mode={dialogTask.form==='Selbst'?'reflection':'group'}/></div>
      <footer><button className="secondary" onClick={()=>setDialog(null)}>Später weiterarbeiten</button><button disabled={(!canFinish(dialogTask)||!evaluateResponse(dialogTask.prompt,saved[dialogTask.id]?.note||'','',dialogTask.form==='Selbst'?'reflection':'group').ready)&&!saved[dialogTask.id]?.done} onClick={()=>{change(dialogTask.id,{done:!saved[dialogTask.id]?.done}); if(!saved[dialogTask.id]?.done)setDialog(null);}}>{saved[dialogTask.id]?.done?'Abschluss zurücknehmen':'Auftrag abschliessen'}</button></footer>
    </section></div>}
    <footer className="worldFooter"><a href="../">← Am Anfang war der Text</a><p>Faust-Lernplattform · Lernstände werden nur lokal gespeichert.</p></footer>
  </main>;
}
