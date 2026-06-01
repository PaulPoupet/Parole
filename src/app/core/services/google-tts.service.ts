import { Injectable, computed, signal } from '@angular/core';

export interface GoogleTtsVoice {
  languageCode: string;
  name: string;
  ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
}

@Injectable({ providedIn: 'root' })
export class GoogleTtsService {
  readonly apiKey = signal(localStorage.getItem('googleTtsApiKey') ?? '');
  readonly isConfigured = computed(() => this.apiKey().trim().length > 0);

  private currentAudio?: HTMLAudioElement;
  private currentAudioUrl?: string;

  setApiKey(key: string): void {
    const normalized = key.trim();
    this.apiKey.set(normalized);
    if (normalized) {
      localStorage.setItem('googleTtsApiKey', normalized);
    } else {
      localStorage.removeItem('googleTtsApiKey');
    }
  }

  clearApiKey(): void {
    this.setApiKey('');
  }

  async playSsml(
    ssml: string,
    voice: GoogleTtsVoice = { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-B' },
  ): Promise<void> {
    const audioData = await this.synthesizeSsml(ssml, voice);
    await this.playAudioData(audioData);
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.cleanupAudio();
    }
  }

  private async synthesizeSsml(ssml: string, voice: GoogleTtsVoice): Promise<ArrayBuffer> {
    if (!this.isConfigured()) {
      throw new Error('Clé API Google TTS manquante.');
    }

    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(
      this.apiKey(),
    )}`;

    const payload = {
      input: { ssml },
      voice,
      audioConfig: {
        audioEncoding: 'MP3',
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    if (!response.ok) {
      const message = json.error?.message ?? response.statusText;
      throw new Error(`Google TTS: ${message}`);
    }

    if (!json.audioContent) {
      throw new Error('Réponse Google TTS invalide.');
    }

    return this.decodeBase64(json.audioContent);
  }

  private async playAudioData(data: ArrayBuffer): Promise<void> {
    const blob = new Blob([data], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    this.cleanupAudio();
    this.currentAudio = audio;
    this.currentAudioUrl = url;

    await audio.play();

    return new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        this.cleanupAudio();
      };

      audio.onended = () => {
        cleanup();
        resolve();
      };

      audio.onerror = () => {
        cleanup();
        reject(new Error('Lecture de l’audio Google TTS impossible.'));
      };

      audio.onpause = () => {
        if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
          cleanup();
          resolve();
        }
      };
    });
  }

  private cleanupAudio(): void {
    if (this.currentAudioUrl) {
      URL.revokeObjectURL(this.currentAudioUrl);
      this.currentAudioUrl = undefined;
    }
    this.currentAudio = undefined;
  }

  private decodeBase64(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
  }
}
