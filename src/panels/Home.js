import React from 'react';
import PropTypes from 'prop-types';
import { Panel, View, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<View id={id} activePanel={id+"_panel"}>
		<Panel id={id+"_panel"}>
			<PanelHeader>Start Page</PanelHeader>
			{fetchedUser &&
			<Group title="User Data Fetched with VK Connect">
				<ListItem
					before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
					description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</ListItem>
			</Group>}

			<Group title="Pages">
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="quepoll">
						Questions
					</Button>
				</Div>
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="error">
						Show me 404
					</Button>
				</Div>
			</Group>
		</Panel>
	</View>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
