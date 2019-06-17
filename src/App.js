import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {Root} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import Error from './panels/Error';
import QuePoll from './panels/QuePoll';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			activeView: 'home',
			fetchedUser: null,
			isLoading: false,
			pollId: ''
		};
	}

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

		//Обработка входящих параметров
		const hashParams = this.parseQueryString(window.location.hash);
		console.log(Object.keys(hashParams));
		if(Object.keys(hashParams).includes('poll')){
			Object.keys(hashParams).map((key) => {
				 let value = hashParams[key];
				 if(key === 'poll'){
					 this.setState({'pollId': value});
					 this.getPoll(value);
				 }
				 return [];
			});
		} else {
			this.switchView('error');
		}
	};

	switchView = (id) => {
		this.setState({ activeView: id })
	}

	go = (e) => {
		this.setState({ activeView: e.currentTarget.dataset.to });
	};

	//Получение вопросов
	getPoll= (id) => {
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://localhost:3012/getpoll?id=' + id, false);
			xhr.send();
			if (xhr.status !== 200) {
			  this.switchView('error');
			} else {
			  var res = JSON.parse(xhr.responseText);
			  if(res.ok === false){
				  this.switchView('error');
				  return;
			  }
			  this.setState({data: res});
			}
		} catch(ex){
			this.switchView('error');
		}
	};

	//Парсим строку параметров
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

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<Error id="error" go={this.go} />
				<QuePoll id="quepoll" data={this.state.data} sv={this.switchView} />
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
			</Root>
		);
	}
}

export default App;
