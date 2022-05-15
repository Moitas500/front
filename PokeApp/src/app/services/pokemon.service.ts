import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = environment.baseUrl;
  base: string = environment.POKEDEX;

  constructor(private http: HttpClient) { }

  //Obtiene pokemon
  getPokemons(index){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
  //Obtiene todos los tipos de pokemons
  getPokemonTipos() {
    return this.http.get<any>(`${this.base}/tipo`);
  }

  //Obtiene todos los pokemons
  getPokemon() {
    return this.http.get<any>(`${this.base}/readPokemons`);
  }

  //Obtiene los pokemons por nombre
  getPokemonNombre(Nombre) {
    return this.http.get<any>(`${this.base}/readPokemonByName?name=` + Nombre);
  }

  //Obtiene el pokemon por id
  getPokemonId(Id) {
    return this.http.get<any>(`${this.base}/readPokemon?id=` + Id);
  }

  //Crear pokemon
  creadPokemon(Pokemon) {
    return this.http.post<any>(`${this.base}/createPokemon`, Pokemon);
  }

  //Actualizar pokemon
  updatePokemon(Pokemon) {
    return this.http.put<any>(`${this.base}/updatePokemon`, Pokemon);
  }

  //Eliminar pokemon
  deletePokemon(Pokemon) {
    return this.http.request('delete', `${this.base}/deletePokemon`, { body: Pokemon });
  }
}
