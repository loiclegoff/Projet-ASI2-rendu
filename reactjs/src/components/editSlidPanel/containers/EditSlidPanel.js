import React from 'react';
import Slid from '../../common/slid/containers/Slid';
import {connect } from 'react-redux';
import {updateSlid} from '../../../actions'
import {updatePresSlids} from '../../../actions'

class EditSlidPanel extends React.Component{

	constructor(props) {
		super(props);
        this.updateSlid=this.updateSlid.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
		this.dropContent=this.dropContent.bind(this);

	}
    updateSlid(id,title,txt,content_id){
        const tmpSlid={id:id,
            title:title,
            txt:txt,
            content_id:content_id};
        this.props.dispatch(updateSlid(tmpSlid));
        this.props.dispatch(updatePresSlids(tmpSlid));
    }

    allowDrop(ev){
		ev.preventDefault();
	}

	dropContent(ev){
        console.log("drop goo");
		this.updateSlid(this.props.selected_slid.id,this.props.selected_slid.title,this.props.selected_slid.txt,this.props.dragged_elt.id);

	}

	render(){
        // console.log(this.props.selected_slid);
		return (

			<div>
               <Slid updateSlid={this.updateSlid} slid={this.props.selected_slid} dropContent={this.dropContent} 
							allowDrop={this.allowDrop} displayMode="FULL_IMG"/>
            </div>
		);
}}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_slid: state.selectedReducer.slid,
        dragged_elt: state.selectedReducer.dragged_elt,
    } };

export default connect(mapStateToProps)(EditSlidPanel);