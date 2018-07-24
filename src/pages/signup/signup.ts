import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService : CidadeService,
    public estadoService : EstadoService) {

      this.formGroup = this.formBuilder.group({
        nome: ['Alan', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['alanbravin@bol.com.br', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['62479997987', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123456', [Validators.required]],
        logradouro: ['Rua Via', [Validators.required]],
        numero: ['112', [Validators.required]],
        complemento: ['Apto', []],
        bairro: ['Jd Tal', []],
        cep: ['87055650', [Validators.required]],
        telefone1: ['9999-8888', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {}
    );

  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;

    this.cidadeService.findAll(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {}
    );
  }

  signupUser() {
    console.log('Passou pelo SignupPage');
  }

}
