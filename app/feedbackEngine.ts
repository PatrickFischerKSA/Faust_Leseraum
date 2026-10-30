import { feedbackProfiles } from './feedbackProfiles';

type Mode = 'analysis' | 'reflection' | 'group';

type Check = { label: string; passed: boolean; feedback: string };

const synonymFamilies: Record<string, string[]> = {
  erinnerung: ['erinner', 'gedaechtn', 'vergangen', 'rueckblick'],
  publikum: ['publikum', 'oeffentlich', 'zuschau', 'menge', 'masse'],
  interessen: ['interess', 'motiv', 'ziel', 'absicht', 'anliegen'],
  wette: ['wette', 'pakt', 'deal', 'vereinbar', 'abmach'],
  streben: ['streb', 'such', 'drang', 'bemueh', 'verlang'],
  vernunft: ['vernunft', 'rational', 'verstand', 'aufklaer'],
  erkenntnis: ['erkennt', 'wissen', 'gelehrt', 'wissenschaft', 'versteh'],
  grenze: ['grenz', 'scheiter', 'unzulaeng', 'unerreich', 'beschraenk'],
  verzweiflung: ['verzweifl', 'krise', 'hoffnungslos', 'unzufried', 'zerriss'],
  magie: ['magie', 'zauber', 'geist', 'beschwoer', 'uebernatuer'],
  gegensatz: ['gegensatz', 'unterschied', 'kontrast', 'waehrend', 'hingegen'],
  manipulation: ['manipul', 'taeusch', 'verfuehr', 'taktik', 'list', 'beeinfluss'],
  macht: ['macht', 'herrschaft', 'kontroll', 'ueberlegen', 'abhaeng'],
  liebe: ['liebe', 'zuneigung', 'begehren', 'verlieb', 'naehe', 'gefuehl'],
  schuld: ['schuld', 'verantwort', 'gewissen', 'moral', 'schaem', 'scham'],
  verantwortung: ['verantwort', 'folge', 'konsequenz', 'pflicht', 'rechenschaft'],
  gesellschaft: ['gesellschaft', 'norm', 'ruf', 'ansehen', 'ausgrenz', 'urteil'],
  religion: ['glaub', 'religio', 'gott', 'kirche', 'gebet', 'fromm'],
  freiheit: ['freiheit', 'autonom', 'selbstbestimm', 'entscheid', 'zwang'],
  natur: ['natur', 'schoepfung', 'landschaft', 'umwelt', 'lebendig'],
  tod: ['tod', 'sterb', 'suizid', 'gift', 'rett', 'erlösung', 'erloes'],
  filmgestaltung: ['stimme', 'gestik', 'mimik', 'koerper', 'kamera', 'licht', 'raum', 'musik', 'pause', 'rhythm', 'schnitt', 'ton'],
};

const sceneConcepts: Record<string, string[]> = {
  zueignung: ['erinnerung','streben'],
  'vorspiel-auf-dem-theater': ['publikum','interessen','gegensatz'],
  'prolog-im-himmel': ['wette','streben','vernunft','gegensatz'],
  nacht: ['erkenntnis','grenze','verzweiflung','magie','tod'],
  'vor-dem-tor-faust-und-wagner-bauern-unter-der-linde': ['gesellschaft','gegensatz','streben'],
  'studierzimmer-i': ['erkenntnis','manipulation','gegensatz'],
  'studierzimmer-ii': ['wette','manipulation','streben','freiheit'],
  'auerbachs-keller-in-leipzig': ['gesellschaft','macht','manipulation'],
  hexenkueche: ['manipulation','liebe','macht'],
  'strasse-i': ['liebe','gesellschaft','manipulation'],
  'abend-ein-kleines-reinliches-zimmer': ['liebe','gesellschaft','schuld'],
  'margarete-mit-einer-lampe': ['liebe','gesellschaft'],
  spaziergang: ['manipulation','liebe'],
  'der-nachbarin-haus': ['gesellschaft','manipulation'],
  'strasse-ii': ['liebe','manipulation'],
  garten: ['liebe','gegensatz','religion'],
  'ein-gartenhaeuschen': ['liebe','manipulation'],
  'wald-und-hoehle': ['natur','liebe','schuld','freiheit'],
  'gretchen-am-spinnrad': ['liebe','verzweiflung'],
  'marthens-garten': ['religion','liebe','gegensatz'],
  'am-brunnen': ['gesellschaft','schuld'],
  zwinger: ['religion','schuld','verzweiflung'],
  'nacht-strasse-vor-gretchens-tuere': ['schuld','macht','tod'],
  dom: ['schuld','religion','gesellschaft'],
  walpurgisnacht: ['magie','gesellschaft','manipulation'],
  walpurgisnachtstraum: ['gesellschaft','filmgestaltung'],
  'trueber-tag-feld': ['schuld','verantwortung','freiheit'],
  kerker: ['schuld','freiheit','religion','tod'],
};

const normalize = (value: string) => value.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9\s]/g, ' ');
const hasAny = (text: string, words: string[]) => words.some(word => text.split(/\s+/).some(token => token.startsWith(normalize(word))));

export function evaluateResponse(prompt: string, answer: string, context = '', mode: Mode = 'analysis', questionId?: number) {
  const text = normalize(answer);
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = answer.split(/[.!?]+/).filter(part => part.trim().length > 8);
  const concepts = sceneConcepts[context] || Object.keys(synonymFamilies).filter(key => hasAny(normalize(prompt), synonymFamilies[key])).slice(0, 4);
  const profile = questionId === undefined ? undefined : feedbackProfiles[questionId];
  const recognized = concepts.filter(key => hasAny(text, synonymFamilies[key]));
  const promptTerms = normalize(prompt).split(/\s+/).filter(word => word.length > 6 && !['welche','warum','inwiefern','zwischen','aufgabe','gemeinsam','formuliert','beschreibt'].includes(word));
  const promptOverlap = promptTerms.filter(term => text.includes(term.slice(0, Math.max(5, term.length - 2)))).length;
  const contentPassed = concepts.length ? recognized.length >= Math.min(2, Math.max(1, concepts.length)) : promptOverlap >= 2;
  const reasoning = hasAny(text, ['weil','denn','daher','deshalb','folglich','somit','dadurch','indem','weshalb','begründe','begruende']);
  const evidence = hasAny(text, ['zitat','vers','textstelle','passage','szene','film','wortwahl','zeigt','belegt','verdeutlicht','erkennbar','spricht','sagt','bild','stimme','gestik','kamera','licht']);
  const perspective = hasAny(text, mode === 'group' ? ['wir','uns','gemeinsam','person 1','person 2','rolle','konsens','dissens'] : ['ich','mir','meiner','persoenlich','erfahrung','bemerke']);
  const checks: Check[] = [
    { label:'Ausgeführt', passed:words.length >= (mode === 'reflection' ? 35 : 45) && sentences.length >= 3, feedback:words.length < (mode === 'reflection' ? 35 : 45) ? `Noch ausbauen: derzeit ${words.length} Wörter.` : 'Die Antwort ist ausreichend ausgeführt.' },
    { label:'Inhalt', passed:contentPassed, feedback:recognized.length ? `Erkannte Begriffe und Synonyme: ${recognized.join(', ')}.` : contentPassed ? 'Zentrale Begriffe der Aufgabe werden inhaltlich aufgenommen.' : 'Greife mindestens zwei zentrale Gedanken der Szene oder Aufgabe auf.' },
    { label:'Belegt', passed:evidence, feedback:evidence ? 'Ein Text- oder Filmbezug ist erkennbar.' : 'Ergänze eine konkrete Textstelle oder Filmbeobachtung.' },
    { label:'Begründet', passed:reasoning, feedback:reasoning ? 'Die Gedanken werden sprachlich begründet.' : 'Verknüpfe These und Beleg, etwa mit „weil“, „dadurch“ oder „daher“.' },
  ];
  if (mode !== 'analysis') checks[2] = { label:mode === 'group'?'Perspektiven':'Reflexion', passed:perspective, feedback:perspective ? (mode === 'group'?'Mehrere Beiträge oder Rollen sind erkennbar.':'Die eigene Perspektive wird sichtbar.') : (mode === 'group'?'Macht die Beiträge der Beteiligten oder einen Dissens sichtbar.':'Formuliere, was du selbst wahrgenommen oder neu verstanden hast.') };
  if (profile) {
    const matched = profile.groups.filter(group => hasAny(text, group.stems));
    const missing = profile.groups.filter(group => !hasAny(text, group.stems));
    checks[0] = {label:'Ausgeführt', passed:words.length >= 20, feedback:words.length >= 20 ? `${words.length} Wörter: Prüfe, ob du alle Teilfragen beantwortet hast; die Länge allein bewertet keine Qualität.` : `${words.length} Wörter: Ergänze eine konkrete Beobachtung und ihre Erklärung. Eine kurze treffende Antwort ist zulässig.`};
    checks[1] = {label:'Aufgabenbezug', passed:matched.length === profile.groups.length, feedback:matched.length ? `Sprachliche Anknüpfungen: ${matched.map(g=>g.label).join(', ')}.${missing.length ? ' Noch keine eindeutigen Signale zu: '+missing.map(g=>g.label).join(', ')+'. Andere passende Formulierungen sind möglich.' : ' Das bestätigt keine inhaltliche Richtigkeit.'}` : 'Die lokale Worterkennung findet noch keinen eindeutigen Anknüpfungspunkt. Das ist kein Falschurteil; prüfe deine Antwort am folgenden Aufgabenhinweis.'};
    checks[2].feedback = evidence ? 'Ein mögliches Belegsignal ist erkennbar. Prüfe selbst, ob die genannte Stelle konkret und passend ist.' : 'Ergänze einen konkreten Wortlaut, eine Handlung oder eine Filmbeobachtung. Ein Beleg kann auch ohne eines der erkannten Signalwörter vorliegen.';
    checks[3].feedback = reasoning ? 'Ein sprachliches Begründungssignal ist erkennbar. Prüfe, ob der Grund deine Aussage tatsächlich stützt.' : 'Mache die Verbindung zwischen deiner Beobachtung und deiner Deutung ausdrücklich. Nicht jede Begründung enthält ein Signalwort.';
  }
  const passed = checks.filter(check => check.passed).length;
  return { checks, passed, hint:profile?.hint, ready: profile ? words.length >= 5 : passed >= 3, level: passed === 4 ? 'stark' : passed >= 2 ? 'entwickelt' : 'anfang' };
}

