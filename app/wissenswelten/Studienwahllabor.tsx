'use client';

import { useEffect, useState } from 'react';
import { TextFeedback } from '../feedback';

type Discipline = {
  name:string; short:string; scene:string; question:string;
  faust:{view:string;strength:string;warning:string};
  mephisto:{view:string;strength:string;warning:string};
};

const disciplines:Discipline[]=[
  {name:'Philosophie',short:'PHI',scene:'Nacht · Studierzimmer I',question:'Kann Denken die Welt als Ganzes erfassen?',faust:{view:'Faust sucht nicht nur einzelne Kenntnisse. Er will verstehen, „was die Welt im Innersten zusammenhält“, und misst die Philosophie an diesem umfassenden Anspruch.',strength:'Radikale Fragen stellen und Voraussetzungen prüfen.',warning:'Der Wunsch nach vollständiger Erkenntnis kann erreichbares Wissen entwerten.'},mephisto:{view:'Mephistopheles führt Logik und Metaphysik als starre Lehrgänge vor. Seine Karikatur trifft leere Gelehrsamkeit, ersetzt Argumente aber durch Spott.',strength:'Unverständliche Begriffe und akademische Routinen entlarven.',warning:'Zynismus kann jede ernsthafte Suche nach Wahrheit untergraben.'}},
  {name:'Rechtswissenschaft',short:'JUR',scene:'Nacht · Studierzimmer II',question:'Schützt Recht das Gerechte – oder nur das Überlieferte?',faust:{view:'Faust nennt die Rechtswissenschaft als Teil einer langen Ausbildung, die seine Erkenntniskrise nicht lösen konnte. Das Fach erscheint zunächst aus der Perspektive seiner Enttäuschung.',strength:'Normen, Verantwortung und begründete Entscheidungen untersuchen.',warning:'Faust urteilt pauschal und zeigt noch nicht, was juristische Methode leisten kann.'},mephisto:{view:'Mephistopheles verspottet überlieferte Gesetze: Was einmal Recht war, könne später zur Last werden. Er benennt Veränderungsbedarf, ohne eine gerechtere Ordnung anzubieten.',strength:'Fragen, wem Regeln dienen und wie sie historisch entstanden sind.',warning:'Wer nur Misstrauen sät, kann Recht kritisieren, aber nicht verantwortlich verbessern.'}},
  {name:'Medizin',short:'MED',scene:'Nacht · Vor dem Tor · Studierzimmer II',question:'Was schuldet Wissen den Menschen, die ihm vertrauen?',faust:{view:'Faust erinnert sich an die Heilversuche seines Vaters während einer Seuche und zweifelt rückblickend an ihrem Nutzen. Medizinisches Wissen wird zur Frage nach Evidenz und Verantwortung.',strength:'Naturwissenschaftliches Wissen auf konkrete Hilfe ausrichten.',warning:'Gute Absicht schützt nicht vor Schaden; Wirksamkeit muss geprüft werden.'},mephisto:{view:'Mephistopheles reduziert das Medizinstudium in seiner Beratung auf oberflächliche Erfahrung und persönliche Wirkung. Fachliche Verantwortung wird zur zynischen Erfolgsstrategie.',strength:'Er erinnert daran, dass Medizin mit wirklichen Menschen zu tun hat.',warning:'Sein Rat missachtet Prüfung, Grenzen und die Würde der behandelten Person.'}},
  {name:'Theologie',short:'THE',scene:'Nacht · Prolog im Himmel · Studierzimmer I',question:'Wie lassen sich Glaube, Zweifel und Wissen zueinander bestimmen?',faust:{view:'Faust hat auch Theologie studiert, findet darin aber keine Gewissheit. Zugleich übersetzt er den Johannes-Prolog selbst und ringt produktiv mit dessen Bedeutung.',strength:'Letzte Fragen nach Sinn, Gutem und menschlicher Begrenztheit bearbeiten.',warning:'Persönliche Enttäuschung kann mit einer Widerlegung des Fachs verwechselt werden.'},mephisto:{view:'Mephistopheles tritt als Gegenstimme zu Sinn- und Heilsgewissheiten auf. Er macht Widersprüche sichtbar, verfolgt dabei aber keine offene Suche nach Wahrheit.',strength:'Selbstsichere Antworten mit Zweifel und Gegenbeispielen prüfen.',warning:'Seine Verneinung bleibt interessengeleitet und ist keine neutrale Kritik.'}}
];

type LabState={active:number;interest:number;method:number;responsibility:number;attraction:string;warning:string;judgement:string;partner:string};
const initial:LabState={active:0,interest:50,method:50,responsibility:50,attraction:'',warning:'',judgement:'',partner:''};

export default function Studienwahllabor(){
  const [state,setState]=useState<LabState>(initial); const [ready,setReady]=useState(false);
  useEffect(()=>{/* eslint-disable react-hooks/set-state-in-effect -- browser-only local workspace */try{setState({...initial,...JSON.parse(localStorage.getItem('faust-studienwahllabor')||'{}')});}catch{}setReady(true);/* eslint-enable react-hooks/set-state-in-effect */},[]);
  useEffect(()=>{if(ready)localStorage.setItem('faust-studienwahllabor',JSON.stringify(state));},[ready,state]);
  const change=<K extends keyof LabState>(key:K,value:LabState[K])=>setState(current=>({...current,[key]:value}));
  const d=disciplines[state.active];
  const result=`${d.name}: Interesse ${state.interest}/100, passende Arbeitsweise ${state.method}/100, gesellschaftliche Verantwortung ${state.responsibility}/100. ${state.attraction} ${state.warning} ${state.judgement}`;
  return <section className="studyChoiceLab" id="studienwahl">
    <header><div><p className="worldEyebrow">Studienwahllabor · Faust I</p><h2>Vier Fächer.<br/>Zwei Stimmen. Dein Urteil.</h2></div><p>Faust hat Philosophie, Rechtswissenschaft, Medizin und Theologie studiert. Untersuche jedes Fach mit seinen Fragen – und mit Mephistopheles’ Einwänden. Die Perspektiven sind literarische Denkangebote, keine heutige Studienberatung.</p></header>
    <nav aria-label="Disziplin wählen">{disciplines.map((item,index)=><button className={state.active===index?'active':''} onClick={()=>change('active',index)} key={item.short}><span>{item.short}</span><strong>{item.name}</strong></button>)}</nav>
    <div className="choiceQuestion"><span>Leitfrage</span><h3>{d.question}</h3><small>Textgrundlage: {d.scene}</small></div>
    <div className="perspectiveDesk">
      <article className="faustView"><div className="perspectiveHead"><span>F</span><div><small>Faustische Perspektive</small><h3>Erkenntnis suchen</h3></div></div><p>{d.faust.view}</p><dl><dt>Mögliche Stärke</dt><dd>{d.faust.strength}</dd><dt>Warnung</dt><dd>{d.faust.warning}</dd></dl></article>
      <div className="versus" aria-hidden="true">↔</div>
      <article className="mephistoView"><div className="perspectiveHead"><span>M</span><div><small>Mephistophelische Perspektive</small><h3>Gewissheiten stören</h3></div></div><p>{d.mephisto.view}</p><dl><dt>Mögliche Stärke</dt><dd>{d.mephisto.strength}</dd><dt>Warnung</dt><dd>{d.mephisto.warning}</dd></dl></article>
    </div>
    <div className="choiceWorkbench">
      <div className="choiceSliders"><p><span>Prüfe das Fach an deinen Kriterien</span>Die Regler sind kein Testergebnis. Sie zwingen dich, dein Urteil genauer zu begründen.</p>{([['interest','Interesse an der Leitfrage'],['method','Passung der Arbeitsweise'],['responsibility','Gesellschaftliche Verantwortung']] as const).map(([key,label])=><label key={key}><span>{label}<b>{state[key]}</b></span><input type="range" min="0" max="100" value={state[key]} onChange={e=>change(key,Number(e.target.value))}/></label>)}</div>
      <div className="choiceWriting"><label><span>Was zieht dich an diesem Fach an?</span><textarea value={state.attraction} onChange={e=>change('attraction',e.target.value)} placeholder={`An ${d.name} interessiert mich …, weil …`}/></label><label><span>Welche Warnung nimmst du ernst?</span><textarea value={state.warning} onChange={e=>change('warning',e.target.value)} placeholder="Fausts oder Mephistopheles’ Einwand ist wichtig, weil …"/></label><label className="choiceJudgement"><span>Dein vorläufiges Studienurteil</span><textarea value={state.judgement} onChange={e=>change('judgement',e.target.value)} placeholder="Das Fach könnte zu mir passen, wenn … / Dagegen spricht … / Prüfen müsste ich noch …"/></label><TextFeedback prompt={`Beurteile ${d.name} anhand der Leitfrage, der faustischen und der mephistophelischen Perspektive. Begründe ein vorläufiges Studienurteil und nenne eine offene Frage.`} answer={result}/></div>
    </div>
    <footer><div><span>Zu zweit weiterdenken</span><p>Eine Person verteidigt das Fach aus Fausts Perspektive, die andere prüft es mit Mephistopheles’ Einwänden. Wechselt danach die Rollen.</p></div><label><span>Was hat sich nach dem Perspektivwechsel verändert?</span><input value={state.partner} onChange={e=>change('partner',e.target.value)} placeholder="Zuerst dachte ich …; nach dem Rollenwechsel …"/></label></footer>
  </section>;
}
