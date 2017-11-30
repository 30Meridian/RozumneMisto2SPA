import React, { Component } from 'react';

class Statistic extends Component {
  render() {
    return (
      <div>
      <p>Статистика:</p>
      <table id="subscr" className="table table-condensed table-bordered">
          <tbody>

              <tr>
                  <td>Площа населеного пункту</td>
                  <td className="text-center">2470 га</td>
              </tr>

              <tr>
                  <td>Щільність населення на 1 кв.км.</td>
                  <td className="text-center">1498 осіб</td>
              </tr>

              <tr>
                  <td>Загальна площа населеного пункту</td>
                  <td className="text-center">6591,9 га</td>
              </tr>

              <tr>
                  <td>Загальна площа земель державної власності</td>
                  <td className="text-center">2571,9 га</td>
              </tr>

              <tr>
                  <td>Загальна площа земель комунальної власності</td>
                  <td className="text-center">2237,1 га</td>
              </tr>

              <tr>
                  <td>Загальна площа земель приватної власності</td>
                  <td className="text-center">1782,8 га</td>
              </tr>

              <tr>
                  <td>Населення міста </td>
                  <td className="text-center">37008 осіб</td>
              </tr>

              <tr>
                  <td>Особи працездатного віку</td>
                  <td className="text-center">26782 осіб</td>
              </tr>

          </tbody>
      </table>
      </div>
    )
  }
}

export default Statistic;
