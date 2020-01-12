import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "test.db"; // DB name
  readonly table_name:string = "test1"; // Table name

  constructor(
              public navCtrl : NavController,
              private sqlite : SQLite) {}

    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          alert('my test Database Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    createTable() {
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
        .then(() => {
          alert('Table Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    insertRow() {
      if (!this.name_model.length) {
        alert("Enter Name");
        return;
      }
      this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
        .then(() => {
          alert('Row Inserted!');
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    getRows() {
      this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
        .then((res) => {
          this.row_data = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              this.row_data.push(res.rows.item(i));
            }
          }
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    deleteRow(item) {
      this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
        .then((res) => {
          alert("Row Deleted!");
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
   
          
  }

  // ionViewDidLoad(){
  //   this.getData();
  // }

  // ionViewWillEnter(){
  //   this.getData();
  // }

  // getData(){
  //   this.sqlite.create({
  //     name : 'ionicdb.db',
  //     location : 'default'
  //   }).then((db:SQLiteObject) =>{
  //     db.executeSql('CREATE TABLE IF EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
  //     .then(res => {
  //       this.expenses = [];
  //       for(var i=0; i<res.row.length; i++){
  //         this.expenses.push({rowid:res.row.item(i).rowid, date:res.rows.item(i).date, type:res.rows.item(i).type, description:res.rows.item(i).description, amount:res.rows.item(i).amount})
  //       }
  //     })
  //     .catch(e => console.log(e));

  //     db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
  //     .then(res => {
  //       if(res.rows.length > 0 ){
  //         this.totalExpense = parseInt(res.rows.item(0).totalExpense);
  //         this.balance = this.totalIncome - this.totalExpense;
  //       }
  //     })
  //   }).catch( e => console.log(e));
  // }

  // addData(){
  //   this.navCtrl.navigateForward(AddDataPage);
  // }

  // editData(){
  //   this.navCtrl.navigateForward(EditDataPage, {rowid:rowid});
  // }

  // deleteData(rowid){
  //   this.sqlite.create({
  //     name:'ionicdb.db',
  //     location: 'default'
  //   }).then((db : SQLiteObject) => {
  //     db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
  //     .then(res => {
  //       console.log(res);
  //       this.getData();
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }

