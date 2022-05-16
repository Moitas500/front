import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService, private router: Router) {

    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  actualizar(id){
    this.router.navigateByUrl(`/actualizar/${id}`)
  }

  eliminar() {
    this.pokemonService.deletePokemon(this.pokemon).subscribe(
      res => {
        alert("Pokemon Nº" + this.pokemon.id + " fue eliminado");
        this.router.navigateByUrl('/home')
      },
      err => {
        alert("Ocurrio un error:" + err)
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
