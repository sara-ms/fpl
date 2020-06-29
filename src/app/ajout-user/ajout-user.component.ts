import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.css']
})
export class AjoutUserComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  getData() {
    return this.http.get('http://localhost:9000/user/all');
  }
}
