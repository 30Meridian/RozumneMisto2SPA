import React, {Component} from 'react';

class Typical extends Component {
  render() {
    return(
      <div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-block">
              <span className="icon-pen display-1"></span>
              <h4 className="card-title">Кабінет мешканця</h4>
              <p className="card-text">Усі електронні сервіси на одній сторінці: інструменти е-демократії, електронні послуги та спеціалізовані сервіси.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-block">
              <span className="icon-pen display-1"></span>
              <h4 className="card-title">Кабінет депутата</h4>
              <p className="card-text">Електронний офіс для роботи з виборцями: прийом та обробка звернень, мапа виборчої дільниці з візуалізацією актуальних проблем.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card m-b-0">
            <div className="card-block">
              <span className="icon-pen display-1"></span>
              <h4 className="card-title">Черга у садочок</h4>
              <p className="card-text">Зручний інструмент формування та адміністрування електронної черги у дитячі садочки.</p>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="col-md-4">
          <div className="card m-b-0">
            <div className="card-block">
              <span className="icon-pen display-1"></span>
              <h4 className="card-title">Розумна медицина</h4>
              <p className="card-text">Електронний офіс  надання медичних сервісів: запис на прийом та виклик лікаря додому, розклад роботи та перелік послуг закладів.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card m-b-0">
            <div className="card-block">
              <span className="icon-pen display-1"></span>
              <h4 className="card-title">Комунальне майно</h4>
              <p className="card-text">Реєстр комунального майна для організації ефективного управління комунальною власністю та пожвавлення ділової активності</p>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>
    )
  }
}

export default Typical;
