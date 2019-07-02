import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val: '',
			box: props.boxes || [],
		};
	}

	putInBox = (val) => {
		const { box } = this.state;
		const { onSelect } = this.props;
		const isExist = box.filter(item => item === val);
		if (!isExist.length) {
			const boxes = box;
			boxes.push(val);
			onSelect(boxes);
			this.setState({ box: boxes, val: '' });
		}
	};

	setVal = (e) => {
		const { onChange } = this.props;
		onChange(e.target.value);
		this.setState({ val: e.target.value });
	};

	onItemSelection = val => this.putInBox(val);

	onCreate = (val) => {
		const { onCreate } = this.props;
		this.putInBox(val);
		onCreate(val);
	};

	renderList = () => {
		const { box, val } = this.state;
		const { list } = this.props;
		const dropdownList = [];
		list.map((item) => {
			const isExist = box.filter(item1 => item1 === item.text);
			if (!isExist.length && item.text && item.text.toLowerCase().includes(val.toLowerCase())) {
				const isCreate = item.text.toLowerCase().split(' ');
				if (isCreate[0] !== 'create') {
					dropdownList.push(item.text);
				}
			}
			return null;
		});
		if (val !== '') {
			return (
				<div className="auto-selection-list">
					<ul>
						{dropdownList.length ? (
							dropdownList.map(item => (
								<li key={item} onClick={() => this.putInBox(item)} role="button">
									<span>{item}</span>
								</li>
							))
						) : (
							<li>
								<span onClick={() => this.onCreate(val)} role="button">create</span>
							</li>
						)}
					</ul>
				</div>
			);
		}
		return null;
	};

	render() {
		const { box, val } = this.state;
		return (
			<div className="auto-selection">
				<div className="custom_field">
					<input
						value={val || ''}
						onChange={this.setVal}
						type="text"
						name="topics"
						autoComplete="off"
						id="topics"
						placeholder="Enter Any Topic"
					/>
					<label htmlFor="topics">Topic</label>
					{this.renderList()}
				</div>
				<div />
				<ul className="topic_list">
					{box.map(item => (
						<li key={item}>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

// props initialization ( default values )
AutoComplete.defaultProps = {
	list: [],
	onCreate: () => {},
	onChange: () => {},
	onSelect: () => {},
};

// props type definition
AutoComplete.propTypes = {
	list: PropTypes.array,
	onCreate: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
};

// default importing
export default AutoComplete;
