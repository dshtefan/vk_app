import React from 'react';
import {Cell, Group, View, List, Panel, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class Params extends React.Component{
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

	render(){
		const osname = platform();
		const queryParams = this.parseQueryString(window.location.search);
		const hashParams = this.parseQueryString(window.location.hash);
		return(
			<View id={this.props.id} activePanel={this.props.id + "_panel"}>
				<Panel id={this.props.id + "_panel"}>
					<PanelHeader
						left={<HeaderButton onClick={this.props.go} data-to="home">
							{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}
					>
						Launch params
					</PanelHeader>
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
			</View>
		);
	}
}

export default Params;
