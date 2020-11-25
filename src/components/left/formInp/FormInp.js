import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
// import Calander from '../calander/Calander';
import './FormInp.css';

export default class Left extends Component {
    state={
        title:'',
        content:'',
        data:[],
        discription : '',
        editable: false
    }

    componentDidMount() {
       
        const list = window.localStorage.getItem('notes');
        const parseList = JSON.parse(list);
        if(list ===null){
            return false;
        }
        else{
            this.setState({ data:parseList});   
        }
      
      }
    changeTitle = (e) => {
        const val = e.target.value;
        this.setState({title:val});       
    }
    changeContent = (e) => {
        const con = e.target.value;
        this.setState({content:con});
    }
    onAddItem = () => {
        const newTitleInput = this.state.title;
        const newContentValue = this.state.content;
        const obj = {'title': newTitleInput,
         'content': newContentValue ,
          'date' : this.props.date ,
           'month' : this.props.month};
        if(localStorage.getItem('notes') === null){
            let data =[];
            const update = [...data , obj];
            localStorage.setItem('notes' , JSON.stringify(update));
        }else{
            let data = JSON.parse(localStorage.getItem('notes'));
            const update = [...data , obj];
            localStorage.setItem('notes' , JSON.stringify(update));
        }
        this.setState({ data:JSON.parse(localStorage.getItem('notes'))
                          ,title:'' , content:''});   
    }

    showContent = (i) => {

        const list = window.localStorage.getItem('notes');
        const parseList = JSON.parse(list); 
        const selectedItem = parseList.find((item , index) => index === i);
        console.log( selectedItem.content);
        this.setState({ description :selectedItem.content});  
    }
    handleEdit = i => {
        
            const list = window.localStorage.getItem('notes');
            const parseList = JSON.parse(list);
            const filteredItem = parseList.filter((item,index) => index !== i);
            const selectedItem = parseList.find((item , index) => index === i);
            console.log(selectedItem);
            this.setState({
                data:filteredItem,
                title:selectedItem.title,
                content: selectedItem.content,
                editable: true
            });
           
    }

    Save = () => {
           console.log('clicked')
           const newTitleInput = this.state.title;
           const newContentValue = this.state.content;
           const obj = {'title': newTitleInput, 'content': newContentValue};
          localStorage.setItem('notes' ,JSON.stringify(obj));
          this.setState({editable:false});
    }
          
    render() {


        const data = this.state.data.map((item ,index) => {
             return(
                   <div key={index} className="right">
                        <li > 
                            <Button variant="primary"
                             className="btntitle"
                             onClick={() => this.showContent(index)}>
                            {item.title}
                             </Button> 
                            {item.date} {item.month }
                           <Button variant="secondary"
                           onClick = {() => this.handleEdit(index)}
                           className="btnEdit">
                             edit
                             </Button>
                         </li>
                         </div>
                
             )   
        });

        return (
            <div className='left'>
               
               <Form>
               <Button variant="light" size="mg" block>
                    Add Note
               </Button>

           <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>title</Form.Label>
                <Form.Control type="text" placeholder="title"
                  onChange={this.changeTitle} value={this.state.title}  />
         </Form.Group> 

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} 
               onChange={this.changeContent} value={this.state.content}/>
            </Form.Group>
            <Button variant="primary"  onClick={this.onAddItem }
             style={ this.state.editable ? {display:'none'}:{display:'block'}}
            >
                   Add
            </Button>
            
            <Button variant="secondary" onClick = {this.Save}
              style={ this.state.editable ? {display:'block'}:{display:'none'}}
             >
                   Save
            </Button>

            </Form> 
  
        <ol className="ol">
              {data}
          </ol>
        <p className="des">{this.state.description}</p>
          
            </div>
        )
    }
}
