const timer = (id, deadline) => { // id - place for render; deadline - timer goes to the end

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()), //time between present and deadline, ms
              seconds = Math.floor((t/1000) % 60), //t/1000 - all time in s, % 60 - remains in s
              minutes = Math.floor((t/1000/60) % 60), //t/1000/60 - all time in m
              hours = Math.floor((t/(1000 * 60 * 60)) % 24), //t/(1000*60*60 - all time in h
              days = Math.floor((t/(1000 * 60 * 60 * 24))); //t/(1000*60*60*24) - all time in d
        
        return { //obj with result
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector), //timer-parent
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); //update every s, be stopped in the future
        
        updateClock(); //to set time immediately

        function updateClock() {
            const t = getTimeRemaining(endtime);
            
            days.textContent = addZero(t.days); //set time in DOM
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0 ) {
                days.textContent = '00'; //set time in DOM
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        };
    };

    setClock(id, deadline);
};

export default timer;