export type AnalysisSignal={label:string;score:number;level:string;explanation:string;evidence:string[]};
export type DocumentAnalysis={wordCount:number;sentenceCount:number;averageSentence:number;keywords:string[];signals:AnalysisSignal[];features:string[]};

const stopwords=new Set('aber alle allem allen aller alles als also am an auch auf aus bei bin bis bist da damit dann das dass dein deine dem den der des die dies diese doch dort durch ein eine einem einen einer eines er es etwas für gegen hat hatte haben hier ich im in ist ja jede jedem jeden jeder jedes kann kein keine mit muss nach nicht noch nun nur ob oder ohne sehr sich sie sind so über um und uns unter vom von vor war waren was weil welche welchem welchen welcher welches wenn wer wie wir wird wo zu zum zur'.split(' '));
const sentences=(text:string)=>text.split(/(?<=[.!?])\s+/).map(item=>item.trim()).filter(item=>item.length>24);
const normalized=(text:string)=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss');
const countMarkers=(text:string,markers:string[])=>markers.reduce((sum,marker)=>sum+(normalized(text).match(new RegExp(`\\b${marker}`,'g'))||[]).length,0);
const evidenceFor=(source:string,markers:string[])=>sentences(source).filter(sentence=>markers.some(marker=>normalized(sentence).includes(marker))).slice(0,2).map(sentence=>sentence.length>230?`${sentence.slice(0,227)}…`:sentence);
const level=(score:number)=>score>=72?'stark ausgeprägt':score>=46?'deutlich sichtbar':score>=24?'punktuell sichtbar':'kaum explizit';
const signal=(text:string,wordCount:number,label:string,markers:string[],explanation:string):AnalysisSignal=>{const hits=countMarkers(text,markers);const density=hits/Math.max(1,wordCount)*1000;const score=Math.min(100,Math.round(density*15));return{label,score,level:level(score),explanation,evidence:evidenceFor(text,markers)};};
const topKeywords=(text:string)=>{const counts=new Map<string,number>();for(const token of normalized(text).replace(/[^a-z0-9äöü\s-]/g,' ').split(/\s+/)){if(token.length<5||stopwords.has(token)||/^\d+$/.test(token))continue;counts.set(token,(counts.get(token)||0)+1);}return[...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([word])=>word);};
const basics=(text:string)=>{const wordCount=text.trim().split(/\s+/).filter(Boolean).length;const sentenceCount=sentences(text).length;return{wordCount,sentenceCount,averageSentence:sentenceCount?Math.round(wordCount/sentenceCount):0,keywords:topKeywords(text)};};

export function analyzeMaturWork(text:string):DocumentAnalysis{
 const base=basics(text);
 const signals=[
  signal(text,base.wordCount,'Erklären & Folgern',['weil','daher','deshalb','folglich','somit','ursach','wirkung','fuhrt','ergibt'],'Markiert kausale Verknüpfungen und ausdrücklich gezogene Schlüsse.'),
  signal(text,base.wordCount,'Abwägen & Gegenpositionen',['jedoch','allerdings','hingegen','einerseits','andererseits','obwohl','einwand','gegenposition','kritik','dennoch'],'Zeigt, wie oft der Text Spannungen, Einwände oder alternative Sichtweisen sichtbar macht.'),
  signal(text,base.wordCount,'Belegorientierung',['zeigt','belegt','quelle','studie','daten','ergebnis','befund','zitat','abbild','tabelle','nachweis'],'Erfasst sprachliche Signale, mit denen Aussagen an Quellen, Daten oder Beobachtungen gebunden werden.'),
  signal(text,base.wordCount,'Begriffsarbeit',['begriff','definition','bedeutet','definier','unterscheid','konzept','kategorie','verstandnis'],'Zeigt, ob zentrale Begriffe definiert, unterschieden oder problematisiert werden.'),
  signal(text,base.wordCount,'Erkenntnisvorsicht',['konnte','moglich','vermutlich','wahrscheinlich','grenze','einschrank','offen bleibt','nicht eindeutig','nur bedingt'],'Erfasst Formulierungen, die Reichweite, Unsicherheit und Grenzen eigener Aussagen markieren.'),
  signal(text,base.wordCount,'Empirisches Forschen',['interview','umfrage','experiment','stichprobe','mess','daten','beobacht','auswertung','proband','statist'],'Hinweise auf Datenerhebung, Beobachtung, Messung und Auswertung.'),
  signal(text,base.wordCount,'Hermeneutisches Forschen',['interpret','deut','textanal','quelle','motiv','symbol','kontext','darstellung','erzahl','figur'],'Hinweise auf Auslegung von Texten, Quellen, Darstellungen und Kontexten.'),
  signal(text,base.wordCount,'Theoretisch-systematisches Forschen',['theorie','modell','argument','begriff','annahme','these','literatur','system','prinzip'],'Hinweise auf Modellbildung, Begriffsarbeit, Literatur und systematische Argumentation.'),
  signal(text,base.wordCount,'Gestaltendes Forschen',['entwick','gestalt','entwurf','prototyp','produkt','konzept','umsetz','optimier','design','verfahren'],'Hinweise auf Entwicklung, Gestaltung, Erprobung oder Optimierung eines eigenen Ergebnisses.')
 ];
 const citationSignals=(text.match(/\([A-ZÄÖÜ][^)]*,?\s*(?:19|20)\d{2}[^)]*\)/g)||[]).length+(text.match(/[„“«»]/g)||[]).length;
 const features=[citationSignals>8?'Dichte Quellen- und Zitatsignale':'Quellenbezüge sprachlich noch wenig sichtbar',base.averageSentence>27?'Komplexer Satzbau mit längeren Gedankengängen':base.averageSentence<14?'Kurze, stark segmentierte Argumentation':'Mittlere Satzlänge',text.includes('?')?'Explizite Fragen strukturieren den Text':'Forschungsfrage im Wortlaut nicht automatisch erkannt'];
 return{...base,signals,features};
}

export function analyzeWorkJournal(text:string):DocumentAnalysis{
 const base=basics(text);
 const signals=[
  signal(text,base.wordCount,'Motivationale Selbstbeobachtung',['interess','neugier','motiv','freude','spannend','reiz','sinn','wollte','frust','lust'],'Zeigt, ob Interesse, Sinn, Freude und Frustration konkret reflektiert werden – nicht, wie „motiviert“ eine Person ist.'),
  signal(text,base.wordCount,'Organisation & Planung',['plan','ziel','etappe','schritt','prioritat','struktur','gliederung','vorbereit','termin','meilenstein','liste'],'Erfasst sichtbare Planung, Etappierung, Priorisierung und Vorbereitung.'),
  signal(text,base.wordCount,'Resilienter Umgang mit Rückschlägen',['problem','schwierig','ruckschlag','gescheit','fehler','trotzdem','angepasst','losung','alternative','neu versucht','hilfe'],'Zeigt, ob Schwierigkeiten benannt und mit Anpassung, Hilfe oder neuen Versuchen verbunden werden.'),
  signal(text,base.wordCount,'Durchhaltewillen & Überarbeitung',['weiter','drangeblieben','wieder','erneut','uberarbeit','fortgesetzt','durchgehalt','abgeschlossen','verbessert','mehrfach'],'Erfasst sprachliche Spuren von Fortsetzung, Wiederholung und Überarbeitung.'),
  signal(text,base.wordCount,'Zeitmanagement',['zeitplan','deadline','frist','termin','woche','tag','stunde','puffer','verspat','rechtzeitig','verschoben','kalender'],'Erfasst konkrete Zeitangaben, Fristen, Puffer und reflektierte Planabweichungen.'),
  signal(text,base.wordCount,'Selbststeuerung & Hilfeholen',['entschied','entscheidung','selbststandig','feedback','ruckmeldung','betreuung','nachgefragt','hilfe','gesprach','angepasst'],'Zeigt, wo Entscheidungen selbst getroffen und externe Rückmeldungen produktiv genutzt wurden.')
 ];
 const dateSignals=(text.match(/\b(?:\d{1,2}[./-]\d{1,2}(?:[./-]\d{2,4})?|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)\b/gi)||[]).length;
 const features=[dateSignals>=5?'Regelmässige konkrete Zeitmarken':dateSignals?'Einzelne konkrete Zeitmarken':'Kaum konkrete Daten oder Tagesmarken',countMarkers(text,['ich'])>10?'Konsequent aus eigener Perspektive dokumentiert':'Eigene Entscheidungen teilweise implizit',sentences(text).length>20?'Kontinuierliche Prozessspur':'Eher knappe oder punktuelle Prozessspur'];
 return{...base,signals,features};
}
