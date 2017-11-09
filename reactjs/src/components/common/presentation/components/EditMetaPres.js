import React from 'react';

export default class EditMetaPres extends React.Component{

	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className="form-group">
				<label htmlFor="currentPresTitle">Title</label>
				<input
					type="text"
					className="form-control"
					id="currentPresTitle"
					onChange={this.props.handleChangeTitle}
					value={this.props.title}
				/>
				<label htmlFor="currentPresText">Description</label>
				<textarea
					rows="5"
					type="text"
					className="form-control"
					id="currentPresText"
					onChange={this.props.handleChangeDescription}
					value={this.props.description}>
				</textarea>
			</div>
		);
}}