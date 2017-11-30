import React from 'react';

import Box from 'components/box';
import styles from './styles.scss'

const Page404 = (props) => (
	<Box>
		<div className="text-center">
			<h1>404</h1>
			<hr/>
		</div>
		{props.children
			? props.children
			: (
				<div className="text-center">
					<h3>Не знайдено</h3>
					<h3>Можливо те, що ви шукаєте, знаходиться у іншому місці</h3>
				</div>
			)
			}
		<div className="text-center nf-img">
			<hr/>
			<img src="/assets/img/general/travolta.gif" alt=""/>
		</div>
	</Box>
);

export default Page404;
