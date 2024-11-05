import { Component, signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { SquareComponent } from './square/square.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgClass,
    SquareComponent,
    MatCard,
    MatCardContent,
    MatButtonToggle,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected board: WritableSignal<(Player | null)[]> = signal(Array(9).fill(null));
  protected curr: Player = Player.X;
  protected isWinner: boolean = false;
  protected isDraw: boolean = false;

  protected makeMove(index: number): void {
    if (!this.board()[index] && !this.isWinner && !this.isDraw) {
      this.board()[index] = this.curr;
      this.isWinner = this.checkWinner();
      if (!this.isWinner) {
        this.isDraw = this.board().every(square => square !== null);
        if (!this.isDraw) {
          this.curr = this.curr === Player.X ? Player.O : Player.X;
        }
      }
    }
  }

  private checkWinner(): boolean {
    const win = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return win.some(combination =>
      combination.every(index => this.board()[index] === this.curr)
    );
  }

  protected restart(): void {
    this.board.set(Array(9).fill(null));
    this.curr = Player.X;
    this.isWinner = false;
    this.isDraw = false;
  }
}

enum Player {
  X = 'X',
  O = 'O'
}
