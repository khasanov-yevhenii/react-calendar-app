import React, {
  useEffect, useState, useContext, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DayList, TimeList } from './index';
import Context from '../context';
import { getCalendarData } from '../store/actions';
import HeaderButtons from './HeaderButtons';

const Main = () => {
  const { calendar, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    timesArr,
    daysArr,
    setIsFormPopupOpen,
    setIsOverlayOpen,
    setIsConfirmPopupOpen,
    setConfirmTitle,
    setSelectedEventId,
  } = useContext(Context);
  const [selectedMember, setSelectedMember] = useState('all');

  const handleOpenPopup = () => {
    setIsFormPopupOpen(true);
    setIsOverlayOpen(true);
  };

  const selectEvent = ({ target }) => {
    if (target.classList.contains('reserved')) {
      const event = calendar.data.find((item) => item.data.date === target.dataset.id);

      setConfirmTitle(event.data.title);
      setSelectedEventId(event.id);

      setIsConfirmPopupOpen(true);
      setIsOverlayOpen(true);
    }
  };

  const handleChangeMember = ({ target }) => {
    setSelectedMember(target.value);
  };

  const renderEvents = useMemo(() => timesArr.map((time) => daysArr.map((day) => {
    const fullDate = `${time}-${day}`;
    const event = calendar.data
      && calendar.data.find((item) => item.data.date === fullDate);

    if (event) {
      const {
        color, date, title, participants,
      } = event.data;

      if (selectedMember === 'all' || participants.includes(selectedMember)) {
        return (
          <div
            className={`calendar__item ${color} ${user.isAdmin ? 'reserved' : ''}`}
            data-id={date}
            key={fullDate}
            onClick={selectEvent}
            aria-hidden="true"
          >
            <p className="calendar__item-text">{title}</p>
          </div>
        );
      }
    }

    return <div className="calendar__item" key={fullDate} />;
  })), [calendar.data, selectedMember, user.isAdmin]);

  useEffect(() => {
    dispatch(getCalendarData());
  }, []);

  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        {user.isAdmin && (
        <HeaderButtons
          selectedMember={selectedMember}
          handleChangeMember={handleChangeMember}
          handleOpenPopup={handleOpenPopup}
        />
        )}
      </div>
      <div className="app__body">
        <TimeList />
        <div className="app__content">
          <DayList />
          <div className="calendar">{ renderEvents }</div>
        </div>
      </div>
    </main>
  );
};

export default Main;
