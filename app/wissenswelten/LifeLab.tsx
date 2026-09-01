'use client';

import { useEffect, useState } from 'react';

type LabState = Record<string, string | number | string[]>;

const labCopy: Record<string, { tag:string; title:string; intro:string; transfer:string }> = {
  werkstatt:{tag:'UPDATE-LOG',title:'Was hat sich bei dir schon dreimal verändert?',intro:'Apps, Profile, Texte, Pläne: Fast nichts bleibt bei Version 1.0. Mach die Entwicklung eines eigenen Projekts sichtbar.',transfer:'Goethes Faust existiert ebenfalls nicht einfach als eine endgültige Version. Öffne danach die Fassungsvergleiche und prüfe, was ein Update mit der Wirkung macht.'},
  krise:{tag:'INFO-OVERLOAD',title:'Mehr wissen – und trotzdem keinen Plan?',intro:'Du hast zwölf Tabs offen, drei Chats ungelesen und noch immer keine Antwort. Miss einen Moment, in dem Information nicht automatisch Orientierung wurde.',transfer:'Faust kennt sehr viel und erlebt sein Wissen trotzdem als ungenügend. Vergleiche dein Beispiel mit seinem Monolog in „Nacht“.'},
  natur:{tag:'60-SECOND CAMERA',title:'Siehst du – oder deutest du schon?',intro:'Lege das Smartphone für 60 Sekunden mit dem Display nach unten. Beobachte einen Gegenstand in deiner Nähe und halte nur fest, was wirklich wahrnehmbar ist.',transfer:'Goethes Naturforschung setzt bei genauer Anschauung an. Prüfe danach, an welcher Stelle aus Beobachtung eine Erklärung geworden ist.'},
  philosophie:{tag:'WORD REMIX',title:'Was kommt bei dir zuerst?',intro:'Faust ringt mit Wort, Sinn, Kraft und Tat. Bring die vier Begriffe in deine Reihenfolge – nicht abstrakt, sondern für eine echte Entscheidung dieser Woche.',transfer:'Vergleiche deine Reihenfolge mit Fausts Übersetzungsbewegung. Wo würdet ihr euch widersprechen?'},
  homunculus:{tag:'AI CHAT LAB',title:'Wer trägt die Verantwortung, wenn Technik antwortet?',intro:'Schreibe einen kurzen Chat zwischen einem lernfähigen System und der Person, die es entwickelt hat. Beide müssen eine Forderung stellen und eine Grenze anerkennen.',transfer:'Homunculus ist geschaffen, sprachfähig und abhängig. Nutze den Chat, um Freiheit und Verantwortung in Faust II genauer zu untersuchen.'},
  fortschritt:{tag:'IMPACT CHECK',title:'Cool für wen – teuer für wen?',intro:'Nimm eine Neuerung aus deinem Alltag: KI-Tool, Lieferdienst, neues Schulgerät, Verkehrsprojekt oder Social-Media-Funktion. Verteile Nutzen und Kosten sichtbar.',transfer:'Fausts Grossprojekt verspricht Zukunft und produziert Schäden. Prüfe, welche Perspektive in deiner ersten Bewertung gefehlt hat.'}
};

export default function LifeLab({ moduleId }: { moduleId: string }) {
  const copy = labCopy[moduleId];
  const [state, setState] = useState<LabState>({});
  const [hydrated, setHydrated] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  useEffect(()=>{
    /* eslint-disable react-hooks/set-state-in-effect -- browser-only local workspace */
    try { setState(JSON.parse(localStorage.getItem(`faust-lab-${moduleId}`)||'{}')); } catch {}
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  },[moduleId]);
  useEffect(()=>{ if(hydrated)localStorage.setItem(`faust-lab-${moduleId}`,JSON.stringify(state)); },[hydrated,moduleId,state]);
  useEffect(()=>{ if(!running||seconds<=0)return; const timer=window.setInterval(()=>setSeconds(value=>value-1),1000); return()=>window.clearInterval(timer); },[running,seconds]);
  if(!copy)return null;
  const set=(key:string,value:string|number|string[])=>setState(current=>({...current,[key]:value}));
  const field=(key:string,placeholder:string)=><textarea value={String(state[key]||'')} onChange={event=>set(key,event.target.value)} placeholder={placeholder}/>;
  const order=(state.order as string[])||['Wort','Sinn','Kraft','Tat'];
  const move=(index:number,direction:-1|1)=>{const next=[...order];const target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];set('order',next)};
  const messages=(state.messages as string[])||[];
  return <section className="lifeLab">
    <header><div><span>{copy.tag}</span><h2>{copy.title}</h2></div><p>{copy.intro}</p></header>
    <div className="labScreen">
      {moduleId==='werkstatt'&&<div className="versionLab"><label><span>Version 1.0</span>{field('v1','So sah dein erster Plan aus …')}</label><label><span>Der Moment, der alles änderte</span>{field('change','Feedback, Fehler, neue Idee …')}</label><label><span>Version 3.0</span>{field('v3','So sieht es heute aus …')}</label></div>}
      {moduleId==='krise'&&<div className="overloadLab"><div className="signal"><strong>{state.load||50}%</strong><input aria-label="Gefühlte Informationsmenge" type="range" min="0" max="100" value={Number(state.load||50)} onChange={e=>set('load',Number(e.target.value))}/><span>ruhig ← Informationsdruck → komplett voll</span></div><label><span>Eine echte Situation</span>{field('situation','Zum Beispiel: Ich habe zu … zehn Videos gesehen und wusste danach trotzdem nicht …')}</label><label><span>Was hätte statt mehr Information geholfen?</span>{field('orientation','Eine Person, ein Wert, Ausprobieren, Pause …')}</label></div>}
      {moduleId==='natur'&&<div className="observationLab"><div className="timer"><strong>{seconds}</strong><span>Sekunden</span><button onClick={()=>{if(seconds===0)setSeconds(60);setRunning(value=>!value)}}>{seconds===0?'Neu starten':running?'Pause':'Beobachtung starten'}</button></div><div className="observationInputs">{[0,1,2,3,4].map(index=><label key={index}><span>Beobachtung {index+1}</span><input value={String(state[`obs${index}`]||'')} onChange={e=>set(`obs${index}`,e.target.value)} placeholder={index===0?'Nur sichtbar, hörbar oder fühlbar …':'Noch ein genaues Detail …'}/></label>)}</div></div>}
      {moduleId==='philosophie'&&<div className="remixLab"><div className="wordStack">{order.map((word,index)=><div key={word}><b>{index+1}</b><strong>{word}</strong><span><button disabled={index===0} onClick={()=>move(index,-1)}>↑</button><button disabled={index===order.length-1} onClick={()=>move(index,1)}>↓</button></span></div>)}</div><label><span>Deine konkrete Entscheidung</span>{field('decision','Bei … kommt für mich zuerst …, weil …')}</label></div>}
      {moduleId==='homunculus'&&<div className="chatLab"><div className="chatMessages">{messages.length?messages.map((message,index)=><p className={message.startsWith('SYSTEM:')?'system':''} key={`${message}-${index}`}><span>{message.startsWith('SYSTEM:')?'System':'Entwicklung'}</span>{message.replace(/^(SYSTEM:|MENSCH:)\s*/,'')}</p>):<div className="emptyChat">Noch keine Nachrichten. Beginnt mit einer Forderung, nicht mit Smalltalk.</div>}</div><div className="chatComposer"><div><button className={state.speaker==='system'?'active':''} onClick={()=>set('speaker','system')}>System schreibt</button><button className={state.speaker!=='system'?'active':''} onClick={()=>set('speaker','human')}>Entwicklung schreibt</button></div><input value={String(state.draft||'')} onChange={e=>set('draft',e.target.value)} placeholder="Ich fordere … / Meine Grenze ist …"/><button onClick={()=>{const draft=String(state.draft||'').trim();if(!draft)return;set('messages',[...messages,`${state.speaker==='system'?'SYSTEM':'MENSCH'}: ${draft}`]);set('draft','')}}>Senden</button></div></div>}
      {moduleId==='fortschritt'&&<div className="impactLab"><label><span>Welche Neuerung?</span><input value={String(state.project||'')} onChange={e=>set('project',e.target.value)} placeholder="Zum Beispiel: KI-Hausaufgabenhilfe"/></label><div className="impactSliders"><label><span>Nutzen für mich <b>{state.benefit||50}</b></span><input type="range" min="0" max="100" value={Number(state.benefit||50)} onChange={e=>set('benefit',Number(e.target.value))}/></label><label><span>Kosten für andere <b>{state.cost||50}</b></span><input type="range" min="0" max="100" value={Number(state.cost||50)} onChange={e=>set('cost',Number(e.target.value))}/></label></div><div className="stakeholders"><label><span>Wer gewinnt?</span>{field('winner','Person oder Gruppe + konkreter Gewinn')}</label><label><span>Wer zahlt?</span>{field('payer','Person, Umwelt oder Zukunft + konkreter Preis')}</label></div></div>}
    </div>
    <footer><div><span>FAUST-CONNECTION</span><p>{copy.transfer}</p></div><label><span>Zu zweit: Was sieht die andere Person anders?</span><input value={String(state.partner||'')} onChange={e=>set('partner',e.target.value)} placeholder="Ein Satz genügt – aber er muss konkret sein."/></label></footer>
  </section>;
}
