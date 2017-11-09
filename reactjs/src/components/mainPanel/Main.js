import React from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import * as contentMapTmp from '../../source/contentMap.json';
import * as presTmp from '../../source/pres.json';
import Content from '../common/content/containers/Content';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import Slid from '../common/slid/containers/Slid';
import Presentation from '../common/presentation/containers/Presentation';
import EditSlidPanel from '../editSlidPanel/containers/EditSlidPanel';

import MuiThemeProvider from '../../lib/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../../lib/material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import globalReducer from '../../reducers/';
import {updateContentMap } from '../../actions'
import {updatePres } from '../../actions'


const store = createStore(globalReducer);

export default class Main extends React.Component{
	constructor(props) {
		super(props);
		console.log(contentMapTmp);
		// this.state = {
		// 	contentMap:contentMapTmp,
		// 	pres:presTmp
		// }

		store.dispatch(updateContentMap(contentMapTmp));
		store.dispatch(updatePres(presTmp));
	}
	
	
					// <Content objt={this.state.contentMap[1]}/>
					// <Content objt={this.state.contentMap[2]}/>
					// <Content objt={this.state.contentMap[3]}/>

											// 	<Slid slid={this.state.pres.slidArray[1]} displayMode="" contentMap={this.state.contentMap}/>
						// <Slid slid={this.state.pres.slidArray[1]} displayMode="FULL_IMG" contentMap={this.state.contentMap}/>



	render() {
		return (

			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Provider store={store} >
					<div className='container-fluid height-100'>
						<div className="row height-100">
							<div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
								<Presentation />
							</div>
							<div className='col-md-6 col-lg-6 height-100'>
								<EditSlidPanel />
							</div>
							<div className='col-md-3 col-lg-3 height-100'>
								<BrowseContentPanel/>
							</div>
						</div>
					</div>
				</Provider>
			</MuiThemeProvider>
		);
	}
}