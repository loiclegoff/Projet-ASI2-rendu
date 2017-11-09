import React, { Component } from 'react';

class Visual extends Component {
    constructor(props) {
        super(props);        
    }
  
  render() {
      let render_visual;
      switch(this.props.type){
        case "img_url":
            render_visual=(
                <img 
                    className='imgCard' 
                    src={this.props.src}  
                />
                );
        break;
        case "video":
              render_visual=(
              <object  width="100%" height="100%"
                        data={this.props.src}>
                </object>
                );
        break;
        case "web":
            render_visual=(
            <iframe src={this.props.src}
            width="540" height="450"></iframe>
            );
        break;

        }
      
      
    return (
            <div className="thumbnail"
            	onDrop={this.props.dropContent} 
				onDragOver={this.props.allowDrop}
            >
                {render_visual}
            </div>            
    );
  }
}

export default Visual;