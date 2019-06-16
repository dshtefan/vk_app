import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Cell, Group, List, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	parseQueryString = (string) => {
		 return string.slice(1).split('&')
			  .map((queryParam) => {
				   let kvp = queryParam.split('=');
				   return {key: kvp[0], value: kvp[1]}
			  })
			  .reduce((query, kvp) => {
				   query[kvp.key] = kvp.value;
				   return query
			  }, {})
	  };

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		const queryParams = this.parseQueryString(window.location.search);
		const hashParams = this.parseQueryString(window.location.hash);

		return (
			<View activePanel={this.state.activePanel}>
				<Panel id="main">
				 	<PanelHeader>Launch params</PanelHeader>
					<Group title="Query params">
               	<List>
                   	{Object.keys(queryParams).map((key) => {
                       	let value = queryParams[key];
                       	return <Cell description={key}>{value ? value : <span style={{color: 'red'}}>-</span>}</Cell>;
                   	})}
               	</List>
              	</Group>
					<Group title="Hash params">
						<List>
							 {Object.keys(hashParams).map((key) => {
								  let value = hashParams[key];
								  return <Cell description={key}>{value ? value : <span style={{color: 'red'}}>-</span>}</Cell>;
							 })}
						</List>
					</Group>
				</Panel>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
