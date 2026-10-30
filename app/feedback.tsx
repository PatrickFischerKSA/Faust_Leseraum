'use client';
import { evaluateResponse } from './feedbackEngine';
import { modelAnswers } from './modelAnswers';
export { evaluateResponse } from './feedbackEngine';
type Mode = 'analysis' | 'reflection' | 'group';

export function TextFeedback({ prompt, answer, context, mode = 'analysis', questionId }: { prompt: string; answer: string; context?: string; mode?: Mode; questionId?: number }) {
  const result = evaluateResponse(prompt, answer, context, mode, questionId);
  const model = questionId === undefined ? undefined : modelAnswers[questionId];
  if (!answer.trim()) return <div className="liveFeedback empty"><strong>Rückmeldung zu deiner Antwort</strong><p>Schreibe deine Antwort. Du erhältst Hinweise zur konkreten Frage und zu erkennbaren Beleg- und Begründungssignalen. Die lokale Prüfung bewertet nicht, ob deine Deutung richtig ist.</p></div>;
  return <div className={`liveFeedback ${result.level}`} aria-live="polite">
    <div className="feedbackHead"><strong>Rückmeldung zu deiner Antwort</strong><span>{result.passed}/4 sprachliche Signale</span></div>
    {result.hint && <p className="questionFeedbackHint"><strong>Prüfe bei dieser Frage:</strong> {result.hint}</p>}
    <div className="feedbackChecks">{result.checks.map(check => <div className={check.passed?'passed':''} key={check.label}><span>{check.passed?'✓':'○'}</span><p><strong>{check.label}</strong>{check.feedback}</p></div>)}</div>
    {model && <details className="modelAnswer" key={questionId}>
      <summary>Musterlösung zu Frage {questionId} anzeigen</summary>
      <div className="modelAnswerBody"><p className="modelAnswerLabel">Mögliche Lösung · zum Vergleichen</p><p>{model.text}</p><h4>Vergleiche mit deiner Antwort</h4><p>{model.compare}</p><p className="modelAnswerNote">Andere Deutungen sind möglich, wenn sie den Wortlaut berücksichtigen und nachvollziehbar begründet werden. Ergänze deine eigenen Text- und Filmbelege; die Musterlösung bewertet deine Antwort nicht automatisch.</p><a href={model.source} target="_blank" rel="noopener noreferrer">Passende Textszene im Original lesen ↗</a></div>
    </details>}
    <p className="feedbackNote">Die Rückmeldung erkennt Wort- und Formulierungssignale, keine Wahrheit. Fehlende Signale bedeuten nicht, dass deine Antwort falsch ist. Vergleiche deine Deutung mit Text und Film; du kannst sie unabhängig davon als bearbeitet markieren.</p>
  </div>;
}
