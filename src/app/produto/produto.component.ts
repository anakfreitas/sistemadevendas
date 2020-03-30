import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from './servico/produto';
import { ProdutoService } from './servico/produto.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  listaProduto: Produto[] = [];
  selecionado: Produto;

  constructor(

    private router: Router,
    private produtoServico: ProdutoService

  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(){
    this.produtoServico.pesquisar(this.produto.nome).subscribe(
      (retorno: Produto[]) => {
        this.listaProduto = retorno; 
      }
    );
  }

  selecionar(valor){
    this.selecionado = valor;    
  }

  incluir(){
    this.router.navigate(['/produto/incluir']);
  } 

  remover(){
    this.produtoServico.remover(this.selecionado).subscribe(
      data => {
        alert(data['mensagem']);
      }
    );    
  }

  alterar(){    
    this.router.navigate(['/produto/alterar/'+this.selecionado.nome]);
  }

}
