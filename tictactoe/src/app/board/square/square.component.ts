import {
  Component, Input, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null;
  public readonly onClicked: OutputEmitterRef<void> = output();

  protected handleClicked(): void {
    if (!this.value) {
      this.onClicked.emit();
    }
  }
}

enum Player {
  X = 'X',
  O = 'O'
}
