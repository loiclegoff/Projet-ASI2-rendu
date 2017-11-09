import React, { Component } from 'react';
import Label from '../components/Label';
import Visual from '../components/Visual';
import {connect } from 'react-redux';
import {updateDraggedElt} from '../../../../actions';


class Content extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);

        this.dragStartHandler=this.dragStartHandler.bind(this);
    }
  

                // <div className="panel-body">
                //     <Label 
                //         title={this.props.objt.title} 
                //         id={this.props.objt.id}

                //     />
                //     <Visual 
                //         type={this.props.objt.type} 
                //         src={this.props.objt.src} 
                //     />
                // </div>

  //render function use to update the virtual dom

    dragStartHandler(ev){
        this.props.dispatch(updateDraggedElt(this.props.objt.id));
        console.log("content mooove");
        
    }
        

  render() {

    // try {
    //    console.log(this.props.objt.id);
    // }
    // catch (e) {
    //    // les instructions utilisées pour gérer les
    //    // exceptions
    //    console.log(e); // on transfère l'objet de l'exception à une méthode 
    //                   // gestionnaire
    // }
    
    return (
            <div className="panel panel-default">

                <div className="panel-body" draggable="true" onDragStart={this.dragStartHandler}>
                    <Label 
                        title={this.props.objt.title} 
                        id={this.props.objt.id}

                    />
                    <Visual
                    /* <Visual draggable="true" ondragstart={this.props.dragContent} */

                        type={this.props.objt.type} 
                        src={this.props.objt.src} 
                    />
                </div>
            </div>
        );
   
    }
}
export default connect()(Content);