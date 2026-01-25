import { Component } from '@angular/core';
import { TodoPage } from '../../pages/todo-page/todo-page';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone : true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
