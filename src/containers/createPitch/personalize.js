import React from 'react';
import StatusBar from '../../components/statusBar';
// import Select from '../../components/select';
import SearchBox from '../../components/searchbox';
import JournalistCard from './journalistCard';
import AutoComplete from '../../components/autoComplete';

const Personalization = ({
	steps,
	active,
	options,
	name,
	value,
	journalists,
	mediaList,
	getJRMediaList,
	onSelectMediaList,
	handlePrSelect,
	setSearchValue,
	selectedMediaList,
	searchString,
	changeNextScreen,
	changeToPreviousScreen,
	selectedJournalists,
	savePersonalizeData,
	errors,
	...props
}) => (
	<div className="create_new_pitch_form">
		<div className="form_wrapper pitch_form_wraper">
			<div className="ad-pernl-hdg">
				<h2>Add Personalisation</h2>
			</div>
			<StatusBar steps={steps} active={active} />
			<form>
				<div className="ad-pernl-conts cstm_selec_row">
					<label htmlFor="ss">Choose Media list</label>
					<AutoComplete
						index="journalists_data"
						list={mediaList.data}
						showAddButton={false}
						className="media_list"
						onSelect={onSelectMediaList}
						boxes={selectedMediaList}
						onChange={getJRMediaList}
					/>
				</div>
				<div className="ad-pernl-conts">
					<label htmlFor="ddd">Add More Journalists</label>
					{
						<SearchBox
							data={journalists || []}
							onSelect={handlePrSelect}
							placeholder="Search for journalists"
							setSearchValue={setSearchValue}
							searchString={searchString}
						/>
					}
				</div>
				<div className="ad-pernl-conts mt-0">
					{selectedJournalists.length > 0 && (
						<React.Fragment>
							<label htmlFor="sss">Add Personal Message for Journalist</label>
							<JournalistCard {...props} selectedJournalists={selectedJournalists} />
						</React.Fragment>
					)}
				</div>
				<div className="error">
					<p>{errors.journalistCount}</p>
				</div>
				<div className="success">
					<p>{errors.createPitchApiSuccess}</p>
				</div>
				<div className="ad-pernl-conts mt-0">
					<span className="view-btn-rgt add-pernl-btn">
						<button type="button" className="btn new_pitch_btn disc-btn" onClick={changeToPreviousScreen}>
							BACK
						</button>
						<button type="button" className="btn new_pitch_btn snd-btn" onClick={changeNextScreen}>
							NEXT
						</button>
						<button type="button" className="btn new_pitch_btn disc-btn" onClick={savePersonalizeData}>
							SAVE TEMPLATE
						</button>
					</span>
				</div>
			</form>
		</div>
	</div>
);

export default Personalization;
