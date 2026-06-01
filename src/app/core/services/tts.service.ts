import { Injectable, computed, inject, signal } from '@angular/core';
import { WebSpeechService } from './web-speech.service';
import { GoogleTtsService } from './google-tts.service';

export type PlayMode = 'word' | 'slow';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private readonly webSpeech = inject(WebSpeechService);
  private readonly googleTts = inject(GoogleTtsService);

  readonly isPlaying = signal(false);
  readonly activeIndex = signal(-1); // index du phonème en cours (mode lent)
  readonly lastError = signal<string | null>(null);

  readonly webSpeechAvailable = computed(() => this.webSpeech.isAvailable);
  readonly googleApiKey = this.googleTts.apiKey;
  readonly googleConfigured = this.googleTts.isConfigured;

  async play(phonemes: string[], mode: PlayMode = 'word'): Promise<void> {
    if (phonemes.length === 0 || this.isPlaying()) return;

    this.isPlaying.set(true);
    this.lastError.set(null);

    try {
      if (this.googleTts.isConfigured()) {
        await this.playWithGoogle(phonemes, mode);
      } else if (mode === 'slow') {
        await this.webSpeech.playSlowly(phonemes, 550, {}, (i) => this.activeIndex.set(i));
      } else {
        await this.webSpeech.playPhonemes(phonemes);
      }
    } catch (err) {
      this.lastError.set(err instanceof Error ? err.message : String(err));
    } finally {
      this.isPlaying.set(false);
      this.activeIndex.set(-1);
    }
  }

  async playSingle(phoneme: string): Promise<void> {
    this.lastError.set(null);
    try {
      if (this.googleTts.isConfigured()) {
        await this.googleTts.playSsml(this.webSpeech.buildSsml(phoneme));
      } else {
        await this.webSpeech.playSingle(phoneme);
      }
    } catch (err) {
      this.lastError.set(err instanceof Error ? err.message : String(err));
    }
  }

  stop(): void {
    this.webSpeech.stop();
    this.googleTts.stop();
    this.isPlaying.set(false);
    this.activeIndex.set(-1);
  }

  setGoogleApiKey(key: string): void {
    this.googleTts.setApiKey(key);
  }

  clearGoogleApiKey(): void {
    this.googleTts.clearApiKey();
  }

  getSsmlPreview(ipa: string): string {
    return this.webSpeech.buildSsml(ipa);
  }

  private async playWithGoogle(phonemes: string[], mode: PlayMode): Promise<void> {
    const ssml = this.webSpeech.buildSsml(phonemes.join(''));
    if (mode === 'slow') {
      for (let i = 0; i < phonemes.length; i += 1) {
        this.activeIndex.set(i);
        await this.googleTts.playSsml(this.webSpeech.buildSsml(phonemes[i]));
        await this.delay(350);
      }
      return;
    }
    await this.googleTts.playSsml(ssml);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
