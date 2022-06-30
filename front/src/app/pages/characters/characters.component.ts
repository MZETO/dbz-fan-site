import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  //definimos un array vacio que va a contener la lista de personajes
  public characterList: Character[] = [];

  constructor(private characterService: CharactersService, private router: Router) { }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((data: any) => {
      this.characterList = data
    })
  }

  public catchCharacter(character: any) {
    this.characterService.editItem(character);
    this.router.navigate(["/gestion"])
  }


}
