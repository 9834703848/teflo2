import React, { useState, useEffect } from 'react'

import ReactDOM from "react-dom";
import { Component } from 'react';

export default class Filters extends Component {
    constructor(props) {
        super(props)

        this.state = {

            data: [],

            pre: "",
            pre_arrr: [],

            isveg: true,
            isnonveg: true,
            filteron: false,

            is_cart: false
        }

        console.log("jfskdfhj")
        console.log(this.state.data, "you")

    }

    componentDidMount() {

        setInterval(() => {
            //console.log(this.state.data)
            if (this.state.filteron == false) {
                this.setState({
                    data: this.props.data,

                })

            }

            if (this.state.pre != "") {

                this.menu(this.state.pre_arrr, this.state.pre)


            }
        }, 200);

    }
    
    filt = (event) => {
        console.log("filters")
        let new_data = this.state.data;
        new_data.sort((a, b) => {
            console.log(a, b)
            let x = a["price"]
            let y = b["price"]
            console.log(x, y)
            if (x > y) {
                if (this.state.sort_op == "by_low") {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                if (this.state.sort_op == "by_high") {
                    return -1;
                }
                else {
                    return;
                }
            }
        })
        this.setState({
            data: new_data,
            filteron: true
        })
        ReactDOM.render(<div></div>, document.getElementById("fil"))
    }
    clear = (event) => {
        this.setState({
            data: this.state.pizza_data
        })
        ReactDOM.render(<div></div>, document.getElementById("fil"))
    }
    filters = (event) => {
        // console.log("hello")
        ReactDOM.render(
            <div>
                <div className="flex border-6 border-white flex-col absolute ml-[1080px] mt-[-30px] w-[120px] h-[120px] bg-red-500 text-white">
                    <div className="form-check mt-[20px] ml-[10px]">
                        <input onClick={this.chnfilt} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" value="by_low" id="flexRadioDefault1" />
                        <label className=" ml-[-30px] form-check-label inline-block text-white-800" for="flexRadioDefault1">
                            high_low
                        </label>
                    </div>
                    <div className="form-check ml-[10px]">
                        <input onClick={this.chnfilt} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" value="by_high" id="flexRadioDefault1" />
                        <label className="ml-[-30px] form-check-label inline-block text-white-800 " for="flexRadioDefault1">
                            low_high

                        </label>
                    </div>

                    <div className="ml-[10px] mt-[10px] ">
                        <button className="mr-[10px] bg-white text-black w-[60px] mt-[0px]" onClick={this.filt}>SUBMIT</button>
                        
                    </div>
                </div >
            </div >,
            document.getElementById('fil')
        );
    }
    
    hadleqnt = (idt, event) => {
        console.log("oijfiodsj", idt, event.target.value)
        this.setState({
            data: this.state.data.map(val => val["id"] == idt ? val["QNT"] = event.target.value : val)
        })
    }
    

    getorder = (event) => {

        let x = 0;

       
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i]["Qnt"] > 0) {
                    x += parseInt(this.state.data[i]["total"])
                }
            }

       
        this.setState({
            total_bill: x,
            pre: "",
        })
        ReactDOM.render(<div></div >, document.getElementById(`${event.target.value}`))

    }
    change_total = (val) => {
        let new_data = val;
        console.log(new_data)
        new_data["total"] = new_data["price"] * new_data["Qnt"]
        return new_data
    }
   
    cancel = (event) => {
        this.setState({
            pre: "",
            data: this.state.data.map(val => val["id"] == event.target.value ? val["Qnt"] = 0 : val)
        })

        ReactDOM.render(<div></div >, document.getElementById(`${event.target.value}`))
    }
    menu = (val, idt) => {
        console.log(idt, "shfusj", val)
        ReactDOM.render(
            <div className="flex  absolute w-[450px] border-8 border-white h-[210px]  mt-[-40px] sm:w-[400px] ml-[-270px] bg-red-500 text-white">
                <div className="ml-[10px] text-[15px] mt-[20px] ">
                    <h1 className="text-[20px]">SIZE</h1>
                    <ul>
                        {Object.entries(val[0]["size"]).map(val1 => {

                            return <div class="form-check">
                                <input onClick={(event) => {
                                    this.setState({
                                        data: this.state.data.filter(val2 => val2["id"] == idt ? Object.entries(val2["size"]).map(x => { x[0] == val1[0] ? (val2["size"][val1[0]] = true) : val2["size"][x[0]] = false }) : val2)
                                    })
                                }} defaultChecked={val1[1]} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" value={val1[1]} id="flexRadioDefault1" />
                                <label class="form-check-label inline-block text-white-800" for="flexRadioDefault1">
                                    {val1[0]}
                                </label>
                            </div>
                        })
                        }

                    </ul>
                </div>
                <div className="mt-[10px] ml-[30px] text-[15px]">
                    <h1 className="">TOPPINGS</h1>
                    <ul>
                        {
                            Object.entries(val[0]["toppings"]).map(val1 => {
                                console.log(val1[0], val1[1])
                                return <div class="form-check">
                                    <input onClick={(event) => {
                                        this.setState({
                                            data: this.state.data.filter(val2 => val2["id"] == idt ? Object.entries(val2["toppings"]).map(x => { x[0] == val1[0] ? (val2["toppings"][val1[0]] == true ? val2["toppings"][val1[0]] = false : val2["toppings"][val1[0]] = true) : val2["toppings"][x[0]] = val2["toppings"][x[0]] }) : val2)
                                        })
                                    }} defaultChecked={val1[1]} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={val1[1]} id="flexCheckDefault" />
                                    <label class="form-check-label inline-block text-white-800" for="flexRadioDefault1">
                                        {val1[0]}
                                    </label>
                                </div>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <div className="flex mt-[10px] ml-[45px]">
                        <label>QNT</label>
                        <input onChange={(event) => {
                            this.setState({
                                data: this.state.data.filter(val1 => val1["id"] == idt ? val1["Qnt"] = event.target.value : val1)
                            }, () => {
                                console.log(this.state.data)
                            })
                        }} value={val[0]["Qnt"]} type="number" className="h-[30px] w-[80px] ml-[10px] mt-[3px] text-black" />
                    </div>
                    <div className="mt-[20px] text-[0px]">
                        {this.setState({
                            data: this.state.data.map(val1 => { return val1["id"] == idt ? this.change_total(val1) : val1 })
                        })}
                        {console.log(val[0]["total"])}
                        <p className="text-[25px]">Total: {val[0]["total"]} RS</p>
                    </div>
                    <div className="flex justify-around mt-[10px]">
                        <button key={val["id"]} className="bg-white text-black mt-[10px] h-[30px] w-[50px]" value={idt} onClick={this.getorder}>Order</button>
                        <button key={val["id"]} className="bg-white text-black mt-[10px] h-[30px] w-[50px]" value={idt} onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>,
            document.getElementById(`${idt}`)

        )
    }

    add = (event) => {

        let val = this.state.data.filter(val => val["id"] == event.target.value)
        console.log("adjsf", `${event.target.value}`)
        if (this.state.pre != "") {
            ReactDOM.render(<div></div>, document.getElementById(`${this.state.pre}`))
        }
        this.setState({

            pre: event.target.value,
            pre_arrr: val

        }, () => {


            this.menu(val, event.target.value);

        })
    }
    cart = (event) => {
        let x = 0;
        this.setState({
            is_cart: true
        }, () => {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i]["Qnt"] > 0) {
                    x += parseInt(this.state.data[i]["total"])
                }
            }
            this.setState({
                total_bill: x
            })
            ReactDOM.render(<div></div>, document.getElementById('fil'))
        })
    }
    chveg = (event) => {
        this.setState({
            isveg: this.state.isveg == true ? false : true
        })

    }
    pizza = async (event) => {
        await this.setState({
            is_cart: false,


        })
    }
    chnonveg = (event) => {
        this.setState({
            isnonveg: this.state.isnonveg == true ? false : true
        })

    }
    render() {
        return (
            <div className="bg-white text-black h-full text-[15px]" >
                <div className="flex ml-[30px] pt-[10px] text-[20px]">
                    <div id="bt1">
                        <button onClick={this.pizza} className="ml-[30px] pt-[10px] text-[40px] sm:text-[25px] sm:ml-[-10px] sm:mt-[30px]" ><p>PIZZAS</p></button>
                    </div>
                    {
                        this.state.is_cart == false ? <div className="border-2 border-black w-[130px] h-[0px] mt-[70px] ml-[-130px] sm:w-[0px] sm:ml-[-100px] "></div> : <div></div>
                    }
                    <div id="bt2">
                        <button onClick={this.cart} className="ml-[80px] pt-[10px] text-[40px] sm:text-[25px] sm:ml-[120px] sm:mt-[30px] "><p>CART</p></button>
                    </div>
                    {
                        this.state.is_cart == true ? <div className="border-2 border-black w-[130px] h-[0px] mt-[70px] ml-[-110px] sm:w-[0px] sm:ml-[50px] sm:mt-[100px]"></div> : <div></div>
                    }
                    <div className="flex sm:flex-col">
                    <div id="bt3" className="ml-[400px] flex pt-[15px] sm:ml-[15px] sm:pt-[10px] sm:ml-[80px]">
                        <p className="mr-[10px]">Veg</p>
                        <label class="switch">
                            <input onClick={this.chveg} type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div id="bt4" className="ml-[100px] flex pt-[15px] sm:ml-[80px]">
                        <p className="mr-[10px]">NonVeg</p>
                        <label class="switch">
                            <input onClick={this.chnonveg} type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="ml-[80px] pt-[15px] sm:ml-[10px]">
                        <button onClick={this.filters}>Filters</button>
                    </div>

                </div>
                </div>
                <div id="fil" value="fil" >

                </div>

                <div>{
                    this.state.data.map(val => {
                        if ((this.state.is_cart == true && val["Qnt"] > 0) || this.state.is_cart == false) {
                            if ((this.state.isveg == false && val["veg"] == false) || this.state.isveg == true) {
                                if ((this.state.isnonveg == false && val["veg"] == true) || this.state.isnonveg == true) {
                                    return <div className={`ml-[40px] mt-[20px] sm:ml-[10px]`}>
                                        <div className={`flex justify-around h-[180px]  w-[1200px] text-black sm:w-[400px] sm:justify-start ${val["Qnt"] > 0 ? "border-4 border-green-600" : " border-4 border-gray"}`}>
                                            <div className="mt-[35px] ">
                                                <img className="h-[140px] w-[280px] ml-[0px] mt-[-20px] sm:w-[200px] " src={val["img_url"]} />
                                            </div>
                                            <div className="pr-[30px] pl-[30px] sm:ml-[-100px] sm:pl-[120px] ">

                                                <h1 className="text-[25px] sm:text-[15px]"> {val["name"]}</h1>

                                                {this.state.is_cart == false ? <p>{val["description"]}</p> : <p>{Object.entries(val["size"]).map(x => {
                                                    if (x[1] == true) {
                                                        return <p>{x[0]}</p>
                                                    }
                                                })}</p>}
                                                {this.state.is_cart == false ? <p></p> : <p>{Object.entries(val["toppings"]).map(x => {
                                                    if (x[1] == true) {
                                                        return <p>{x[0]}</p>
                                                    }
                                                })}</p>}
                                                {
                                                    val["Qnt"] > 0 && this.state.is_cart == false ? <div className="">
                                                        <p className="mr-[60px] mt-[60px] text-green-600">ORDERED : {val["Qnt"]}</p>
                                                    </div> : <div></div>
                                                }

                                            </div>

                                            <div className="flex flex-col sm:flex-col sm:text-[15px] sm:mt-[-30px]">
                                                <div className="flex sm:flex-col justify-around text-[20px] sm:text-[15px]">
                                                    <div className=" w-[150px] mt-[30px] text-[25px] sm:text-[15px]">
                                                        {this.state.is_cart == false ? <p>  {val["rating"]}</p> : <p>Qnt  {val["Qnt"]}</p>}
                                                    </div>
                                                    <div className=" w-[150px] mt-[30px] text-[25px] sm:text-[15px] ">
                                                        {this.state.is_cart == false ? <p>RS : {val["price"]} </p> : <p className="">RS : {val["total"]}</p>}
                                                    </div>

                                                </div>

                                                <div className=" flex mt-[50px] justify-around sm:flex-col sm:mt-[20px]">
                                                    <div className="sm:mt-[-2px] sm:mb-[10px]">
                                                        {val["veg"] == true ? <p>VEG</p> : <p>NonVeg</p>}</div>
                                                    <div className="">
                                                        <button onClick={this.add} value={val["id"]} className="bg-blue-600 w-[100px] h-[50px] text-[30px] rounded-lg  mt-[-20px] sm:mt-[-100px] sm:h-[25px] sm:w-[50px] sm:text-[15px]">Modify</button>
                                                    </div>

                                                </div>
                                                <div id={`${val["id"]}`}></div>

                                            </div>
                                        </div>

                                    </div>
                                }
                            }
                        }

                    })}

                </div>
                <div className="flex justify-around mt-[20px] mb-[50px]">
                    {this.state.is_cart == true ? <h1 className="text-[30px]">TOTALBILL</h1> : <h1></h1>}
                    {this.state.is_cart == true ? <h1 className="mt-[10px] text-[20px]">{this.state.total_bill} RS</h1> : <h1></h1>}
                </div>
            </div>
        )
    }
}

