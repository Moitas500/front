import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  constructor(private router: Router, private pokemonService: PokemonService) {

  }
  tipos = [];

  public id = new FormControl(1.0, Validators.required && Validators.min(1));
  public nombre = new FormControl('', Validators.required);
  public peso = new FormControl(0.0, Validators.required && Validators.min(0));
  public altura = new FormControl(0.0, Validators.required && Validators.min(0));
  public imagen = new FormControl('', Validators.required);
  public tipo = new FormControl('', Validators.required);

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

  public onSubmit() {
    const pokemon = {
      id: this.newForm.value.id,
      nombre: this.newForm.value.nombre,
      altura: this.newForm.value.altura,
      peso: this.newForm.value.peso,
      urlImg: this.newForm.value.imagen,
      tipo: [{ id: this.newForm.value.tipo }]
    }
    this.pokemonService.creadPokemon(pokemon).subscribe(
      res => {
        alert("Pokemon Nº" + pokemon.id + " fue registrado correctamente");
        this.router.navigateByUrl('/home')
      },
      err => {
        alert("Ocurrio un error:" + err)
      }
    )
  }
}
