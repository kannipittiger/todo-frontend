import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoPage } from '../pages/todo-page/todo-page';
import { Layout } from '../public/layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
