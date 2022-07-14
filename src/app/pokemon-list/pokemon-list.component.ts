import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {

  constructor(private service: PokemonService) { }

  public pokemonList : any[];

  public totalPokemons : number = 0;

  public pageNumber : number = 0;

  public PAGE_SIZE : number = 10;

  ngOnInit(): void {
    this.listPokemons(this.PAGE_SIZE, this.pageNumber);
  }

  private listPokemons(pageSize:number, pageNumber:number): void {
    this.service.listPokemons(pageSize,pageNumber).subscribe(
      (r: any) => {
        console.log(r);
        this.pokemonList = r.results;
        this.totalPokemons = r.count;
      },
      (e: any) => {
        console.log(e);        
      }
    );
  }

}
