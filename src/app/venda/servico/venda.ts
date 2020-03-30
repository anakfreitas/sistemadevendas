import { Cliente } from 'src/app/cliente/servico/cliente';
import { VendaProduto } from './vendaproduto';

export class Venda  {
    codigo: string;
    cliente: Cliente;     
    listaVendaProduto: VendaProduto[] = [];    
}