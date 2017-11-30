import React from 'react';

import Box from 'components/box';
import styles from './styles.scss'

const Page403 = (props) => (
	<Box>
		<div className="text-center">
			<h1>403</h1>
			<hr/>
		</div>
		<div className="text-center">
			{props.children ?
				props.children :
				(<h3>Можливо те, що ви шукаєте, знаходиться у іншому місці</h3>)
			}
		</div>
	</Box>
);

export default Page403;
