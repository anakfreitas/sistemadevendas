import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../servico/produto';
import { ProdutoService } from '../servico/produto.service';


@Component({
  selector: 'app-produto-manter',
  templateUrl: './produto-manter.component.html',
  styleUrls: ['./produto-manter.component.css']
})
export class ProdutoManterComponent implements OnInit {

  operacao: string = 'Incluir';  
  produto: Produto = new Produto();
  nomeProduto: string = '';  

  constructor(
    private routeActivated: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.nomeProduto = this.routeActivated.snapshot.params.id;
    if(this.nomeProduto != null){
      this.operacao = 'Alterar';
      this.produtoService.pesquisar(this.nomeProduto).subscribe(
        data => {
          this.produto = (<Produto[]>data)[0];
        }
      );
    }
  }

  incluir(){
    this.produtoService.incluir(this.produto).subscribe(
      retorno => {        
        alert(retorno['mensagem']);
        this.voltar();
      }
    );    
  }

  alterar(){
    this.produtoService.alterar(this.produto).subscribe(
      data => {
        alert(data['mensagem']);
        this.router.navigate(['/produto']);        
      }
    );
  }
  
  voltar(){
    this.router.navigate(['/produto']);
  }

}
