import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  tipos = [];
  public id = new FormControl(1.0, Validators.required && Validators.min(1));
  public nombre = new FormControl('', Validators.required);
  public peso = new FormControl(0.0, Validators.required && Validators.min(0));
  public altura = new FormControl(0.0, Validators.required && Validators.min(0));
  public imagen = new FormControl('', Validators.required);
  public tipo = new FormControl('', Validators.required);

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService, private router: Router) {

      this.activatedRouter.params.subscribe(
        params => {
          this.getPokemon(params['id']);
        }
      )

     }

  public newForm = new FormGroup({
      id: this.id,
      nombre: this.nombre,
      peso: this.peso,
      altura: this.altura,
      imagen: this.imagen,
      tipo: this.tipo,
    });

  ngOnInit(): void {
    this.pokemonService.getPokemonTipos().subscribe(
      res => {
        this.tipos = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getPokemon(id) {
    this.pokemonService.getPokemonId(id).subscribe(
      res => {
        console.log(res)

        this.pokemon = res;
        this.pokemonImg = this.pokemon.urlImg;
        this.pokemonType = this.pokemon.tipo[0].nombre;
      },
      err => {
        console.log(err);
      }
    )
  }
}
