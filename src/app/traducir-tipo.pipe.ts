import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirTipo'
})
export class TraducirTipoPipe implements PipeTransform {  

  transform(value: string): string {
    const tiposPokemon: { [key: string]: string } = {
      normal: 'Normal',
      fire: 'Fuego',
      water: 'Agua',
      grass: 'Planta',
      electric: 'Eléctrico',
      ice: 'Hielo',
      fighting: 'Lucha',
      poison: 'Veneno',
      ground: 'Tierra',
      flying: 'Volador',
      psychic: 'Psíquico',
      bug: 'Bicho',
      rock: 'Roca',
      ghost: 'Fantasma',
      dark: 'Siniestro',
      dragon: 'Dragón',
      steel: 'Acero',
      fairy: 'Hada'
    };

    // Devuelve la traducción si existe, o el valor original si no se encuentra
    return tiposPokemon[value] || value;
  }

}
