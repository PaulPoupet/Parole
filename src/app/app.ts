import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { PhonemeKeyboardComponent } from './components/phoneme-keyboard/phoneme-keyboard.component';
import { WordBuilderComponent } from './components/word-builder/word-builder.component';

@Component({
  selector: 'cm-root',
  imports: [CommonModule, PhonemeKeyboardComponent, WordBuilderComponent, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly matIconReg = inject(MatIconRegistry);

  builder = viewChild(WordBuilderComponent);

  protected readonly showSettings = signal(false);

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
