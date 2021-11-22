import { useState } from 'react'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCardFB } from '../redux/modules/card';

const MoreBtn = ({ index }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  /*
     XXX  
    카드 컴포넌트가 여러개 렌더링 되면서 useSelector가 카드 갯수 만큼 실행된다. 
    나는 전체 데이터를 한번만 불러오면 되는데 이렇게 여러번 실행되면 안좋은것 아닌가??
  */

  const cardList = useSelector(state => state.card.list)
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
    dispatch(deleteCardFB(cardList[idx].id))
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