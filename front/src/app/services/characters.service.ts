import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpClient: HttpClient) {}

    //almacenamos las propiedades de cada cada uno de los personajes. A parte, podremos hacer la comprobación de si existe o no
    public characterData = {
      photo: "",
      name: "",
      origin: "",
      power: 0,
      id: ""
    }

    //función para setear a vacio el personaje de nuevo
    public clearCharacter() {
      this.characterData = {
        photo: "",
        name: "",
        origin: "",
        power: 0,
        id: ""
      }
    }

    //setear con X dato el characterData
    public editItem(item: any) {
      this.characterData = item
    }

    //función para traer los personajes
    public getCharacters() {
      return this.httpClient.get("http://localhost:3000/characters");
    }

    //función para postear un nuevo personaje
    public postCharacter(newCharacter: any) {
      return this.httpClient.post("http://localhost:3000/characters", newCharacter);
    }

    //función para borrar un personaje existente
    public deleteCharacter(characterID: any) {
      return this.httpClient.delete("http://localhost:3000/characters" + characterID);
    }

    //función para editar un personaje existente
    public editCharacter(characterID: any, editedCharacter: any)  {
      return this.httpClient.put("http://localhost:3000/characters" + characterID, editedCharacter);
    }


}
