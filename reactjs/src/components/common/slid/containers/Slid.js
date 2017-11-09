import React, { Component } from 'react';
import Visual from '../../content/components/Visual';
import EditMetaSlid from '../components/EditMetaSlid';
import { connect } from 'react-redux';
import {setSelectedSlid } from '../../../../actions'

class Slid extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);
        // this.state={
        // 	title:this.props.slid.title,
        // 	txt:this.props.slid.txt
        // };
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeTxt=this.handleChangeTxt.bind(this);
        this.getRender=this.getRender.bind(this);
		this.updateSelectedSlid=this.updateSelectedSlid.bind(this);


    }


	handleChangeTitle(e){
		// this.setState({title:e.target.value});
		this.props.updateSlid(this.props.slid.id,e.target.value,this.props.slid.txt,this.props.slid.content_id);
	}

	handleChangeTxt(e){
		// this.setState({txt:e.target.value});
		this.props.updateSlid(this.props.slid.id,this.props.slid.title,e.target.value,this.props.slid.content_id);
	}

	updateSelectedSlid(){
		const tmpSlid={id:this.props.slid.id,
			title:this.props.slid.title,
			txt:this.props.slid.txt,
			content_id:this.props.slid.content_id};
		this.props.dispatch(setSelectedSlid(tmpSlid));
	}



	getRender(){
	  	let array_render = [];

	  	// if(this.props.contentMap ==undefined){
    //       return <div></div>;
    //   	}

	  	// a changer avec un switch ?

	  	if(this.props.displayMode == "FULL_IMG"){
	  		// console.log(this.props.slid.id);
	    	array_render.push(<EditMetaSlid title={this.props.slid.title} txt={this.props.slid.txt} id={this.props.slid.id} content_id={this.props.slid.content_id} handleChangeTitle={this.handleChangeTitle} handleChangeTxt={this.handleChangeTxt}/>);
			for(var i=0;i<Object.keys(this.props.contentMap).length;i++){
				var key = Object.keys(this.props.contentMap)[i];
				
				if(key == this.props.slid.content_id){
					array_render.push(<div ><Visual type={this.props.contentMap[key].type} 
							src={this.props.contentMap[key].src}
							dropContent={this.props.dropContent} 
							allowDrop={this.props.allowDrop}
						/> </div>);
				}
	
			}
	
		} else {
	  	    array_render.push(<h1>{this.props.slid.title}</h1>);
			array_render.push(<h2>{this.props.slid.txt}</h2>);
			
			for(var i=0;i<Object.keys(this.props.contentMap).length;i++){
				var key = Object.keys(this.props.contentMap)[i];
				
				if(key == this.props.slid.content_id){
					array_render.push(<Visual 
							type={this.props.contentMap[key].type} 
							src={this.props.contentMap[key].src} 
						/>);
				}
	
			}
	

	    }

	     return array_render;

	}

              // <h1>{this.props.slid.title}</h1>
              //   <h2>{this.props.slid.txt}</h2>
              //   {visual}
              //   {edit}
 
	//render function use to update the virtual dom
	render() {
	// const visual = this.getContentById(this.props.slid.content_id);
	// const edit = this.showEditMetaSlid(this.props.displayMode);
    const show = this.getRender();

    return (
            <div className="panel panel-default" onClick={()=>{this.updateSelectedSlid()}}>
                <div className="panel-body" >
  					{show}
                </div>
            </div>
        );
   
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    contentMap: state.updateModelReducer.content_map,
    } };

export default connect(mapStateToProps)(Slid);