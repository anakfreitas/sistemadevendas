import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from './servico/cliente';
import { ClienteService } from './servico/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  listaCliente: Cliente[] = [];
  selecionado: Cliente;  

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {

    this.clienteService.consultar(this.cliente.nome).subscribe(
      data => {
        this.listaCliente = <Cliente[]>data;        
      }   
    );

  }

  pesquisar(){
    this.clienteService.consultar(this.cliente.nome).subscribe(
      data => {
        this.listaCliente = <Cliente[]>data;
        
      }
    );   
  }
  
  selecionar(valor){
    this.selecionado = valor;    
  }

  alterar(){    
    this.router.navigate(['/cliente/alterar/'+this.selecionado.nome]);
  }


  incluir(){    
    this.router.navigate(['/cliente/incluir']);
  }
 
  remover(){
    this.clienteService.remover(this.selecionado).subscribe(
      data => {
        alert(data['mensagem']);
      }
    );
  }

}
