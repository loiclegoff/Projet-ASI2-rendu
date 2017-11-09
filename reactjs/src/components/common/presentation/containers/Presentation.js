import React, { Component } from 'react';
import Visual from '../../content/components/Visual';
import EditMetaPres from '../components/EditMetaPres';
import SlidList from '../components/SlidList';
import { connect } from 'react-redux';

class Presentation extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);
        this.state={
        	title:this.props.title,
        	description:this.props.description
        };
        this.handleChangeTitle=this.handleChangeTitle.bind(this);
        this.handleChangeDescription=this.handleChangeDescription.bind(this);

    }



	handleChangeTitle(e){
		this.setState({title:e.target.value});

	}

	handleChangeDescription(e){
		this.setState({description:e.target.value});

	}


	//render function use to update the virtual dom
  render() {
	// const visual = this.getContentById(this.props.slid.content_id);


    return (
            <div className="panel panel-default">
                <div className="panel-body">
                	<EditMetaPres title={this.props.title} description={this.props.description} handleChangeTitle={this.handleChangeTitle} handleChangeDescription={this.handleChangeDescription}/>
                	<SlidList slidArray={this.props.slidArray}/>
                </div>
            </div>
        );
   
    }
}
const mapStateToProps = (state, ownProps) => {
	console.log(state.updateModelReducer.presentation);
    return {
    	title: state.updateModelReducer.presentation.title,
    	description: state.updateModelReducer.presentation.description,
    	slidArray: state.updateModelReducer.presentation.slidArray,
    	
    } };

export default connect(mapStateToProps)(Presentation);