import React, {Component} from 'react';

import Box from 'components/box';

class PollsPlaceholder extends Component {
  render() {
    return(
      <Box>
        <h2>Опитування</h2>
        <p>Модуль «Опитування» - створення зручного каналу спілкування з мешканцями міста/громади, дозволяє вимірювати «градус» ставлення мешканців до будь-якого питання/проблеми.</p>
        <p>Влада показує діалог, реагує на запити та отримує повагу мешканців.</p>
        <p>Працює у 103 містах</p>
      </Box>
    )
  }
}

export default PollsPlaceholder;
