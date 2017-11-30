import React, { Component } from 'react';

import Box from 'components/box';

class Recording extends Component {
  render() {
    return (
        <Box>
          <h3>Інформаційний запит</h3>
          <form className="ui form record-form">
            <div className="field">
              <label>Ім'я</label>
              <input type="text" placeholder="Ввведіть ваше ім'я" />
            </div>
            <div className="field">
              <label>Звернення до:</label>
              <select className="ui">
                <option value="val">Міський голова</option>
                <option value="val">Міська рада</option>
              </select>
            </div>
            <div className="field">
              <label>Суть звернення</label>
              <textarea></textarea>
            </div>
            <div className="field">
              <label>Завантажити файл</label>
              <input type="file" />
            </div>
            <div className="inline-field">
              <label>Даю згоду на обробку персональних даних</label>
              <input type="checkbox" />
            </div>

          </form>
        </Box>
    )
  }
}

export default Recording;
