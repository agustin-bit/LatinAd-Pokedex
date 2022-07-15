import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParsedDetailModel } from '../models/parsed-detail.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent {

  constructor() { }

  @Input() detail = null;

  @Input() status: boolean = false;

  @Output() closeModalEvent = new EventEmitter<boolean>();


  // Indica si se está cargando la información
  public isLoading = false;

  // Detalle del pokemon procesado para ser mostrado
  public parsedDetail: ParsedDetailModel = new ParsedDetailModel();

  // Evento de cierre del modal
  public closeModal(): void {
    this.closeModalEvent.emit(true);
  }

  // Procesamiento del json crudo que envía la api, permite extraer los datos para que se más fácil accederlos en el html
  private parseDetail() : void {

    this.isLoading = true;

    // Basic information
    this.parsedDetail.name = this.detail.name;
    this.parsedDetail.baseExperience = this.detail.base_experience;
    this.parsedDetail.height = this.detail.height;
    this.parsedDetail.species = this.detail.species.name;
    this.parsedDetail.weight = this.detail.weight/10;

    // Mapping arrays
    this.parsedDetail.abilities = this.detail.abilities.map(p => p.ability.name).join(", ");
    this.parsedDetail.heldItems = this.detail.held_items.map(p => p.item.name).join(", ");
    this.parsedDetail.moves = this.detail.moves.map(p => p.move.name).join(", ").substring(0,30) + "... +";
    this.parsedDetail.types = this.detail.types.map(p => p.type.name).join(", ");

    // Stats
    this.parsedDetail.hp = this.detail.stats.find(p => p.stat.name === "hp").base_stat;
    this.parsedDetail.speed = this.detail.stats.find(p => p.stat.name === "speed").base_stat;
    this.parsedDetail.attack = this.detail.stats.find(p => p.stat.name === "attack").base_stat;
    this.parsedDetail.defense = this.detail.stats.find(p => p.stat.name === "defense").base_stat;

    // Sprites
    this.parsedDetail.frontImage = this.detail.sprites.front_default;
    this.parsedDetail.backImage = this.detail.sprites.back_default;
    this.parsedDetail.frontShinyImage = this.detail.sprites.front_shiny;
    this.parsedDetail.backShinyImage = this.detail.sprites.back_shiny;
    this.parsedDetail.frontImageF = this.detail.sprites.front_female;
    this.parsedDetail.backImageF = this.detail.sprites.back_female;
    this.parsedDetail.frontShinyImageF = this.detail.sprites.front_shiny_female;
    this.parsedDetail.backShinyImageF = this.detail.sprites.back_shiny_female;
    
    this.isLoading = false;
  }

  // Cambia a la vista donde se ve la lista completa de movimientos (muchas líneas)
  public seeAllMoves() : void {
    this.parsedDetail.moves = this.detail.moves.map(p => p.move.name).join(", ");
  }

  // Reacción ante el cambio de inputs, solo si es válido
  ngOnChanges() {
    if (this.detail !== null) this.parseDetail();
  }

}
