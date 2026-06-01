import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FRENCH_ALPHABET, PHONEME_GROUPS, PhonemeInfo } from '../../core/models/phoneme.model';
import { TtsService } from '../../core/services/tts.service';

@Component({
  selector: 'cm-phoneme-keyboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './phoneme-keyboard.component.html',
  styleUrl: './phoneme-keyboard.component.scss',
})
export class PhonemeKeyboardComponent {
  readonly selected = output<PhonemeInfo>();

  protected readonly groups = PHONEME_GROUPS;
  private readonly alphabet = FRENCH_ALPHABET;
  private readonly tts = inject(TtsService);

  getGroup(category: string): PhonemeInfo[] {
    return this.alphabet.filter((p) => p.category === category);
  }

  onKey(p: PhonemeInfo): void {
    this.selected.emit(p);
    void this.tts.playSingle(p.sound);
  }
}
