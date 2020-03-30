import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../servico/cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-cliente-manter',
  templateUrl: './cliente-manter.component.html',
  styleUrls: ['./cliente-manter.component.css']
})
export class ClienteManterComponent implements OnInit {

  nomeCliente: string = '';
  cliente: Cliente = new Cliente();
  operacao: string = 'Incluir';

  constructor(    
    private router: Router,   
    private routeActivated: ActivatedRoute, 
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {

    this.nomeCliente = this.routeActivated.snapshot.params.id;
    
    if(this.nomeCliente != null){
      this.operacao = 'Alterar';
      this.clienteService.consultar(this.nomeCliente).subscribe(
        data => {
          this.cliente = (<Cliente[]>data)[0];
        }
      );
    }

  }

  incluir(){
    this.clienteService.incluir(this.cliente).subscribe(
      data => {
        alert(data['mensagem']);
        this.router.navigate(['/cliente']);        
      }
    );
  }

  alterar(){
    this.clienteService.alterar(this.cliente).subscribe(
      data => {
        alert(data['mensagem']);
        this.router.navigate(['/cliente']);        
      }
    );
  }

  voltar(){
    this.router.navigate(['/cliente']);
  }

}
