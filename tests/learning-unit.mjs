import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const markers=[
  "APP_VERSION='7.0.0'",
  'FLUENTIA_7_SPEAK_FIRST',
  'function speechSupported',
  'function gradeLessonOral',
  'lessonVoiceScore',
  'lessonTransferScore',
  "type:'transfer'",
  'function renderArcade',
  'function startArcade',
  'conversationHistory',
  'function saveChatWord',
  'data-save-word',
  'showTranscript',
  'interimResults=true',
  'wordFeedbackHtml',
  "route:'arcade'"
];
for(const marker of markers) assert.ok(html.includes(marker),'Missing FluentIA 7 learning marker: '+marker);

assert.ok(!html.includes('Atividade oral ignorada porque o microfone não foi usado'),'Old oral-skip behavior is still present');
assert.ok(html.includes("voiceOk=!mic||((state.lessonVoiceUsed||false)&&(state.lessonVoiceScore||0)>=75&&(state.lessonTransferScore||0)>=70)"),'Speak First lesson gate missing');
assert.ok(html.includes("passed=scored>=7&&accuracy>=75&&voiceOk"),'Lesson mastery gate missing');
assert.ok(html.includes("state.conversationHistory.push({role:'user'"),'User transcript persistence missing');
assert.ok(html.includes("state.conversationHistory.push({role:'ai'"),'Lia transcript persistence missing');
assert.ok(html.includes("state.srs[id]={reps:0"),'Saved chat vocabulary is not entering SRS');

console.log('FluentIA 7.0 Speak First learning tests passed.');

assert.ok(html.includes("$$('[data-builder-token]').forEach"),'Sentence Builder must disable token list safely');
