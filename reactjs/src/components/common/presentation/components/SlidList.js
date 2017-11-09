import React from 'react';
import Slid from '../../slid/containers/Slid';
import {connect } from 'react-redux';
// import {updatePresSlids} from '../../../../actions'

class SlidList extends React.Component{

	constructor(props) {
		super(props);
		this.getAllSlidRender=this.getAllSlidRender.bind(this);
	}


	getAllSlidRender(){
     let array_render=[];

     // Pourquoi pb avec 0?     
     // for(var i=0;i<Object.keys(this.props.contentMap).length;i++){
     //    console.log(i);      
     //    console.log(this.props.contentMap[i]);      
     //     array_render.push(
     //         <Content
     //            objt={this.props.contentMap[i]}
     //         />
     //         );
     // }
    // console.log(this.props.selected_slid);
    // console.log(this.props.selected_slid.id);
    for(var i=0;i<Object.keys(this.props.slidArray).length;i++){
        var key = Object.keys(this.props.slidArray)[i];
        	// modif display
            // console.log(this.props.slidArray[key].id);
            
			// console.log(this.props.slidArray[key]);

   //          if (this.props.slidArray[key].id === this.props.selected_slid.id){
			// 	this.props.slidArray[key].content_id	= this.props.selected_slid.content_id;
			// 	this.props.slidArray[key].txt			= this.props.selected_slid.txt;
			// 	this.props.slidArray[key].title			= this.props.selected_slid.title;
			// 	// console.log("JE RENNNNTRE");
			// }
			// console.log(this.props.slidArray[key]);


            array_render.push(
                <Slid slid={this.props.slidArray[key]} displayMode=""/>
             );

            // console.log(this.props.selected_slid);

    }

    // new test
    // this.props.dispatch(updatePresSlids(this.props.slidArray));

    return array_render;
 }

	render(){
		const display_list = this.getAllSlidRender();

		return (
			<div>
               {display_list}
            </div>
		);
}}

export default SlidList;

// const mapStateToProps = (state, ownProps) => {
//     return {
//     selected_slid: state.selectedReducer.slid,
//     } };

// export default connect(mapStateToProps)(SlidList);