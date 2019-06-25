import React , {Component} from 'react';
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Subject from './components/Subject'
import Control from './components/Control'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.max_content_id = 3;
        this.state={
            mode:"welcome",
            selected_content_id :2,
            subject:{title:"WEB" ,sub:"world wide web"},
            welcome:{title:"Welcome" ,desc:"Hello React !!!"},
            contents :[
                {id:1 ,title:"HTML", desc:"HTML is for information"},
                {id:2 ,title:"CSS", desc:"CSS is for design"},
                {id:3 ,title:"JS", desc:"JS is for interactive"}
            ]
        }
    }
    getReadContent(){
        var i = 0;
        while (i<this.state.contents.length){
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id){
                return data;
               break;
            }
            i = i+1
        }
    }
    getContent(){
        var _title , _desc , _article = null;
        if(this.state.mode === "welcome"){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        }else if (this.state.mode === "read"){
            var _content = this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
        }else if (this.state.mode === "create"){
            _article = <CreateContent onSubmit={function (_title, _desc) {
                this.max_content_id = this.max_content_id +1;

                /*this.state.contents.push(
                    {id:this.max_content_id, title:_title, desc:_desc}
                );
                this.setState({
                    contents: this.state.contents
                }); //push 사용 원본 변경 됨
                */

                var newContents = Array.from(this.state.contents); // Object 인 경우에는 Object.assign
                newContents.push({id:this.max_content_id, title:_title, desc:_desc})
                this.setState({
                    contents: newContents,
                    mode : "read",
                    selected_content_id : this.max_content_id
                }); //Array.from 사용하여 복제 후 push 사용 원본 변경 안됨

                /*var _contents = this.state.contents.concat(
                    {id:this.max_content_id, title:_title, desc:_desc}
                );
                this.setState({
                    contents: _contents
                }); // concat 사용 원본 변경 안됨*/
            }.bind(this)}>
            </CreateContent>;
        }else if (this.state.mode === "update"){
           var _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={
                function (_id,_title,_desc) {
                    var _contents = Array.from(this.state.contents);
                    var i = 0;
                    while (i<_contents.length){
                        if(_contents[i].id === _id){
                            _contents[i] = {id:_id, title:_title, desc:_desc}
                            break;
                        }
                        i = i+1;
                    }
                    this.setState({
                        contents: _contents,
                        mode : "read"
                    });
            }.bind(this)}>
            </UpdateContent>;
        }else if (this.state.mode === "delete"){

        }
        return _article
    }
    render(){
        return(
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        this.setState({mode:"welcome"});
                }.bind(this)}>
                </Subject>
                <TOC
                    onChangePage={function (_id) {
                        this.setState({
                            mode:"read",
                            selected_content_id :Number(_id)
                        });
                    }.bind(this)} // 하위가 상위한테 명령 : 이벤트
                    data={this.state.contents}> //상위가 하위한테 명령 : props
                </TOC>
                <Control
                    onChangeMode={function (_mode) {
                        if (_mode === "delete"){
                            if(window.confirm('really?')){
                                var _contents = Array.from(this.state.contents)
                                var i = 0;
                                while (i < _contents.length){
                                    if(_contents[i].id === this.state.selected_content_id){
                                        _contents.splice(i,1)
                                    }
                                    i=i+1;
                                }
                                this.setState({
                                    contents:_contents,
                                    mode: "welcome"
                                });
                                alert("deleted!")
                            }
                        }else{
                            this.setState({
                                mode: _mode
                            });
                        }
                    }.bind(this)} >
                </Control>
                {this.getContent()}
            </div>
        );
    }
}

export default App;
