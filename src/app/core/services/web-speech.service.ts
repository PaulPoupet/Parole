import { Injectable } from '@angular/core';

export interface WebSpeechOptions {
  rate?: number; // 0.1 – 10  (défaut 1)
  pitch?: number; // 0 – 2     (défaut 1)
  volume?: number; // 0 – 1     (défaut 1)
  lang?: string; // 'fr-FR'
}

@Injectable({ providedIn: 'root' })
export class WebSpeechService {
  readonly isAvailable = 'speechSynthesis' in window;

  /** Voix françaises disponibles sur ce navigateur */
  getFrenchVoices(): SpeechSynthesisVoice[] {
    return speechSynthesis.getVoices().filter((v) => v.lang.startsWith('fr'));
  }

  /**
   * Joue une séquence de phonèmes IPA via l'API Web Speech.
   * Utilise la balise <phoneme> SSML pour Chrome/Edge.
   * Fallback texte brut si SSML non supporté.
   */
  async playPhonemes(phonemes: string[], opts: WebSpeechOptions = {}): Promise<void> {
    if (!this.isAvailable || phonemes.length === 0) return;

    const ipa = phonemes.join('');
    console.log('Playing IPA:', ipa);

    return new Promise((resolve, reject) => {
      const utt = new SpeechSynthesisUtterance();

      // Certains navigateurs acceptent le SSML directement
      utt.text = ipa;
      utt.lang = opts.lang ?? 'fr-FR';
      utt.rate = opts.rate ?? 0.9;
      utt.pitch = opts.pitch ?? 1;
      utt.volume = opts.volume ?? 1;

      // Sélectionner la meilleure voix française disponible
      const voices = this.getFrenchVoices();
      if (voices.length > 0) utt.voice = voices[0];

      utt.onend = () => resolve();
      utt.onerror = (e) => reject(e);

      speechSynthesis.cancel(); // annuler si déjà en cours
      speechSynthesis.speak(utt);
    });
  }

  /**
   * Joue les phonèmes un par un avec une pause (mode apprentissage).
   */
  async playSlowly(
    phonemes: string[],
    pauseMs = 500,
    opts: WebSpeechOptions = {},
    onPhoneme?: (index: number) => void,
  ): Promise<void> {
    for (let i = 0; i < phonemes.length; i++) {
      onPhoneme?.(i);
      await this.playPhonemes([phonemes[i]], { ...opts, rate: 0.7 });
      await this.delay(pauseMs);
    }
    onPhoneme?.(-1); // reset
  }

  /** Feedback immédiat lors du clic sur un bouton du clavier */
  async playSingle(phoneme: string, opts: WebSpeechOptions = {}): Promise<void> {
    return this.playPhonemes([phoneme], { ...opts, rate: 0.8 });
  }

  stop(): void {
    if (this.isAvailable) speechSynthesis.cancel();
  }

  buildSsml(ipa: string, lang = 'fr-FR'): string {
    return (
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">` +
      `<phoneme alphabet="ipa" ph="${ipa}">${ipa}</phoneme>` +
      `</speak>`
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
}
