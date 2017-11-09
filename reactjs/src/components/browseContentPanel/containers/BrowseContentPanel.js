import React, { Component } from 'react';
import Content from '../../common/content/containers/Content';
import { connect } from 'react-redux';
/* import ScrollArea from 'react-scrollbar'; */
import FloatingActionButton from '../../../lib/material-ui/FloatingActionButton/FloatingActionButton';
import ContentAdd from '../../../lib/material-ui/svg-icons/content/add';
import Dialog from '../../../lib/material-ui/Dialog';
import FlatButton from '../../../lib/material-ui/FlatButton';
import SelectField from '../../../lib/material-ui/SelectField';
import TextField from '../../../lib/material-ui/TextField';
import MenuItem from '../../../lib/material-ui/MenuItem';
/* import Button from '../../../lib/material-ui/svg-icons/content/add';
 */
import { addContent } from '../../../actions'
import MuiThemeProvider from '../../../lib/material-ui/styles/MuiThemeProvider';


const style = {
    marginRight: 20,
  };


  
 

/* const addButton = () => (
    <FloatingActionButton mini={true} style={style}>
        <ContentAdd />
    </FloatingActionButton>
  );
 */
class BrowseContentPanel extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);


        this.getAllContentRender=this.getAllContentRender.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        open: false,
        value: 1,
    };

    // dragContent(key) {
    //     alert(key);
    // }
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });

        let contentTmp = {
            title: this.refs.title.getValue(),
            type: this.state.value,
            src: this.refs.url.getValue()
        }
        console.log(this.refs.title.getValue());
        console.log(this.refs.url.getValue());
        console.log(this.state.value);
        this.props.dispatch(addContent(contentTmp));
    };

    handleChange = (event, index, value) => this.setState({ value });

    getAllContentRender(){
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

    for(var i=0;i<Object.keys(this.props.contentMap).length;i++){
        var key = Object.keys(this.props.contentMap)[i];
        
            array_render.push(
                <Content
                /* <Content draggable="true" ondragstart={this.dragContent(key)} */
                    objt={this.props.contentMap[key]}
                />
            );

    }

        return array_render;
    }



    
  //render function use to update the virtual dom
  render() {
      const display_list= this.getAllContentRender();
      const actions = [
          <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
          />,
          <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
              />,
      ];
    return (
            <div>
            <div data-spy="scroll"  data-offset="0">
                {display_list}
                </div>

                    <FloatingActionButton style={style}>
                        <ContentAdd label="Dialog" onClick={this.handleOpen}/>
                    </FloatingActionButton>
 

                <Dialog
                    title="Add Content"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Title"
                        ref="title"
                    /><br />
                    <SelectField
                        floatingLabelText="Content Type"
                        value={this.state.value}
                        onChange={this.handleChange}
                        autoWidth={true}
                        ref="typeContent"
                    >
                        <MenuItem value={"web"} primaryText="web" />
                        <MenuItem value={"img_url"} primaryText="img_url" />
                        <MenuItem value={"url"} primaryText="video" />
                    </SelectField>
                    <br />
                    <TextField
                        hintText="URL"
                        ref="url"
                    /><br />
                    
                </Dialog>
       
            </div>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
    return {
    contentMap: state.updateModelReducer.content_map,
    } };

export default connect(mapStateToProps)(BrowseContentPanel);