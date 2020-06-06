import React, { Component } from 'react';
import AppNav from './AppNav'
import "react-datepicker/dist/react-datepicker.css";
import {Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom'
import ReactDatePicker from 'react-datepicker';
import Moment from 'react-moment';

class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            date : new Date(),
            isLoading : false,
            categories : [],
            expenses : [],
            item : this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    emptyItem = {
        description : 'Hello' ,
        expensedate : new Date(),
        id:104,
        location : '',
        category : {id:1 , name:'Travel'}
    }


    handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
      }
  
  
      handleDateChange(date){
        let item={...this.state.item};
        item.expensedate= date;
        this.setState({item});
      
      }


    async handleSubmit(event){
     
        const item = this.state.item;
      
  
        await fetch(`/api/expenses`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(item),
        });
        
        event.preventDefault();
        this.props.history.push("/expenses");
      }

    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
          this.setState({expenses : updatedExpenses});
        });

    }

    async componentDidMount(){
        const response = await fetch("/api/categories");
        const body = await response.json();
        this.setState({categories:body, isLoading:false});
        const response1 = await fetch("/api/expenses");
        const body1 = await response1.json();
        this.setState({expenses:body1, isLoading:false});
    }

    render() { 
        const title =<h3>Add Expense</h3>;
        const titleExpenseList =<h3>Your Expenses</h3>;
        const {categories, expenses, isLoading} = this.state;
        let categoryOptionList = categories.map(category => <option id={category.id}>{category.name}</option>)
        
        let rows = expenses.map(expense => 
                <tr id={expense.id}>
                    <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                    <td>{expense.description}</td>
                    <td>{expense.category.name}</td>
                    <td>{expense.location}</td>
                    <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                </tr>);

        if (isLoading){
            return (<div>Loading.....</div>);
        }
        return (
            <div>
                <AppNav/>
                
                <Container>
                    {titleExpenseList}
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
                {''}
                <Container>
                    {title}
                    
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="description">Title</Label>
                        <Input type="description" name="description" id="description" 
                            onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category" >Category</Label>
                        <select>
                            {categoryOptionList}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="datePicker" >Date</Label>
                        <ReactDatePicker selected={this.state.date} onChange={this.handleChange}></ReactDatePicker>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input type="text" name="amount" id="amount" 
                            onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                    </Form>
                </Container>
            </div>
         );
    }
}
 
export default Expenses;