import React from 'react';
import { get, isEmpty } from 'lodash';
import { test_props } from '../../../functions';
import CountUp from 'react-countup';
import { Card, CardBody, CardHeader } from '@wordpress/components';
const { Button } = wp.components;

function InformationCards(props) {
	const { info } = props;

	const title = get(info, 'title');
	const description = get(info, 'description');
	const action = get(info, 'action');
	const media = get(info, 'media');

	const Media = () => {
		if (test_props(media, ['src', 'type'])) {
			const { src, type } = media;

			if (type === 'img') {
				return <img src={src} />;
			} else if (type === 'svg') {
				return <div dangerouslySetInnerHTML={{ __html: src }}></div>;
			} else if (type === 'counter') {
				return (
					<h1>
						<CountUp useEasing={true} end={src} />
					</h1>
				);
			}
		} else {
			return null;
		}
	};

	const Actions = () => {
		if (test_props(action, ['link', 'label'])) {
			return (
				<Button target="__blank" href={action.link} isDefault>
					{action.label}
				</Button>
			);
		} else {
			return null;
		}
	};

	return (
		<Card className="cwp_info_card">
			<CardBody>
				<Media />
				{!isEmpty(title) && <h3>{title}</h3>}
				{!isEmpty(description) && <p>{description}</p>}
				<Actions />
			</CardBody>
		</Card>
	);
}

export default InformationCards;
