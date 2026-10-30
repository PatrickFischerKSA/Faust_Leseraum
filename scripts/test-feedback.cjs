const assert=require('node:assert/strict');const fs=require('node:fs');const ts=require('typescript');const vm=require('node:vm');const path=require('node:path');
const cache={};function load(name){const file=path.resolve(__dirname,'../app',name+'.ts');if(cache[file])return cache[file];const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const module={exports:{}};vm.runInNewContext(output,{module,exports:module.exports,require:n=>load(n.replace('./',''))});return cache[file]=module.exports;}
const {evaluateResponse:e}=load('feedbackEngine'),{scenes}=load('data'),{feedbackProfiles:p}=load('feedbackProfiles');
assert.equal(Object.keys(p).length,84);for(const s of scenes)for(const q of s.questions){assert(p[q.id]?.hint.length>40);assert.equal(e(q.text,'',s.slug,'analysis',q.id).ready,false);assert.equal(e(q.text,'Beliebige Wörter ohne einen Zusammenhang zur gestellten Aufgabe.',s.slug,'analysis',q.id).checks[1].passed,false);}
const angel='Raphael besingt die Sonne, Gabriel die Erde und Michael die Stürme. Die drei Erzengel vermitteln Ehrfurcht vor der harmonischen Schöpfung. Ihr Lob zeigt Ordnung, weil auch die gewaltigen Naturkräfte Teil des Ganzen sind.';
const r=e(scenes[2].questions[0].text,angel,'prolog-im-himmel','analysis',5);assert(r.checks[1].passed);assert(r.hint.includes('Erzengel'));
assert(e('','Die schöpferische Schöpfung erscheint in geordneter Harmonie. Raphael, Gabriel und Michael loben die Welt.','prolog-im-himmel','analysis',5).checks[1].passed);
assert(!e('','An der Universität lernen viele Menschen.','','analysis',5).checks[2].passed,'Universität darf nicht als Versbeleg gelten');
assert(e('','Im Vers spricht Gabriel über die Erde.','','analysis',5).checks[2].passed);
assert(e('','Raphael lobt die harmonische Schöpfung.','','analysis',5).ready,'Treffende kurze Antwort nicht an 45-Wörter-Grenze sperren');
assert(!e('','Gott und Mephisto wetten auf Fausts Streben.','','analysis',5).checks[1].passed,'Wetten-Stichwörter beantworten nicht Erzengelfrage');
assert(e('','Meiner Erfahrung nach hilft mir eine klare Planung, weil ich dadurch selbständig arbeiten kann. Ich habe im Journal ein Beispiel beschrieben und reflektiere meine Entscheidung für ein Studium. Das begründet meine persönliche Wahl genauer als eine spontane Vermutung.','','reflection').checks.length===4);
console.log('Feedback-Regressionsprüfung erfolgreich: 84 Aufgabenprofile, Erzengelantwort, Umlaute, Wortgrenzen, kurze Antworten und Reflexionsmodus.');
