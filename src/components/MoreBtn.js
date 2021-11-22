import { useState } from 'react'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../redux/modules/card';

const MoreBtn = ({ index }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleModifyCard = (idx) => {
    setAnchorEl(null);
    history.push(`/modify/${idx}`)
  }

  const handleDeleteCard = (idx) => {
    dispatch(deleteCard(idx))
    setAnchorEl(null);
  }

  return (
    <div className="more-btn">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="btn-item" onClick={ () => handleModifyCard(index) }>수정</MenuItem>
        <MenuItem className="btn-item" onClick={ () => handleDeleteCard(index) }>삭제</MenuItem>
      </Menu>
  </div>
  )
}

export default MoreBtn