import { PensamentoService } from './../pensamento.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  @Input() listaPensamentos: Pensamento[] = [];
  constructor(private service: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  mudarIconeFavorito(): string {
    if (this.pensamento.favorito) {
      return 'ativo';
    }
    return 'inativo';
  }

  atualizarFavoritos(): void {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      if (!this.pensamento.favorito) {
        this.listaPensamentos.splice(
          this.listaPensamentos.indexOf(this.pensamento),
          1
        );
      }
    });
  }
}
