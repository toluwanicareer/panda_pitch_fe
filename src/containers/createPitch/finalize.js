import React, { useState } from 'react';
import Slider from 'react-slick';
import StatusBar from '../../components/statusBar';

const imagepath = require('../../../public/images/google.jpg');

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
};

const availabilityType = (progressValue) => {
	switch (progressValue) {
		case 20:
			return 'exclusive';
		case 10:
			return 'embargo';
		default:
			return 'regular';
	}
};

const FinalizePitch = ({
	changeToPreviousScreen, selectedJournalists, removeJournalist, changeNextScreen,
	title, content, mediaFiles, is_private, progressValue,
}) => {
	const [index, changeSlide] = useState(0);
	let slider = null;
	return (
		<div className="create_new_pitch_form">
			<div className="form_wrapper pitch_form_wraper">
				<div className="ad-pernl-hdg">
					<h2>Finalize your Pitches</h2>
				</div>
				<StatusBar steps={3} active={3} />
				<div className="ad-pernl-hdg">
					<div className="move-btn">
						<span className="click_pitch">Click on a pitch to edit the details</span>
						<div className="arrow_btn">
							<span onClick={() => slider.slickPrev()} role="button">
							Previous
								<i className="fa fa-chevron-left" />
							</span>
							<span onClick={() => slider.slickNext()} role="button">
								<i className="fa fa-chevron-right" />
							Next
							</span>
						</div>
					</div>

					<div className="view-information padd">
						<Slider
							afterChange={index => changeSlide(index)}
							settings={settings}
							ref={(c) => { slider = c; return true; }}
						>
							{selectedJournalists.map(({
								personalMessage, full_name, company_data, position_data, interests_data,
							}) => (
								<div key={personalMessage} className="wrap_view">

									<div className="view-lft">
										<div className="view-pro">
											<div className="srch_pic">
												<img src={imagepath} alt="zzzzzz" />
											</div>
											<span className="pro_detail">
												<h3>
													{full_name}
,
													<span className="side_contnt">{position_data && position_data[0] && position_data[0].name}</span>
												</h3>
												<p>{company_data && company_data.name}</p>
											</span>
										</div>
										<div className="view-detail bdr_botm0">
											<h3>NEC and Samsung</h3>
											<p>
												{personalMessage}

											</p>
										</div>

									</div>
									<div className="view-rgt">
										<p className="coverge">
Coverage
											{' '}
											<span>1:47 PM</span>
											{' '}
											<span>26/05/19</span>
										</p>
										<div className="pri-cont">
											<p className="mg">{is_private ? 'Private' : 'Public'}</p>
											<ul className="pri-link grey">
												{interests_data.map(({ name, url }) => <li><a target="blank" href={url}>{name}</a></li>)}
											</ul>
										</div>

									</div>

								</div>
							))}
						</Slider>

						<div className="finalize_contnt">
							<div className="view-conts">
								<h2>{title}</h2>
								<h6>{availabilityType(progressValue)}</h6>
								<div dangerouslySetInnerHTML={{ __html: content }} />
							</div>
						</div>
						<div className="finalize_contnt" style={{ width: '100px' }}>
							<div className="cnp-snipt view-img">
								{/* .media-snpt */}
								<Slider
									settings={settings}
								>
									{(mediaFiles.filter(data => data)).map(imageData => (
										imageData
											? (
												<div className="cnp-snipt-img" key={imageData}>
													<img src={imageData} alt="" />
												</div>
											) : null
									))}
								</Slider>
							</div>
						</div>
						<div className="finalize_contnt">
							<div className="dlete_icn_row" role="button" onClick={() => removeJournalist(index)}>
								<i className="fa fa-trash" aria-hidden="true" />
							</div>
						</div>

					</div>

					<div className="view-btn">

						<span className="view-btn-rgt">
							<button type="button" className="btn new_pitch_btn disc-btn" onClick={changeToPreviousScreen}>Back</button>
							<button type="button" className="btn new_pitch_btn snd-btn" onClick={changeNextScreen}>Send Pitches</button>
						</span>
					</div>

				</div>
			</div>
		</div>

	);
};
// }


export default FinalizePitch;
