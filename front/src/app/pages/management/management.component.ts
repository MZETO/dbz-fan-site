import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharactersService } from 'src/app/services/characters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  //si characterForm está vacío, entonces: FormGroup
  public characterForm!: FormGroup;

  //almacenamos en newCharacter los datos de characterData (hacemos un "reflejo")
  public newCharacter = this.characterService.characterData;

  //almacenamos en characterID la propiedad id de characterData
  public characterID = this.characterService.characterData.id;

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharactersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterService.clearCharacter();

    this.characterForm = this.formBuilder.group({
      photo: [this.newCharacter.photo, [Validators.required]],
      name: [this.newCharacter.name, [Validators.minLength(2)]],
      origin: [this.newCharacter.origin, [Validators.required]],
      power: [this.newCharacter.power, [Validators.required]],
    });

    this.characterForm.valueChanges.subscribe((changes) => {
      this.newCharacter = changes;
    });
  }

  public onSubmit() {
    if (this.characterID !== '') {

      this.characterService
        .editCharacter(this.characterID, this.newCharacter)
        .subscribe();

      Swal.fire('Personaje editado!!');

    } else {

      this.characterService.postCharacter(this.newCharacter).subscribe();

      Swal.fire('Personaje creado!!');

    }

    this.characterForm.reset();

    this.router.navigate(['/personajes']);
  }

  public delete() {
    Swal.fire({
      title: 'ESPERA!!!',
      text: 'Vas a eliminar el personaje para siempre...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ACÁBALO!!!',
      cancelButtonText: 'Mejor no...',
    }).then((result) => {
      if (result.isConfirmed) {
        this.characterService.deleteCharacter(this.characterID).subscribe();
        this.characterForm.reset();
        Swal.fire('BORRADO!!', 'Tu personaje ha sido ELIMINADO', 'success');
        this.router.navigate(['/personajes']);
      }
    });
  }
}
