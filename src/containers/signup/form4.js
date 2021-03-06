import React from 'react';
import Button from '../../components/button';
import AutoComplete from '../../components/autoComplete';

// render form3
const Form4 = ({
	interests,
	onSubmit,
	onBack,
	onCreate,
	onTodoSelection,
	journalistInterests,
	getJournalistInterests,
	error,
}) => (
	<div className="step_form_col">
		<h2 className="mbot30">What do you write about?</h2>
		<div className="full_widt mbot_zero">
			<h3>Interests</h3>
			<AutoComplete
				list={journalistInterests.data}
				name="Interest"
				onCreate={onCreate}
				onSelect={onTodoSelection}
				boxes={interests}
				onChange={getJournalistInterests}
			/>
		</div>

		{error
				&& error.interests && <div className="error">{error.interests.map(msg => <p key={msg}>{msg}</p>)}</div>}

		<div className="step_btn_wrapper">
			<Button className="white_bg_btn" onClick={onBack}>Back</Button>
			<Button type="submit" className="green_bg_btn" onClick={onSubmit}>Next</Button>
		</div>
	</div>
);
export default Form4;
