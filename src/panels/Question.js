import React from 'react';
import {Div, Panel, Button, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class Question extends React.Component{
   render(){
      const osname = platform();
      return(
         <Panel id={this.props.id}>
            <PanelHeader
               left={<HeaderButton onClick={this.props.goB}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
               </HeaderButton>}
            >
               {this.props.data.title}
            </PanelHeader>

            {JSON.stringify(this.props.data)}
            {
               ///Нужно добавить отображение вопросов
            }
            <Div>
					<Button size="l" level="secondary" onClick={this.props.goF} data-to={this.props.id}>
						Next
					</Button>
				</Div>
         </Panel>
      );
   }
}

export default Question;
