import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import { Gif } from '../interfaces/giphy.interface';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {
search: '';
gifs: Array<Gif> = [];
time: number = 0;
  constructor(private giphyService: GiphyService) { }

  searchGifs(search: string): void{
    this.giphyService.searchGifs(search).subscribe((gifs: Gif[]) => this.gifs = gifs);
    
  }

  ngOnInit(): void {
    const searchBox = document.getElementById("search");

    const input$ = fromEvent(searchBox, 'input').pipe(
      debounceTime(400),
      map(e => e.target['value']),
      filter(query => query.length >= 3),
      distinctUntilChanged()
    )

    input$.subscribe(search => this.searchGifs(search))
    const interval$ = interval(1000).pipe(
      map(time => time + 1)
    );
      interval$.subscribe(v => this.time = v);
  }

}
