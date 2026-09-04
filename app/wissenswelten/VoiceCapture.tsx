'use client';

import { useEffect, useRef, useState } from 'react';

type RecognitionResult={isFinal:boolean;0:{transcript:string}};
type RecognitionEvent={results:ArrayLike<RecognitionResult>};
type RecognitionInstance={lang:string;continuous:boolean;interimResults:boolean;onresult:null|((event:RecognitionEvent)=>void);onerror:null|(()=>void);onend:null|(()=>void);start:()=>void;stop:()=>void;abort:()=>void};
type RecognitionConstructor=new()=>RecognitionInstance;

const countWords=(value:string)=>value.trim().split(/\s+/).filter(Boolean).length;
const checks=(value:string)=>[
 {label:'konkret',ok:countWords(value)>=15,hint:'Nenne eine konkrete Situation oder Tätigkeit.'},
 {label:'belegt',ok:/arbeit|journal|text|stelle|ausschnitt|beleg|beispiel|damals|als ich|zeigt/i.test(value),hint:'Füge einen Beleg aus Arbeit, Journal oder eigener Erfahrung hinzu.'},
 {label:'begründet',ok:/weil|denn|deshalb|daher|dadurch|aber|obwohl/i.test(value),hint:'Erkläre mit „weil“, „aber“ oder „deshalb“, wie du schliesst.'},
 {label:'Studienbezug',ok:/studium|studiengang|fach|modul|hochschule|universität|universitaet|beruf|disziplin|studienwahl/i.test(value),hint:'Sage ausdrücklich, was daraus für deine Studienwahl folgt.'},
];

export default function VoiceCapture({value,onChange,label,prompt,seconds=45}:{value:string;onChange:(value:string)=>void;label:string;prompt:string;seconds?:number}){
 const recognition=useRef<RecognitionInstance|null>(null);const timer=useRef<ReturnType<typeof setInterval>|null>(null);const base=useRef('');
 const [supported,setSupported]=useState(true);const [listening,setListening]=useState(false);const [remaining,setRemaining]=useState(seconds);const [message,setMessage]=useState('');
 useEffect(()=>()=>{recognition.current?.abort();if(timer.current)clearInterval(timer.current);},[]);
 const stop=()=>{recognition.current?.stop();if(timer.current)clearInterval(timer.current);timer.current=null;setListening(false);};
 const start=()=>{
  const browser=window as typeof window&{SpeechRecognition?:RecognitionConstructor;webkitSpeechRecognition?:RecognitionConstructor};const Recognition=browser.SpeechRecognition||browser.webkitSpeechRecognition;
  if(!Recognition){setSupported(false);setMessage('Dieser Browser bietet keine Spracheingabe. Du kannst das Transkript unten kurz eintippen.');return;}
  const instance=new Recognition();recognition.current=instance;base.current=value.trim();instance.lang='de-CH';instance.continuous=true;instance.interimResults=true;
  instance.onresult=event=>{let spoken='';for(let index=0;index<event.results.length;index++)spoken+=`${event.results[index][0].transcript} `;onChange([base.current,spoken.trim()].filter(Boolean).join(' '));setMessage('Transkript wird sofort geprüft.');};
  instance.onerror=()=>{setMessage('Die Aufnahme wurde nicht erkannt. Prüfe die Mikrofonfreigabe oder nutze das Textfeld.');stop();};instance.onend=()=>{setListening(false);if(timer.current)clearInterval(timer.current);timer.current=null;setMessage('Aufnahme beendet. Du kannst das Transkript korrigieren oder ergänzen.');};
  setRemaining(seconds);setMessage('Sprich frei. Du musst keinen ausformulierten Text vorlesen.');setListening(true);instance.start();timer.current=setInterval(()=>setRemaining(current=>{if(current<=1){instance.stop();if(timer.current)clearInterval(timer.current);timer.current=null;return 0;}return current-1;}),1000);
 };
 const result=checks(value);const next=result.find(item=>!item.ok);
 return <div className={`voiceCapture ${listening?'listening':''}`}><div className="voicePrompt"><span>{label}</span><p>{prompt}</p></div><button type="button" className="micButton" onClick={listening?stop:start} aria-pressed={listening}><i aria-hidden="true">{listening?'■':'●'}</i><b>{listening?'Aufnahme stoppen':'Antwort einsprechen'}</b><small>{listening?`${remaining} Sekunden`:`max. ${seconds} Sekunden`}</small></button><div className="voiceStatus" role="status">{message||'Mikrofon anklicken, sprechen und das erkannte Transkript kurz prüfen.'}</div><div className="voiceChecks" aria-label="Sofortfeedback">{result.map(item=><span className={item.ok?'passed':''} key={item.label}>{item.ok?'✓':'○'} {item.label}</span>)}</div>{value&&<p className={`voiceNext ${next?'':'ready'}`}><b>{next?'Nächster Schritt':'Aussage auswertbar'}:</b> {next?next.hint:'Der Beitrag ist konkret, belegt, begründet und auf die Studienwahl bezogen.'}</p>}<details open={!supported}><summary>Transkript ansehen und korrigieren</summary><textarea rows={4} value={value} onChange={event=>onChange(event.target.value)} placeholder="Das erkannte Gesagte erscheint hier …"/><small>{countWords(value)} Wörter · Das Transkript bleibt auf diesem Gerät. Die Spracherkennung stellt der Browser bereit.</small></details></div>;
}
