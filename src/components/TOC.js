import React , {Component} from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps , newState){
        console.log("TOC shouldComponentUpdate")
        console.log(newProps.data);
        console.log(this.props.data);
        console.log(newState);

        if(newProps.data === this.props.data){
            return false;
        }else{
            return true
        }
    }
    render(){
        console.log("TOC render")
        var lists = []
        var data = this.props.data;
        var i = 0;
        while (i < data.length){
            lists.push(
                <li key={data[i].id}>
                <a href={"/content/"+data[i].id}
                   /*data-id ={data[i].id}
                   onClick={function (e) {
                       e.preventDefault();
                       this.props.onChangePage(e.target.dataset.id);
                   }.bind(this)}*/
                   onClick={function (id , e) {
                       e.preventDefault();
                       this.props.onChangePage(id);
                   }.bind(this,data[i].id)}
                >{data[i].title}</a>
                </li>
            );
            i = i+1
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;