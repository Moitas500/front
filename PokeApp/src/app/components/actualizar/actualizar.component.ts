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
  tipos = [];
  public newForm = new FormGroup({
    id: new FormControl(1.0, Validators.required && Validators.min(1)),
    nombre: new FormControl('', Validators.required),
    peso: new FormControl(0.0, Validators.required && Validators.min(0)),
    altura: new FormControl(0.0, Validators.required && Validators.min(0)),
    imagen: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
  });

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService, private router: Router) {
    this.pokemonService.getPokemonTipos().subscribe(
      res => {
        this.tipos = res;
      },
      err => {
        console.log(err);
      }
    )

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  updatePokemon() {
    const pokemon = {
      id: this.newForm.value.id,
      nombre: this.newForm.value.nombre,
      altura: this.newForm.value.altura,
      peso: this.newForm.value.peso,
      urlImg: this.newForm.value.imagen,
      tipo: [{ id: this.newForm.value.tipo }]
    }

    this.pokemonService.updatePokemon(pokemon).subscribe(
      res => {
        alert("Pokemon Nº" + pokemon.id + " se actualizo correctamente");
        this.router.navigateByUrl('/home');
      },
      err => {
        alert("Ocurrio un error:" + err)
      }
    )
  }

  getPokemon(id) {
    this.pokemonService.getPokemonId(id).subscribe(
      res => {
        this.newForm.get("id").setValue(res.id);
        this.newForm.get("nombre").setValue(res.nombre);
        this.newForm.get("peso").setValue(res.peso);
        this.newForm.get("altura").setValue(res.altura);
        this.newForm.get("imagen").setValue(res.urlImg);
        this.newForm.get("tipo").setValue(res.tipo[0].id);
        this.pokemon = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
