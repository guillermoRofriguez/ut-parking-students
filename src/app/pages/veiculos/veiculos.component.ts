import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from 'src/app/services/vehiculo/vehiculos.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  public dataSource!: MatTableDataSource<any>
  public id!: string
  public displayedColumns:string[] = ['option', 'marca', 'modelo', 'placa'];
  constructor(private route: ActivatedRoute, private vehiculosService: VehiculosService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('uid') ?? ''
    console.log(this.id);
    await this.getVeichulos(this.id)
  }



  async getVeichulos(uid:string){
    let response = await this.vehiculosService.getVehiculoUser(uid)
    this.dataSource = new MatTableDataSource(response?.data)
    console.log(response?.data);
  }

  applyFilter(event: Event){
    try {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage()
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

}
