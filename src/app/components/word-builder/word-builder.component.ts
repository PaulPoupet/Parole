import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { PhonemeInfo } from '../../core/models/phoneme.model';
import { TtsService } from '../../core/services/tts.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cm-word-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './word-builder.component.html',
  styleUrl: './word-builder.component.scss',
})
export class WordBuilderComponent {
  protected readonly tts = inject(TtsService);

  readonly phonemes = signal<PhonemeInfo[]>([]);
  readonly ipa = computed(() =>
    this.phonemes()
      .map((p) => p.symbol)
      .join(''),
  );

  updateApiKey(value: string): void {
    this.tts.setGoogleApiKey(value);
  }

  addPhoneme(p: PhonemeInfo): void {
    this.phonemes.update((list) => [...list, p]);
  }

  remove(index: number): void {
    this.phonemes.update((list) => list.filter((_, i) => i !== index));
  }

  clear(): void {
    this.phonemes.set([]);
    this.tts.stop();
  }

  play(mode: 'word' | 'slow'): void {
    if (this.tts.isPlaying()) {
      this.tts.stop();
      return;
    }
    void this.tts.play(
      this.phonemes().map((p) => p.symbol),
      mode,
    );
  }
}
