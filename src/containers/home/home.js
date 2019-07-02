import React, { useState } from 'react';
import IMAGES from '../../assets/images';
import METADATA from '../../utils/metadata';
import ListRow from '../../components/listRow';
import GridRow from '../../components/gridRow';

const { SEARCH_ICON } = IMAGES;
const { PITCHES } = METADATA;

const Home = ({ createNewPitch }) => {
	const [view, setView] = useState(0);
	const [val, setVal] = useState('');
	return (
		<div>
			<div className="container cstm_container bg_skyblue">
				<div className="new_pitch">
					<h4>Start getting hits by pitching some journalists !</h4>
					<button className="btn new_pitch_btn" onClick={createNewPitch}>Write New Pitch</button>
				</div>
				<div className="srch_row">
					<div className="search_auto_wrapper">
						<div className="srch_col">
							<input
								type="search"
								placeholder="Search for journalists or media outlets"
								value={val}
								onChange={e => setVal(e.target.value)}
							/>
							<button type="button">
								<img className="srch_icn" src={SEARCH_ICON} alt="search" />
							</button>
						</div>
						<Search val={val} />
					</div>
				</div>
				<div className="pitches_row">
					<h4>My Pitches</h4>
					<span className="slide_toggle">
						<span className={`${view ? 'active' : ''}`}>
							<i className="fa fa-th-large" aria-hidden="true" onClick={() => setView(1)} />
						</span>
						<span className={`${view ? '' : 'active'}`}>
							<i className="fa fa-list-ul" aria-hidden="true" onClick={() => setView(0)} />
						</span>
					</span>
				</div>
				{view ? <Card /> : <List />}
			</div>
		</div>
	);
};

const Search = ({ val }) => PITCHES.length > 0 && (
	<div className="srch_lst_row">
		{PITCHES.map(({ name, profile, profilePic }) => {
			if (val && name.toLowerCase().includes(val.toLowerCase())) {
				return (
					<div key={name} className="srch_lst_col">
						<div className="srch_pic">
							<img src={profilePic} alt="profile_pic" />
						</div>
						<span className="pro_detail">
							<h3>{name}</h3>
							<p>{profile}</p>
						</span>
					</div>
				);
			}
			return null;
		})}
	</div>
);

const Card = () => <div className="card_row">{PITCHES.map(pitch => <GridRow key={pitch.name} {...pitch} />)}</div>;

const List = () => PITCHES.map(pitch => <ListRow key={pitch.name} {...pitch} />);

export default Home;