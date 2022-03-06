import logo from './logo.svg';
import './App.css';

import Filters from './Component/Filters'
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import React, { Component } from 'react'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      veg: [],
      nonveg: []
    }
    //this.getdata()
  }

  componentDidMount() {

    fetch('/api')
      .then(res => res.json())
      .then(res => {
        res.map(val => {
          console.log(res)
          this.setState({
            data: res.map(res=>{ return {"Qnt":0,"total":0,
              "id": res["id"], "name": res["name"], "img_url": res["img_url"], "price": res["price"], "size": { "Regular": true, "Medium": false, "Large": false }, "toppings": { 'Red Pepper': true, 'Onion': false, 'Grilled Mushroom': false, 'Extra Cheese': false, 'Black Olive': false }, "description": res["description"], "veg": res["isVeg"], "rating": res["rating"],
            }})
          })
          console.log(this.state.data, "shrianthshfsdhijpf")
        })
      });
  }
  //
  // 
  render() {
    console.log(this.state.data, this.state.veg, this.state.nonveg, "you")
    return (
      <div className="App">
        <Navbar />
        <Filters data={this.state.data} veg={this.state.veg} nonveg={this.state.nonveg} />
        <Footer />
      </div>
    )
  }
}

