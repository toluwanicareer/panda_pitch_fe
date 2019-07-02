import React from 'react'
import PropTypes from 'prop-types';
import IMAGES from '../assets/images';

const { GOOGLE, CARD_PRO } = IMAGES;

const GridRow = ({ logo, title, time, description, profilePic, name, profile, score }) => {
  return (
    <div className="card_col">
        <div className="card_top_img">
          <img src={logo} alt="logo"/>
        </div>
        <div className="card_contnt">
          <span className="cover">Coverage</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="time">{time}</span>
        </div>
        <p className="pitch_score green">Pitch Score <span className="pitch_num">{score}</span></p>
        <div className="card_pro_row">
          <div className="card_pro_img">
            <img src={profilePic} alt="profile_pic"/>
          </div>
          <div className="card_pro_contnt">
            <h3>{name}</h3>
            <p>{profile}</p>
          </div>
        </div>
      </div>
  )
}

// props initialization ( default values )
GridRow.defaultProps = {
  logo: GOOGLE,
	profilePic: CARD_PRO,
};

// props type definition
GridRow.propTypes = {
	logo: PropTypes.string,
	title: PropTypes.string,
	time: PropTypes.string,
	description: PropTypes.string,
	profilePic: PropTypes.string,
	name: PropTypes.string,
	profile: PropTypes.string,
	score: PropTypes.number
};

// default importing
export default GridRow
