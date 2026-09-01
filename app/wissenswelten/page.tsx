'use client';

import { useEffect, useMemo, useState } from 'react';
import { glossary, modules, sources, taskGuides, type Task } from './data';
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
    <header className="worldTop"><a className="worldBrand" href="../"><span>F·I</span> Am Anfang war der Text</a><nav className="worldAreaNav" aria-label="Hauptbereiche"><a href="../"><span>01</span> Am Anfang war der Text</a><a className="active" href="#top" aria-current="page"><span>02</span> Wissenswelten</a></nav><nav className="worldTools"><a href="#module">Module</a><a href="#glossar">Glossar</a><button onClick={exportNotes}>Export</button></nav><div className="worldProgress">{completed}/18</div></header>
    <section className="worldHero studyRoomHero" id="top"><div className="roomSet" aria-hidden="true"><div className="roomWindow"><i/></div><div className="roomShelves"><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="deskLamp"><i/><b/></div><div className="deskEdge"/></div><div className="roomTitle"><p className="worldEyebrow">Goethes digitales Studierzimmer</p><h1>Fausts<br/><em>Wissenswelten</em></h1><p className="roomQuote">Zwischen Büchern, Beobachtung und eigener Erfahrung beginnt die Arbeit am Wissen.</p></div><div className="worldIntro deskPaper"><span className="paperClip" aria-hidden="true">F·I</span><a className="backToReading" href="../"><span>←</span><small>Zurück zu Film & Text</small><strong>Am Anfang war der Text</strong></a><p>Sechs Zugänge zu Erkenntnis, Natur, Philosophie und Verantwortung. Erst selbst erfahren, dann im Gegenüber prüfen.</p><div className="socialLegend"><span>● Selbst</span><span>● Tandem</span><span>● Trio</span></div><p className="privacy">Deine Notizen bleiben auf diesem Gerät. Du entscheidest, was du teilst.</p></div></section>
    <section className="library" aria-label="Module"><div className="libraryIntro"><p className="worldEyebrow">Das Wissensregal</p><h2>Wähle einen Band.</h2><p>Jeder Buchrücken öffnet eine andere Wissenswelt. Dein zuletzt gewählter Band liegt danach auf dem Arbeitstisch.</p></div><div className="moduleMap">{modules.map((m,i)=><button key={m.id} className={i===active?'active':''} onClick={()=>{setActive(i); setFilter('Alle'); document.getElementById('module')?.scrollIntoView({behavior:'smooth'});}}><span>{m.number}</span><strong>{m.title}</strong><small>{m.question}</small><b>{i===active?'Aufgeschlagen':'Aus dem Regal nehmen'} →</b></button>)}</div></section>
    <section className="moduleArea" id="module">
      <aside className="moduleAside"><p className="worldEyebrow">Aufgeschlagener Band · {activeModule.number}</p><h2>{activeModule.title}</h2><p>{activeModule.intro}</p><dl><dt>Primärtexte im Band</dt><dd>{activeModule.texts}</dd><dt>Zeit am Arbeitstisch</dt><dd>ca. 70–90 Minuten</dd></dl><label className="teacher"><input type="checkbox" checked={teacher} onChange={e=>setTeacher(e.target.checked)}/> Randnotizen für Lehrpersonen</label>{teacher&&<div className="teacherNote"><strong>Didaktischer Fokus</strong> Selbsterfahrung bleibt freiwillig teilbar. Gruppenprodukte sind erst abschliessbar, wenn jeder Arbeitsschritt bestätigt und ein gemeinsames Ergebnis dokumentiert ist.</div>}</aside>
      <div className="moduleContent">
        <div className="questionLead"><span>Leitfrage</span><h2>{activeModule.question}</h2></div>
        <div className="depthTabs">{(['Basis','Vertiefung','Forschung'] as const).map(d=><button className={depth===d?'active':''} onClick={()=>setDepth(d)} key={d}>{d}</button>)}</div>
        <div className="factGrid">{facts.map((fact,i)=><article key={fact}><span>0{i+1}</span><p>{fact}</p><button onClick={()=>setDialog({kind:'fact',index:i})}>{depth === 'Forschung' ? 'Forschungsfenster öffnen' : 'Denkfenster öffnen'} <b>↗</b></button></article>)}</div>
        <div className="workbenchStrip"><div><span>01</span><p><strong>Entdecken</strong>Karte öffnen und Gedanken prüfen</p></div><div><span>02</span><p><strong>Bearbeiten</strong>Auftrag im Dialog Schritt für Schritt lösen</p></div><div><span>03</span><p><strong>Rückmeldung</strong>Text sofort überarbeiten</p></div></div>
        <div className="taskHeading"><div><p className="worldEyebrow">Werkstattmappen · Erfahrung → Austausch → Urteil</p><h2>Aufträge am Schreibtisch</h2></div><div className="taskFilters">{(['Alle','Selbst','Tandem','Trio'] as const).map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
        <div className="tasks">{tasks.map(task => {
          const value=saved[task.id] || {note:'',checks:[],done:false}; const eligible=canFinish(task);
          const textReady=evaluateResponse(task.prompt, value.note, '', task.form==='Selbst'?'reflection':'group').ready;
          const guide=taskGuides[task.id];
          return <article className={`task ${task.form.toLowerCase()} ${value.done?'done':''}`} key={task.id}>
            <div className="taskMeta"><span>{task.form}</span><span>{task.minutes} Min.</span></div><h3>{task.title}</h3><p className="taskPrompt">{task.prompt}</p><button className="taskOpen" onClick={()=>setDialog({kind:'task',id:task.id})}><span>Arbeitsdialog öffnen</span><b>→</b></button>
            {task.roles&&<div className="roles">{task.roles.map((r,i)=><span key={r}>Rolle {i+1}<strong>{r}</strong></span>)}</div>}
            <div className="taskGuide"><div><span>Ausgangspunkt</span><p>{guide.material}</p></div><div><span>Genaues Ergebnis</span><p>{guide.format}</p></div><div className="taskExample"><span>Beispielanfang</span><p>{guide.example}</p></div></div>
            <div className="successCriteria"><span>Das muss enthalten sein</span><ul>{guide.criteria.map(item=><li key={item}>{item}</li>)}</ul></div>
            <div className="workflow"><span>Arbeitsablauf</span><ol>{task.steps.map((step,i)=><li key={step}>{task.form==='Selbst'?<><b>{i+1}</b><span>{step}</span></>:<label><input type="checkbox" checked={!!value.checks[i]} onChange={e=>change(task.id,{checks:Object.assign([],value.checks,{[i]:e.target.checked})})}/><span>{step}</span></label>}</li>)}</ol>{task.form!=='Selbst'&&<small>Die Häkchen bestätigen nur euren Arbeitsprozess – sie sind keine Auswahlantworten.</small>}</div>
            <label className="protocol"><span>{task.form==='Selbst'?'Deine private Reflexion':'Gemeinsames Protokoll'} · {task.product}</span><textarea value={value.note} onChange={e=>change(task.id,{note:e.target.value})} placeholder={task.form==='Selbst'?'Was hast du über dein eigenes Denken bemerkt?':'Haltet Beiträge aller Beteiligten, Belege und euren gemeinsamen Entscheid fest …'}/><small>{value.note.length} Zeichen · {task.form==='Selbst'?'mind. 80':'mind. 140'}</small></label>
            <TextFeedback prompt={`${task.prompt} ${task.product}`} answer={value.note} mode={task.form==='Selbst'?'reflection':'group'} />
            <button className="finish" disabled={(!eligible||!textReady)&&!value.done} onClick={()=>change(task.id,{done:!value.done})}>{value.done?'✓ Abgeschlossen':eligible&&textReady?'Auftrag abschliessen':'Feedback noch umsetzen'}</button>
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
