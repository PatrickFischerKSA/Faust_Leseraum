'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { glossary, modules, sources, type Task } from './data';
import { evaluateResponse } from '../feedback';
import LifeLab from './LifeLab';
import TextInquiry from './TextInquiry';
import Studienwahllabor from './Studienwahllabor';
import TaskArena from './TaskArena';
import './wissenswelten.css';

type Saved = Record<string, { note: string; checks: boolean[]; done: boolean }>;
const investigationRhythms:Record<string,{title:string;text:string}[]>={
  werkstatt:[{title:'Tonspur stoppen',text:'Markiert das Wort, bei dem aus Tasten ein Raten wird.'},{title:'Satzfolge legen',text:'Ordnet Fausts Studieninventar, Selbsturteil, Bilanz und Totalurteil.'},{title:'Reichweite begrenzen',text:'Formuliert, was Faust tatsächlich folgern dürfte.'}],
  krise:[{title:'Pendelbild zählen',text:'Trennt sichtbare Bewegung, gemessene Zeit und erklärte Ursache.'},{title:'Faust gegen Wagner',text:'Legt beiden dieselbe Messspur vor und formuliert ihre Einwände.'},{title:'Methodenregel testen',text:'Sagt genau, was Messung, Überlieferung und Erfahrung je leisten.'}],
  natur:[{title:'Fotos deckungsgleich legen',text:'Haltet Kameraposition konstant und verändert nur das Licht.'},{title:'Unsichtbares markieren',text:'Zeigt, was jeder Schatten vom Papierkörper ausblendet.'},{title:'Zeichen mit Foto prüfen',text:'Vergleicht Fausts Makrokosmos mit eurem begrenzten Abbild.'}],
  philosophie:[{title:'Gretchens Frage festhalten',text:'Markiert, worauf sie ein klares Ja oder Nein verlangt.'},{title:'Fausts Verschiebung verfolgen',text:'Trennt Gott, Natur, Gefühl und kirchliches Bekenntnis.'},{title:'Rettung korrekt lesen',text:'Prüft im „Kerker“, wen die Stimme von oben „gerettet“ nennt.'}],
  homunculus:[{title:'Film vor dem Wurf stoppen',text:'Lest Zögern, Ehrgeiz und Erwartung, ohne den Ausgang zu kennen.'},{title:'Begründung danach hören',text:'Prüft, ob Gründe erinnert oder nachträglich gebaut werden.'},{title:'Wette schärfen',text:'Nennt, was Herrn oder Mephisto im nächsten Versuch widerlegen würde.'}],
  fortschritt:[{title:'Zwei Wahlfilme vergleichen',text:'Sucht den ersten Blick oder Griff, bevor eine Begründung folgt.'},{title:'Einfluss lokalisieren',text:'Benennt veränderte Umgebung, verfügbare Alternativen und Wissen.'},{title:'Verantwortung prüfen',text:'Übertragt diese Kriterien auf Pakt, Gretchen und Kerker.'}]
};

export default function Wissenswelten() {
  const mediaBase=process.env.NEXT_PUBLIC_BASE_PATH||'';
  const studyFilm = useRef<HTMLVideoElement>(null);
  const [studyFilmPlaying, setStudyFilmPlaying] = useState(true);
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
    return (value?.note.trim().length || 0) >= (task.form === 'Selbst' ? 60 : 100);
  }
  function exportNotes() {
    const lines = ['# Fausts Wissenswelten – Erkenntniskarte','',`Export: ${new Date().toLocaleString('de-CH')}`,''];
    modules.forEach(m => { lines.push(`## ${m.number} ${m.title}`,''); m.tasks.forEach(t => lines.push(`### ${t.form}: ${t.title}`, saved[t.id]?.note || '_Noch keine Notiz_', saved[t.id]?.done ? '\n✓ abgeschlossen' : '', '')); });
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([lines.join('\n')], {type:'text/markdown'})); link.download='faust-erkenntniskarte.md'; link.click(); URL.revokeObjectURL(link.href);
  }

  async function toggleStudyFilm() {
    const film = studyFilm.current;
    if (!film) return;
    if (film.paused) {
      try {
        await film.play();
      } catch {
        setStudyFilmPlaying(false);
      }
    } else {
      film.pause();
    }
  }

  return <main className="worlds">
    <header className="worldTop"><a className="worldBrand" href="../"><span>F·I</span> Am Anfang war der Text</a><nav className="worldAreaNav" aria-label="Hauptbereiche"><a href="../"><span>01</span> Am Anfang war der Text</a><a className="active" href="#top" aria-current="page"><span>02</span> Wissenswelten</a></nav><nav className="worldTools"><a href="#studienwahl">Studienwahl</a><a href="#module">Module</a><a href="#glossar">Glossar</a><button onClick={exportNotes}>Export</button></nav><div className="worldProgress">{completed}/18</div></header>
    <section className="worldHero studyRoomHero" id="top"><video ref={studyFilm} className="studyHeroFilm" src={`${mediaBase}/studierzimmer-hintergrund.mp4`} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlay={()=>setStudyFilmPlaying(true)} onPause={()=>setStudyFilmPlaying(false)}/><span className="studyHeroVeil" aria-hidden="true"/><button className="studyFilmControl" type="button" onClick={toggleStudyFilm} aria-pressed={!studyFilmPlaying}><span aria-hidden="true">{studyFilmPlaying?'Ⅱ':'▶'}</span>{studyFilmPlaying?'Film anhalten':'Film fortsetzen'}</button><div className="roomTitle"><p className="worldEyebrow">Goethes digitales Studierzimmer · Faust I</p><h1>Fausts<br/><em>Wissenswelten</em></h1><p className="roomQuote">Faust I fragt nach den Grenzen des Wissens, nach Sprache, Freiheit und Verantwortung.</p></div><div className="worldIntro deskPaper"><span className="paperClip" aria-hidden="true">F·I</span><a className="backToReading" href="../"><span>←</span><small>Zurück zu Film & Text</small><strong>Am Anfang war der Text</strong></a><p>Hier untersuchst du Fragen aus Faust I durch Beobachtung, begründete Urteile und den Vergleich verschiedener Perspektiven.</p><div className="socialLegend"><span>● ALLEIN</span><span>● ZU ZWEIT</span><span>● ZU DRITT</span></div></div></section>
    <section className="library" aria-label="Module"><div className="libraryIntro"><p className="worldEyebrow">Sechs Untersuchungen zu Faust I</p><h2>Welche Frage möchtest du untersuchen?</h2><p>Jeder Bereich beginnt mit einer konkreten Beobachtung und führt zu ausgewählten Szenen des ersten Teils.</p></div><div className="moduleMap">{modules.map((m,i)=><button key={m.id} className={i===active?'active':''} onClick={()=>{setActive(i); setFilter('Alle'); document.getElementById('module')?.scrollIntoView({behavior:'smooth'});}}><span>{m.number}</span><strong>{m.title}</strong><small>{m.question}</small><b>{i===active?'Gerade geöffnet':'Untersuchung öffnen'} →</b></button>)}</div></section>
    <Studienwahllabor/>
    <section className="moduleArea" id="module">
      <aside className="moduleAside"><p className="worldEyebrow">Thema {activeModule.number}</p><h2>{activeModule.title}</h2><p>{activeModule.intro}</p><dl><dt>Faust-I-Stellen dazu</dt><dd>{activeModule.texts}</dd><dt>Schnelleinstieg</dt><dd>5–10 Minuten für die interaktive Untersuchung</dd></dl><label className="teacher"><input type="checkbox" checked={teacher} onChange={e=>setTeacher(e.target.checked)}/> Hinweise für Lehrpersonen</label>{teacher&&<div className="teacherNote"><strong>Didaktischer Fokus</strong> Persönliche Beispiele bleiben freiwillig teilbar. Gruppenprodukte sind erst abgeschlossen, wenn jede Person sichtbar beigetragen hat.</div>}</aside>
      <div className="moduleContent">
        <div className="questionLead"><span>Leitfrage</span><h2>{activeModule.question}</h2></div>
        <LifeLab moduleId={activeModule.id}/>
        <div className="depthTabs">{(['Basis','Vertiefung','Forschung'] as const).map(d=><button className={depth===d?'active':''} onClick={()=>setDepth(d)} key={d}>{d}</button>)}</div>
        <div className="factGrid">{facts.map((fact,i)=><article key={fact}><span>0{i+1}</span><p>{fact}</p><button onClick={()=>setDialog({kind:'fact',index:i})}>{depth === 'Forschung' ? 'Forschungsfenster öffnen' : 'Denkfenster öffnen'} <b>↗</b></button></article>)}</div>
        <div className="workbenchStrip moduleRhythm">{investigationRhythms[activeModule.id].map((step,index)=><div key={step.title}><span>0{index+1}</span><p><strong>{step.title}</strong>{step.text}</p></div>)}</div>
        <div className="taskHeading"><div><p className="worldEyebrow">Untersuchungsmissionen</p><h2>Solo, Duo oder Trio – ohne Arbeitsblatt</h2></div><div className="taskFilters">{(['Alle','Selbst','Tandem','Trio'] as const).map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f==='Selbst'?'Solo':f==='Tandem'?'Duo':f==='Trio'?'Trio':'Alle'}</button>)}</div></div>
        <div className="tasks">{tasks.map(task => {
          const value=saved[task.id] || {note:'',checks:[],done:false};
          return <article className={`task ${task.form.toLowerCase()} ${value.done?'done':''}`} key={task.id}>
            <div className="taskMeta"><span>{task.form==='Selbst'?'Solo':task.form==='Tandem'?'Duo':'Trio'}</span><span>{task.minutes} Min.</span></div><h3>{task.title}</h3><p className="taskPrompt">{task.prompt}</p><div className="challengePreview missionPreview"><span>Live-Untersuchung</span><p>Handeln · aufnehmen · Gegenprobe · am Wortlaut urteilen</p><small>Keine vorbereiteten Dialoge, kein Arbeitsblatt</small></div><button className="taskOpen" onClick={()=>setDialog({kind:'task',id:task.id})}><span>{value.done?'Mission wieder öffnen':'Mission starten'}</span><b>→</b></button>
          </article>})}</div>
      </div>
    </section>
    <section className="glossary" id="glossar"><div><p className="worldEyebrow">Der Karteikasten</p><h2>Begriffe nachschlagen</h2><p>Kurze Arbeitsdefinitionen – als Ausgangspunkt, nicht als letzte Antwort.</p><input value={glossaryQuery} onChange={e=>setGlossaryQuery(e.target.value)} placeholder="Karte suchen …"/></div><div className="glossaryGrid">{words.map(([term,definition])=><article key={term}><span className="cardNotch"/><strong>{term}</strong><p>{definition}</p></article>)}</div></section>
    <section className="sources"><div><p className="worldEyebrow">Der Handapparat</p><h2>Film, Quellen & Editionen</h2><p>Der Entstehungsfilm liegt direkt in dieser Lernplattform. Die übrigen Einträge führen zu Primärtext, Edition und Begleitmaterial.</p></div><div><figure className="localSourceFilm"><div className="sourceFilmHead"><b>01</b><div><span>Film im lokalen Archiv</span><h3>Wie „Faust“ entstand</h3></div></div><video controls playsInline preload="metadata" src={`${mediaBase}/faust-entstehung-ard-alpha.mp4`}>Dein Browser kann dieses Video nicht abspielen.</video><figcaption><strong>Goethes Faust: Die Entstehungsgeschichte von Faust I</strong><span>ARD alpha / Bayerischer Rundfunk · Beitrag: Carola Richter · Stand: 30.03.2015</span><small>Die Filmdatei wird von dieser Plattform geladen. Es öffnet sich keine externe Seite.</small></figcaption></figure>{sources.map(([label,url],index)=><a href={url} target="_blank" rel="noreferrer" key={url}><b>{String(index+2).padStart(2,'0')}</b>{label}<span>↗</span></a>)}</div></section>
    {dialog?.kind==='fact'&&<div className="dialogBackdrop" role="presentation" onMouseDown={()=>setDialog(null)}><section className="learningDialog factDialog" role="dialog" aria-modal="true" aria-labelledby="fact-dialog-title" onMouseDown={event=>event.stopPropagation()}>
      <header><div><span>{activeModule.number} · {depth}</span><h2 id="fact-dialog-title">Denkfenster</h2></div><button onClick={()=>setDialog(null)} aria-label="Dialog schliessen">×</button></header>
      <div className="dialogBody"><div className="dialogStatement"><span>Ausgangspunkt {String(dialog.index+1).padStart(2,'0')}</span><p>{facts[dialog.index]}</p></div><TextInquiry moduleId={activeModule.id} factPrompt={facts[dialog.index]} note={saved[`fact-${activeModule.id}-${depth}-${dialog.index}`]?.note||''} onNote={note=>change(`fact-${activeModule.id}-${depth}-${dialog.index}`,{note})}/></div>
      <footer><button onClick={()=>setDialog(null)}>Notiz sichern & schliessen</button></footer>
    </section></div>}
    {dialogTask&&<div className="dialogBackdrop" role="presentation" onMouseDown={()=>setDialog(null)}><section className="learningDialog taskDialog" role="dialog" aria-modal="true" aria-labelledby="task-dialog-title" onMouseDown={event=>event.stopPropagation()}>
      <header><div><span>{activeModule.number} · {dialogTask.form==='Selbst'?'Solo':dialogTask.form==='Tandem'?'Duo':'Trio'} · {dialogTask.minutes} Minuten</span><h2 id="task-dialog-title">{dialogTask.title}</h2></div><button onClick={()=>setDialog(null)} aria-label="Dialog schliessen">×</button></header>
      <div className="dialogBody arenaBody"><TaskArena task={dialogTask} note={saved[dialogTask.id]?.note||''} onNote={note=>change(dialogTask.id,{note})}/></div>
      <footer><button className="secondary" onClick={()=>setDialog(null)}>Mission verlassen</button><button disabled={(!canFinish(dialogTask)||!evaluateResponse(dialogTask.prompt,saved[dialogTask.id]?.note||'','',dialogTask.form==='Selbst'?'reflection':'group').ready)&&!saved[dialogTask.id]?.done} onClick={()=>{change(dialogTask.id,{done:!saved[dialogTask.id]?.done}); if(!saved[dialogTask.id]?.done)setDialog(null);}}>{saved[dialogTask.id]?.done?'Urteil wieder öffnen':'Urteil sichern'}</button></footer>
    </section></div>}
    <footer className="worldFooter"><a href="../">← Am Anfang war der Text</a><p>Faust-Lernplattform · Lernstände werden nur lokal gespeichert.</p></footer>
  </main>;
}
