import React from 'react';

const JournalistCard = ({
	selectedJournalists,
	addMessageForJournalist,
}) => selectedJournalists.map((journalist, key) => (
	<div className="add-pernl-info pt-1" key={journalist.id}>
		<div className="card_pro_row add-pernl-pro">
			<div className="pernl-pro-conts">
				<div className="card_pro_img">
					<img
						src="img/card_pro.jpg"
						alt="card_pro"
					/>
				</div>
				<div className="card_pro_contnt">
					<h3>
						{journalist.name}
						<span>Tech Reporter</span>
					</h3>
					<p>New York Times</p>
				</div>
			</div>
		</div>
		<div className="add-pernl-text">
			<textarea
				rows="5"
				cols="50"
				placeholder="Add Personal Message (max.200 Character)"
				onChange={e => addMessageForJournalist(e, key)}
			/>
		</div>
	</div>
));

export default JournalistCard;
