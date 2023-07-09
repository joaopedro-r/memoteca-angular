import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    // this.service
    //   .listar(this.paginaAtual, this.filtro, this.favoritos)
    //   .subscribe((pensamentos) => {
    //     this.listaPensamentos = pensamentos;
    //     if (pensamentos.length < 6) {
    //       this.haMaisPensamentos = false;
    //     }
    //   });
    this.recarregarComponente();
  }

  recarregarComponente(): void {
    // this.favoritos = false;
    // this.paginaAtual = 1;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([this.router.url]);
    this.titulo = 'Meu Mural';
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.filtro = '';
    this.favoritos = false;
    this.service
    .listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
      if (pensamentos.length < 6) {
        this.haMaisPensamentos = false;
      }
    });
  }

  carregarMaisPensamentos(): void {
    this.paginaAtual++;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        if (pensamentos.length) {
          this.listaPensamentos.push(...pensamentos);
          if (pensamentos.length < 6) {
            this.haMaisPensamentos = false;
          }
        } else {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos(): void {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
        if (pensamentos.length < 6) {
          this.haMaisPensamentos = false;
        }
      });
  }

  listarFavoritos(): void {
    this.titulo = 'Meus Favoritos';
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.favoritos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
        if (pensamentos.length < 6) {
          this.haMaisPensamentos = false;
        }
      });
  }
}
