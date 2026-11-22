// Web Audio API Synthesizer for UEFA Champions League Broadcast Sound Effects
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Crisp UI Click
export function playClick() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

// Referee Whistle Sound Effect
export function playWhistle() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'triangle';
  osc2.type = 'sine';

  osc1.frequency.setValueAtTime(2800, now);
  osc2.frequency.setValueAtTime(3200, now);

  // Rapid vibrato
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(25, now);
  lfoGain.gain.setValueAtTime(100, now);
  lfo.connect(osc1.frequency);
  lfo.connect(osc2.frequency);
  lfo.start(now);
  lfo.stop(now + 0.5);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
  gain.gain.setValueAtTime(0.25, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.5);
  osc2.stop(now + 0.5);
}

// Goal Alert Chime (Harmonic broadcast chime)
export function playGoalChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.09;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.65);
  });
}

// Champions League Fanfare Chime (Majestic brass-like chord)
export function playUclFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Majestic chord progression (F major -> Bb major -> C major -> F majesty)
  const chord = [349.23, 440.00, 523.25, 698.46, 880.00]; // F4, A4, C5, F5, A5
  
  chord.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    subOsc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    subOsc.frequency.setValueAtTime(freq / 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200 + i * 200, now);
    filter.frequency.exponentialRampToValueAtTime(3500, now + 1.2);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.setValueAtTime(0.12, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 2.5);
    subOsc.stop(now + 2.5);
  });
}
