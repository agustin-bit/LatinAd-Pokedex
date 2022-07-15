import { Component, OnInit } from '@angular/core';
import { GenericList } from '../models/generic-list.model';
import { PokemonList } from '../models/pokemon-list.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {

  constructor(private service: PokemonService) { }

  // Tamaño de página constante, como lo pide el desafío
  public PAGE_SIZE: number = 10;

  // Resultado de buscar la lista de pokemons en el servidor
  public pokemonList: PokemonList[] = null;

  // Total de pokemons disponibles, para manejo de paginación
  public totalPokemons: number = 0;

  // Número de página seleccionada
  public pageNumber: number = 1;

  // Indicador de carga, maneja el spinner
  public isLoading = false;

  // Nombre del pokemon buscado
  public pokemonName: string = "";

  // Detalle del pókemon abierto
  public detailPokemon: any = null;

  // Indica si el modal de detalle se encuentra abierto
  public isDetailopen: boolean = false;

  // Indica si la búsqueda por nombre devolvió resultados
  public noResult: boolean = false;

  // Evento de inicio
  ngOnInit(): void {
    this.listPokemons();
  }

  // Callback cuando cambia la página seleccionada
  pageNumberChange(page: number) {
    this.pageNumber = page;
    this.listPokemons();
  }

  // Evento de listado a la API
  private listPokemons(): void {
    this.isLoading = true;
    this.service.listPokemons(this.PAGE_SIZE, (this.pageNumber - 1) * this.PAGE_SIZE).subscribe(
      (r: GenericList<PokemonList>) => {
        this.pokemonList = this.getFrontImage(r.results);
        this.totalPokemons = r.count;
        this.isLoading = false;
      },
      (e: any) => {
        // TODO: mejorar el manejo de error según el proyecto
        this.isLoading = false;
      }
    );
  }

  /* Este es un método creado para poder obtener la url de la imagen del pokemon,
  ** es un pequeño "truco", no es una buena práctica pero me sirve para
  ** romper un límite impuesto por la API
  */
  private getFrontImage(result: PokemonList[]) : PokemonList[] {

    result.forEach(pokemon => {
      let id = pokemon.url.slice(0, -1).split('/').pop();
      pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });
    return result;
  }


  // Evento de búsqueda por nombre a la API
  public searchPokemon(): void {
    if (this.pokemonName == "" || this.pokemonName == null) {
      this.resetSearch();
      return;
    }
    this.isLoading = true;
    this.service.searchByName(this.pokemonName.toLowerCase()).subscribe(
      (r: any) => {        
        this.noResult = false;
        this.detailPokemon = r;
        this.isLoading = false;
        this.isDetailopen = true;
        this.pokemonName = null;
        this.resetSearch();
      },
      (e: any) => {
        // TODO: mejorar el manejo de error según el proyecto
        this.isLoading = false;
        this.totalPokemons = 0;
        this.pokemonList = [];
        this.noResult = true;
      }
    );
  }

  // Evento que busca los detalles del pókemon en el servidor
  public getDetails(url: string): void {
    this.isDetailopen = true;
    this.service.getDetails(url).subscribe(
      (r: any) => {
        this.detailPokemon = r;
        this.isDetailopen = true;
      },
      (e: any) => {
        // TODO: mejorar el manejo de error según el proyecto
      }
    );
  }

  private resetSearch(): void {
    this.pokemonList = [];
    this.pageNumber = 1;
    this.pokemonName = null;
    this.noResult = false;
    this.listPokemons();
  }

}
