import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido : PedidoDTO;
  cliente : ClienteDTO;
  endereco : EnderecoDTO;
  cartItems : CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {
      this.pedido = navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response["enderecos"]);
      },
      error => {
        this.navCtrl.setRoot("HomePage");
      }
    );
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }
}
