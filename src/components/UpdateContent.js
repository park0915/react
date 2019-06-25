import React , {Component} from 'react';

class UpdateContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.data.id,
            title : this.props.data.title,
            desc : this.props.data.desc
        }
        this.inputFromHandler = this.inputFromHandler.bind(this);
    }
    inputFromHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        var data = this.props.data;
        console.log(data)
        return(
            <article>
                <h2>Update</h2>
                <form action="/update_process" method="post"
                    onSubmit={function (e) {
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc
                        );
                    }.bind(this)}>

                    <input type="hidden" name="id" value={this.state.id}/>
                    <p><input
                            type="text" name="title" placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFromHandler}
                            /></p>
                    <p><textarea
                            name="desc" placeholder="description"
                            value={this.state.desc}
                            onChange={this.inputFromHandler}
                            /></p>

                    <p><input
                            type="submit"/></p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;